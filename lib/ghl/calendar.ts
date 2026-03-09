/**
 * GoHighLevel Calendar API client
 *
 * Handles per-vessel scheduling with conflict detection:
 * - Fetch free/busy slots from GHL calendars (one per vessel)
 * - Create appointments with double-booking prevention
 * - Contact upsert for new bookings
 */

import type {
  DayAvailability,
  AvailableSlot,
  GHLFreeSlot,
  GHLContact,
  VesselConfig,
  BookingRequest,
  BookingResponse,
} from './types';

const GHL_API_BASE = process.env.GHL_BASE_URL || 'https://services.leadconnectorhq.com';
const API_VERSION = '2021-04-15';

// ─── Vessel → Calendar mapping ──────────────────────────────────────────────

export const VESSELS: Record<string, VesselConfig> = {
  osprey: {
    id: 'osprey',
    name: 'The Osprey',
    calendarId: process.env.GHL_CALENDAR_OSPREY || '',
    capacity: 13,
  },
  'white-nights': {
    id: 'white-nights',
    name: 'White Nights',
    calendarId: process.env.GHL_CALENDAR_WHITE_NIGHTS || '',
    capacity: 12,
  },
  relentless: {
    id: 'relentless',
    name: 'Relentless',
    calendarId: process.env.GHL_CALENDAR_RELENTLESS || '',
    capacity: 15,
  },
};

export function getVessel(vesselId: string): VesselConfig | null {
  return VESSELS[vesselId] || null;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function getApiKey(): string {
  const key = process.env.GHL_API_KEY;
  if (!key) throw new Error('GHL_API_KEY is not configured');
  return key;
}

function ghlHeaders(): Record<string, string> {
  return {
    Authorization: `Bearer ${getApiKey()}`,
    'Content-Type': 'application/json',
    Version: API_VERSION,
  };
}

// ─── Availability (per-vessel) ──────────────────────────────────────────────

/**
 * Fetch available time slots from a vessel's GHL calendar.
 *
 * Calls the GHL "Get Free Slots" endpoint for the calendar
 * mapped to the given vessel, then transforms into our
 * DayAvailability[] format for the frontend.
 */
export async function getVesselAvailability(
  vesselId: string,
  startDate: string,
  endDate: string,
): Promise<DayAvailability[]> {
  const vessel = getVessel(vesselId);
  if (!vessel) {
    throw new Error(`Unknown vessel: ${vesselId}`);
  }

  if (!vessel.calendarId) {
    console.warn(`[ghl-calendar] No calendar ID for vessel "${vesselId}". Returning empty.`);
    return [];
  }

  // GHL API: GET /calendars/{calendarId}/free-slots
  const params = new URLSearchParams({
    startDate, // YYYY-MM-DD
    endDate,   // YYYY-MM-DD
    timezone: 'America/Los_Angeles',
  });

  const response = await fetch(
    `${GHL_API_BASE}/calendars/${vessel.calendarId}/free-slots?${params}`,
    { headers: ghlHeaders(), next: { revalidate: 60 } },
  );

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`[ghl-calendar] Free slots API error (${response.status}):`, errorBody);
    // Return empty availability rather than crashing — allows graceful degradation
    return [];
  }

  const data = await response.json();

  // GHL returns: { [date: string]: { slots: { startTime, endTime }[] } }
  // Transform to our DayAvailability[] format
  return transformFreeSlots(data, vessel.calendarId, startDate, endDate);
}

/**
 * Transform GHL free-slots response into our DayAvailability format.
 *
 * GHL returns slots keyed by date string. We normalize this into
 * a flat array of DayAvailability objects, filling in dates that
 * have no slots as unavailable.
 */
function transformFreeSlots(
  ghlData: Record<string, { slots: GHLFreeSlot[] }>,
  calendarId: string,
  startDate: string,
  endDate: string,
): DayAvailability[] {
  const results: DayAvailability[] = [];
  const start = new Date(startDate + 'T00:00:00');
  const end = new Date(endDate + 'T00:00:00');

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    const dayData = ghlData[dateStr];
    const rawSlots = dayData?.slots || [];

    const slots: AvailableSlot[] = rawSlots.map((slot) => ({
      startTime: slot.startTime,
      endTime: slot.endTime,
      calendarId,
      available: true,
    }));

    results.push({
      date: dateStr,
      available: slots.length > 0,
      hasAvailability: slots.length > 0,
      slots,
    });
  }

  return results;
}

