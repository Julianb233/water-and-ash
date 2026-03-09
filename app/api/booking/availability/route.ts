import { NextRequest, NextResponse } from 'next/server';
import { ghlClient } from '@/lib/gohighlevel/client';
import { getCalendarIdForVessel } from '@/lib/gohighlevel/config';

/**
 * GET /api/booking/availability?vessel=osprey&startDate=2026-03-01&endDate=2026-03-31
 *
 * Returns available booking slots for a specific vessel [CRM-08, CRM-09].
 * Uses GHL calendar API with conflict detection to prevent double-booking.
 * Each vessel has its own calendar, ensuring no scheduling conflicts.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const vessel = searchParams.get('vessel');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    if (!vessel || !startDate || !endDate) {
      return NextResponse.json(
        { message: 'Missing required parameters: vessel, startDate, endDate' },
        { status: 400 }
      );
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
      return NextResponse.json(
        { message: 'Dates must be in YYYY-MM-DD format' },
        { status: 400 }
      );
    }

    // Validate date range (max 60 days)
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    if (diffDays > 60) {
      return NextResponse.json(
        { message: 'Date range cannot exceed 60 days' },
        { status: 400 }
      );
    }

    // Get calendar ID for the vessel
    const calendarId = getCalendarIdForVessel(vessel);
    if (!calendarId) {
      return NextResponse.json(
        { message: 'Invalid vessel selection' },
        { status: 400 }
      );
    }

    // Fetch available slots from GHL calendar [CRM-09: conflict detection]
    const response = await ghlClient.getAvailableSlots(
      calendarId,
      startDate,
      endDate
    );

    return NextResponse.json({
      vessel,
      calendarId,
      startDate,
      endDate,
      slots: response.slots,
    });
  } catch (error) {
    console.error('Booking availability error:', error);
    return NextResponse.json(
      { message: 'Unable to fetch availability. Please call 619-928-9160.' },
      { status: 500 }
    );
  }
}
