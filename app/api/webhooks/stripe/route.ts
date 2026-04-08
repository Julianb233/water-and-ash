/**
 * Stripe Webhook Handler — /api/webhooks/stripe
 *
 * Requirements:
 *   PAY-03  Stripe webhook endpoint with signature verification
 *   PAY-04  Payment success → GHL opportunity status update to "Deposit Paid"
 *
 * Flow:
 *   1. Receive raw body (required for HMAC verification)
 *   2. Verify webhook signature using STRIPE_WEBHOOK_SECRET
 *   3. On `checkout.session.completed` → update GHL opportunity to "Deposit Paid"
 */

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import * as Sentry from '@sentry/nextjs';
import { stripe } from '@/lib/stripe';
import { updateOpportunityStage } from '@/lib/ghl';
import { trackInboundWebhook } from '@/lib/monitoring';

// ─── Signature Verification ────────────────────────────────────────────────

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || '';

async function verifyWebhookSignature(
  req: NextRequest
): Promise<Stripe.Event> {
  if (!WEBHOOK_SECRET) {
    throw new Error('STRIPE_WEBHOOK_SECRET is not configured');
  }

  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    throw new Error('Missing stripe-signature header');
  }

  // Stripe SDK handles HMAC-SHA256 verification internally
  return stripe.webhooks.constructEvent(body, signature, WEBHOOK_SECRET);
}

// ─── Event Handlers ────────────────────────────────────────────────────────

async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session
): Promise<void> {
  const opportunityId = session.metadata?.ghl_opportunity_id;
  const contactId = session.metadata?.ghl_contact_id;

  if (!opportunityId) {
    console.warn(
      '[stripe-webhook] checkout.session.completed missing ghl_opportunity_id in metadata',
      { sessionId: session.id, contactId }
    );
    // Don't throw — Stripe will retry if we return non-2xx.
    // Missing metadata means the checkout was created without GHL linkage.
    return;
  }

  console.log(
    `[stripe-webhook] Updating GHL opportunity ${opportunityId} → Deposit Paid`
  );

  await updateOpportunityStage(opportunityId, 'Deposit Paid');

  console.log(
    `[stripe-webhook] Successfully updated opportunity ${opportunityId}`
  );
}

// ─── Route Handler ─────────────────────────────────────────────────────────

export async function POST(req: NextRequest): Promise<NextResponse> {
  const start = Date.now();
  let event: Stripe.Event;

  // Step 1: Verify signature (PAY-03)
  try {
    event = await verifyWebhookSignature(req);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[stripe-webhook] Signature verification failed:', message);

    trackInboundWebhook('stripe', '/api/webhooks/stripe', {
      success: false,
      statusCode: 400,
      error: `Signature verification failed: ${message}`,
      durationMs: Date.now() - start,
    });

    return NextResponse.json(
      { error: `Webhook signature verification failed: ${message}` },
      { status: 400 }
    );
  }

  // Step 2: Handle event
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }

      // Future: handle payment_intent.payment_failed, charge.refunded, etc.
      default:
        console.log(
          `[stripe-webhook] Unhandled event type: ${event.type}`
        );
    }

    trackInboundWebhook('stripe', '/api/webhooks/stripe', {
      success: true,
      statusCode: 200,
      durationMs: Date.now() - start,
    }, { eventType: event.type });

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error(`[stripe-webhook] Error handling ${event.type}:`, message);

    Sentry.captureException(err, {
      tags: { 'webhook.provider': 'stripe', 'stripe.event_type': event.type },
    });

    trackInboundWebhook('stripe', '/api/webhooks/stripe', {
      success: false,
      statusCode: 500,
      error: message,
      durationMs: Date.now() - start,
    }, { eventType: event.type });

    // Return 500 so Stripe will retry
    return NextResponse.json(
      { error: `Webhook handler failed: ${message}` },
      { status: 500 }
    );
  }
}
