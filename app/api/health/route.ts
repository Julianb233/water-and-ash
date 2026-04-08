import { NextResponse } from 'next/server';

/**
 * Health check endpoint for operational monitoring.
 * Returns service status and environment info.
 */
export async function GET() {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    sentry: {
      configured: !!process.env.NEXT_PUBLIC_SENTRY_DSN,
    },
    services: {
      stripe: !!process.env.STRIPE_SECRET_KEY,
      resend: !!process.env.RESEND_API_KEY,
      ghl: !!process.env.GHL_API_KEY,
    },
  };

  return NextResponse.json(health, { status: 200 });
}
