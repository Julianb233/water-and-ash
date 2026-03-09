import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { updateOpportunityStage } from '@/lib/ghl';

/**
 * Stripe Webhook Handler
 *
 * POST /api/webhooks/stripe
 *
 * Handles:
 * - checkout.session.completed → Updates GHL opportunity to "Deposit Paid"
 * - payment_intent.succeeded → Logs successful payment
 *
 * Security: Verifies webhook signature using STRIPE_WEBHOOK_SECRET.
 */

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
});

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    console.error('[stripe-webhook] Missing stripe-signature header');
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('[stripe-webhook] STRIPE_WEBHOOK_SECRET not configured');
    return NextResponse.json(
      { error: 'Webhook not configured' },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error(`[stripe-webhook] Signature verification failed: ${message}`);
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${message}` },
      { status: 400 }
    );
  }

  console.log(`[stripe-webhook] Received event: ${event.type} (${event.id})`);

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const opportunityId = session.metadata?.ghl_opportunity_id;

        if (opportunityId) {
          await updateOpportunityStage(opportunityId, 'Deposit Paid');
          console.log(
            `[stripe-webhook] Updated GHL opportunity ${opportunityId} to "Deposit Paid"`
          );
        } else {
          console.warn(
            `[stripe-webhook] checkout.session.completed without ghl_opportunity_id metadata (session: ${session.id})`
          );
        }
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(
          `[stripe-webhook] Payment succeeded: ${paymentIntent.id} ($${(paymentIntent.amount / 100).toFixed(2)})`
        );
        break;
      }

      case 'payment_intent.payment_failed': {
        const failedIntent = event.data.object as Stripe.PaymentIntent;
        console.error(
          `[stripe-webhook] Payment failed: ${failedIntent.id} — ${failedIntent.last_payment_error?.message || 'unknown error'}`
        );
        break;
      }

      default:
        console.log(`[stripe-webhook] Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error(`[stripe-webhook] Error processing ${event.type}: ${message}`);
    return NextResponse.json(
      { error: `Webhook processing failed: ${message}` },
      { status: 500 }
    );
  }
}