// ─── Contact Upsert ─────────────────────────────────────────────────────────

/**
 * Create or update a GHL contact. Uses email as the dedup key.
 * Returns the contact ID for appointment creation.
 */
export async function upsertContact(
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
): Promise<GHLContact> {
  const locationId = process.env.GHL_LOCATION_ID;
  if (!locationId) throw new Error('GHL_LOCATION_ID is not configured');

  const response = await fetch(`${GHL_API_BASE}/contacts/upsert`, {
    method: 'POST',
    headers: ghlHeaders(),
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      phone,
      locationId,
      source: 'website-booking',
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`GHL contact upsert failed (${response.status}): ${errorBody}`);
  }

  const data = await response.json();
  return {
    id: data.contact?.id || data.id,
    firstName,
    lastName,
    email,
    phone,
  };
}

// ─── Appointment Creation (with conflict detection) ──────────────────────────

/**
 * Create a booking appointment on a vessel's calendar.
 *
 * Conflict detection flow:
 * 1. Re-fetch free slots for the exact date to get latest availability
 * 2. Verify the requested time slot is still free (prevents race conditions)
 * 3. Create the GHL appointment
 * 4. Return booking confirmation
 *
 * This is the core of the "conflict detection" requirement — we do a
 * just-in-time availability check right before booking.
 */
export async function createBooking(
  request: BookingRequest,
): Promise<BookingResponse> {
  const vessel = getVessel(request.vesselId);
  if (!vessel) {
    throw new Error(`Unknown vessel: ${request.vesselId}`);
  }

  if (!vessel.calendarId) {
    throw new Error(`No calendar configured for vessel: ${request.vesselId}`);
  }

  // ── Step 1: Conflict detection — re-check availability at booking time ──
  const availability = await getVesselAvailability(
    request.vesselId,
    request.date,
    request.date,
  );

  const daySlots = availability.find((d) => d.date === request.date);
  if (!daySlots || !daySlots.available) {
    throw new BookingConflictError(
      'This date is no longer available. Please select another date.',
    );
  }

  // Check specific time slot is still free
  const slotAvailable = daySlots.slots.some(
    (s) => s.startTime === request.startTime && s.endTime === request.endTime && s.available,
  );

  if (!slotAvailable) {
    throw new BookingConflictError(
      'This time slot has just been booked. Please select another time.',
    );
  }

  // Validate guest count against vessel capacity
  if (request.guestCount > vessel.capacity) {
    throw new Error(
      `Guest count (${request.guestCount}) exceeds vessel capacity (${vessel.capacity}).`,
    );
  }

  // ── Step 2: Upsert contact in GHL ──
  const contact = await upsertContact(
    request.firstName,
    request.lastName,
    request.email,
    request.phone,
  );

  // ── Step 3: Create appointment on vessel's calendar ──
  const appointmentResponse = await fetch(`${GHL_API_BASE}/calendars/events/appointments`, {
    method: 'POST',
    headers: ghlHeaders(),
    body: JSON.stringify({
      calendarId: vessel.calendarId,
      contactId: contact.id,
      startTime: request.startTime,
      endTime: request.endTime,
      title: `${request.firstName} ${request.lastName} — ${vessel.name} Ceremony`,
      appointmentStatus: 'new',
      assignedUserId: '', // auto-assign
      notes: [
        `Vessel: ${vessel.name}`,
        `Guests: ${request.guestCount}`,
        request.specialRequests ? `Special requests: ${request.specialRequests}` : '',
        `Source: ${request.source || 'website-booking'}`,
      ]
        .filter(Boolean)
        .join('\n'),
    }),
  });

  if (!appointmentResponse.ok) {
    const errorBody = await appointmentResponse.text();

    // Check for GHL conflict response (409 or scheduling conflict in body)
    if (appointmentResponse.status === 409 || errorBody.includes('conflict')) {
      throw new BookingConflictError(
        'This time slot was just booked by another customer. Please choose a different time.',
      );
    }

    throw new Error(`GHL appointment creation failed (${appointmentResponse.status}): ${errorBody}`);
  }

  const appointmentData = await appointmentResponse.json();

  return {
    appointmentId: appointmentData.id || appointmentData.appointmentId || '',
    vessel: vessel.name,
    date: request.date,
    startTime: request.startTime,
    endTime: request.endTime,
    contactId: contact.id,
  };
}

// ─── Custom Errors ──────────────────────────────────────────────────────────

export class BookingConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BookingConflictError';
  }
}
