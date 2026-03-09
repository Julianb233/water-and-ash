import { NextRequest, NextResponse } from 'next/server';
import { bookingSchema } from '@/lib/validations/lead';
import { ghlClient } from '@/lib/gohighlevel/client';
import { GHL_CONFIG } from '@/lib/gohighlevel/config';
import { triggerBookingConfirmation } from '@/lib/gohighlevel/automations';

/**
 * Vessel display names for booking confirmation
 */
const vesselNames: Record<string, string> = {
  osprey: 'The Osprey',
  'white-nights': 'White Nights',
  relentless: 'Relentless',
};

/**
 * POST /api/booking/create
 *
 * Creates a booking appointment in GHL calendar [CRM-08].
 * Includes conflict detection [CRM-09] via GHL's calendar system.
 *
 * Flow:
 * 1. Validate booking data
 * 2. Create appointment in GHL calendar
 * 3. Update opportunity stage to "Consultation"
 * 4. Trigger booking confirmation automation [AUTO-03]
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = bookingSchema.parse(body);

    const vesselName =
      vesselNames[validatedData.vesselPreference] || validatedData.vesselPreference;

    // Create appointment in GHL calendar
    // GHL's calendar handles conflict detection internally —
    // if the slot is taken, the API returns an error
    const appointment = await ghlClient.createAppointment({
      calendarId: validatedData.calendarId,
      contactId: validatedData.contactId,
      startTime: validatedData.startTime,
      endTime: validatedData.endTime,
      title: `Sea Burial Ceremony - ${vesselName}`,
      notes: validatedData.notes || '',
    });

    // Move opportunity to Consultation stage
    // (The contact should already have an opportunity from lead capture)
    try {
      // Note: In a production system, we'd look up the opportunity by contact ID
      // For now, we update the contact with a note
      await ghlClient.addContactNote(
        validatedData.contactId,
        `Consultation booked: ${vesselName} on ${new Date(validatedData.startTime).toLocaleDateString()}. ` +
          `Appointment ID: ${appointment.appointment.id}`
      );
    } catch (noteError) {
      console.error('Failed to add booking note:', noteError);
    }

    // Trigger booking confirmation automation [AUTO-03]
    await triggerBookingConfirmation(
      validatedData.contactId,
      vesselName,
      validatedData.startTime
    );

    return NextResponse.json({
      message: 'Booking confirmed',
      appointmentId: appointment.appointment.id,
      vessel: vesselName,
      startTime: validatedData.startTime,
    });
  } catch (error) {
    console.error('Booking creation error:', error);

    // Check for conflict/double-booking error from GHL
    if (
      error instanceof Error &&
      (error.message.includes('conflict') ||
        error.message.includes('already booked') ||
        error.message.includes('422'))
    ) {
      return NextResponse.json(
        {
          message:
            'This time slot is no longer available. Please select another time.',
        },
        { status: 409 }
      );
    }

    if (error instanceof Error && error.message.includes('parse')) {
      return NextResponse.json(
        { message: 'Please check your booking details and try again.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message:
          'Unable to create booking. Please call 619-928-9160 to schedule.',
      },
      { status: 500 }
    );
  }
}
