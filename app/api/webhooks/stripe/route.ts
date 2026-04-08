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
import { Resend } from 'resend';
import { stripe } from '@/lib/stripe';
import { updateOpportunityStage } from '@/lib/ghl';
import { bookingConfirmationEmail } from '@/lib/emails';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

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

  // PAY-07: Send booking confirmation email
  const customerEmail = session.customer_details?.email || session.metadata?.email;
  const customerName = session.customer_details?.name || session.metadata?.contact_name;

  if (customerEmail && customerName) {
    try {
      const { subject, html } = bookingConfirmationEmail({
        contactName: customerName,
        contactEmail: customerEmail,
        serviceName: session.metadata?.service_name || 'Sea Burial Ceremony',
        vesselName: session.metadata?.vessel_name,
        ceremonyDate: session.metadata?.ceremony_date || '',
        ceremonyTime: session.metadata?.ceremony_time,
        depositAmount: session.amount_total
          ? (session.amount_total / 100).toFixed(2)
          : undefined,
        confirmationId: session.metadata?.confirmation_id,
      });

      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
        to: customerEmail,
        subject,
        html,
      });

      console.log(`[stripe-webhook] Confirmation email sent to ${customerEmail}`);
    } catch (emailErr) {
      // Log but don't fail — payment already processed
      console.error('[stripe-webhook] Failed to send confirmation email:', emailErr);
    }
  }
}

// ─── Route Handler ─────────────────────────────────────────────────────────

export async function POST(req: NextRequest): Promise<NextResponse> {
  let event: Stripe.Event;

  // Step 1: Verify signature (PAY-03)
  try {
    event = await verifyWebhookSignature(req);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[stripe-webhook] Signature verification failed:', message);
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

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error(`[stripe-webhook] Error handling ${event.type}:`, message);
    // Return 500 so Stripe will retry
    return NextResponse.json(
      { error: `Webhook handler failed: ${message}` },
      { status: 500 }
    );
  }
}
