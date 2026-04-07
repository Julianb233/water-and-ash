import { NextRequest, NextResponse } from 'next/server';
import { getVesselAvailability, getVessel } from '@/lib/ghl/calendar';

/**
 * GET /api/calendar/availability
 *
 * Returns available time slots for a vessel's GHL calendar.
 * Query params: vesselId, startDate (YYYY-MM-DD), endDate (YYYY-MM-DD)
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const vesselId = searchParams.get('vesselId');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  if (!vesselId || !startDate || !endDate) {
    return NextResponse.json(
      { error: 'Missing required query parameters: vesselId, startDate, endDate' },
      { status: 400 },
    );
  }

  // Validate vessel exists
  const vessel = getVessel(vesselId);
  if (!vessel) {
    return NextResponse.json(
      { error: `Unknown vessel: ${vesselId}` },
      { status: 400 },
    );
  }

  // Validate date format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
    return NextResponse.json(
      { error: 'Dates must be in YYYY-MM-DD format' },
      { status: 400 },
    );
  }

  try {
    const days = await getVesselAvailability(vesselId, startDate, endDate);

    return NextResponse.json({
      vesselId,
      vesselName: vessel.name,
      startDate,
      endDate,
      days,
    });
  } catch (error) {
    console.error('[api/calendar/availability] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch availability. Please try again.' },
      { status: 500 },
    );
  }
}
