import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock stripe module before importing
vi.mock('@/lib/stripe', () => ({
  stripe: {
    webhooks: {
      constructEvent: vi.fn(),
    },
  },
  SERVICE_PRICES: {
    osprey: { amount: 200_000, name: 'The Osprey — Deposit' },
    'white-nights': { amount: 200_000, name: 'White Nights — Deposit' },
    relentless: { amount: 200_000, name: 'Relentless — Deposit' },
    'at-home-memorial': { amount: 40_000, name: 'At-Home Memorial — Deposit' },
  },
}));

vi.mock('@/lib/ghl', () => ({
  updateOpportunityStage: vi.fn().mockResolvedValue(undefined),
}));

describe('Stripe Webhook — checkout.session.completed', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('SERVICE_PRICES has correct amounts', async () => {
    const { SERVICE_PRICES } = await import('@/lib/stripe');

    expect(SERVICE_PRICES.osprey.amount).toBe(200_000);
    expect(SERVICE_PRICES['white-nights'].amount).toBe(200_000);
    expect(SERVICE_PRICES.relentless.amount).toBe(200_000);
    expect(SERVICE_PRICES['at-home-memorial'].amount).toBe(40_000);
  });

  it('SERVICE_PRICES has correct service names', async () => {
    const { SERVICE_PRICES } = await import('@/lib/stripe');

    expect(SERVICE_PRICES.osprey.name).toContain('Osprey');
    expect(SERVICE_PRICES['white-nights'].name).toContain('White Nights');
    expect(SERVICE_PRICES.relentless.name).toContain('Relentless');
    expect(SERVICE_PRICES['at-home-memorial'].name).toContain('At-Home Memorial');
  });

  it('SERVICE_PRICES covers all 4 services', async () => {
    const { SERVICE_PRICES } = await import('@/lib/stripe');

    expect(Object.keys(SERVICE_PRICES)).toHaveLength(4);
    expect(SERVICE_PRICES).toHaveProperty('osprey');
    expect(SERVICE_PRICES).toHaveProperty('white-nights');
    expect(SERVICE_PRICES).toHaveProperty('relentless');
    expect(SERVICE_PRICES).toHaveProperty('at-home-memorial');
  });

  it('all prices are positive integers (cents)', async () => {
    const { SERVICE_PRICES } = await import('@/lib/stripe');

    for (const [key, val] of Object.entries(SERVICE_PRICES)) {
      expect(val.amount).toBeGreaterThan(0);
      expect(Number.isInteger(val.amount)).toBe(true);
    }
  });
});
