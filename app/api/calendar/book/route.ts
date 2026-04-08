import { NextRequest, NextResponse } from 'next/server';
import { createBooking, BookingConflictError } from '@/lib/ghl/calendar';
import type { BookingRequest } from '@/lib/ghl/types';

/**
 * POST /api/calendar/book
 *
 * Creates a booking appointment on a vessel's GHL calendar.
 * Includes just-in-time conflict detection to prevent double-booking.
 *
 * Body: BookingRequest (vesselId, date, startTime, endTime, contact info, guestCount)
 */
export async function POST(request: NextRequest) {
  let body: BookingRequest;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 },
    );
  }

  // Validate required fields
  const required: (keyof BookingRequest)[] = [
    'vesselId', 'date', 'startTime', 'endTime',
    'firstName', 'lastName', 'email', 'phone', 'guestCount',
  ];

  for (const field of required) {
    if (!body[field] && body[field] !== 0) {
      return NextResponse.json(
        { error: `Missing required field: ${field}` },
        { status: 400 },
      );
    }
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(body.email)) {
    return NextResponse.json(
      { error: 'Invalid email address' },
      { status: 400 },
    );
  }

  // Validate guest count is a positive integer
  if (!Number.isInteger(body.guestCount) || body.guestCount < 1) {
    return NextResponse.json(
      { error: 'Guest count must be a positive integer' },
      { status: 400 },
    );
  }

  try {
    const booking = await createBooking({
      ...body,
      source: body.source || 'website-booking',
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    if (error instanceof BookingConflictError) {
      return NextResponse.json(
        { error: error.message, code: 'CONFLICT' },
        { status: 409 },
      );
    }

    console.error('[api/calendar/book] Error:', error);
    return NextResponse.json(
      { error: 'Failed to create booking. Please try again or call us at 619-928-9160.' },
      { status: 500 },
    );
  }
}
