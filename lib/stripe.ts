/**
 * Stripe client configuration
 *
 * Server-side only — never import in client components.
 */

import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY environment variable is required');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2026-02-25.clover',
  typescript: true,
});

/**
 * Server-side pricing map — never trust the client.
 * Prices in cents (USD).
 */
export const SERVICE_PRICES: Record<string, { amount: number; name: string }> = {
  osprey: { amount: 200_000, name: 'The Osprey — Deposit' },
  'white-nights': { amount: 200_000, name: 'White Nights — Deposit' },
  relentless: { amount: 200_000, name: 'Relentless — Deposit' },
  'at-home-memorial': { amount: 40_000, name: 'At-Home Memorial — Deposit' },
};
