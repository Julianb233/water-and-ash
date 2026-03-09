import { NextResponse } from 'next/server';

/**
 * Health check endpoint for production monitoring.
 *
 * GET /api/health
 *
 * Returns 200 with service status and environment readiness checks.
 */
export async function GET() {
  const checks = {
    ghl: !!process.env.GHL_API_KEY && !!process.env.GHL_LOCATION_ID,
    resend: !!process.env.RESEND_API_KEY,
    stripe: !!process.env.STRIPE_SECRET_KEY,
    cloudinary: !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  };

  const allHealthy = Object.values(checks).every(Boolean);

  return NextResponse.json(
    {
      status: allHealthy ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      version: process.env.NEXT_PUBLIC_SITE_URL || 'unknown',
      services: checks,
    },
    { status: allHealthy ? 200 : 503 }
  );
}

export const dynamic = 'force-dynamic';
