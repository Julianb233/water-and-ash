/**
 * GoHighLevel (GHL) CRM integration
 *
 * Handles calendar availability lookups and booking creation
 * via the GHL API (LeadConnector).
 *
 * Env vars required:
 *   GHL_API_KEY, GHL_LOCATION_ID, GHL_BASE_URL,
 *   GHL_CALENDAR_OSPREY, GHL_CALENDAR_WHITE_NIGHTS, GHL_CALENDAR_RELENTLESS
 */

// ── Types ────────────────────────────────────────────────────────────────

export interface Vessel {
  id: string;
  name: string;
  calendarId: string;
}

export interface TimeSlot {
  startTime: string; // ISO 8601
  endTime: string;   // ISO 8601
}

export interface DayAvailability {
  date: string; // YYYY-MM-DD
  slots: TimeSlot[];
}

export interface BookingRequest {
  vesselId: string;
  date: string;       // YYYY-MM-DD
  startTime: string;  // HH:mm
  endTime: string;    // HH:mm
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  guestCount: number;
  specialRequests?: string;
  source?: string;
}

export interface BookingResponse {
  id: string;
  vesselId: string;
  date: string;
  startTime: string;
  endTime: string;
  contactId: string;
  status: string;
}

// ── Errors ───────────────────────────────────────────────────────────────

export class BookingConflictError extends Error {
  constructor(message: string = 'This time slot is no longer available.') {
    super(message);
    this.name = 'BookingConflictError';
  }
}

// ── Config ───────────────────────────────────────────────────────────────

const GHL_BASE_URL = process.env.GHL_BASE_URL || 'https://services.leadconnectorhq.com';
const GHL_API_KEY = process.env.GHL_API_KEY;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;

/** Map vessel slugs → calendar IDs from env. */
const VESSELS: Record<string, Vessel> = {
  osprey: {
    id: 'osprey',
    name: 'The Osprey',
    calendarId: process.env.GHL_CALENDAR_OSPREY || '',
  },
  'white-nights': {
    id: 'white-nights',
    name: 'White Nights',
    calendarId: process.env.GHL_CALENDAR_WHITE_NIGHTS || '',
  },
  relentless: {
    id: 'relentless',
    name: 'Relentless',
    calendarId: process.env.GHL_CALENDAR_RELENTLESS || '',
  },
};

// ── Helpers ──────────────────────────────────────────────────────────────

function ghlHeaders(): HeadersInit {
  if (!GHL_API_KEY) {
    throw new Error('GHL_API_KEY environment variable is required');
  }
  return {
    Authorization: `Bearer ${GHL_API_KEY}`,
    'Content-Type': 'application/json',
    Version: '2021-07-28',
  };
}

// ── Public API ───────────────────────────────────────────────────────────

/**
 * Look up a vessel by slug. Returns undefined if not found.
 */
export function getVessel(vesselId: string): Vessel | undefined {
  return VESSELS[vesselId];
}

/**
 * Fetch available time slots for a vessel between two dates.
 */
export async function getVesselAvailability(
  vesselId: string,
  startDate: string,
  endDate: string,
): Promise<DayAvailability[]> {
  const vessel = VESSELS[vesselId];
  if (!vessel) {
    throw new Error(`Unknown vessel: ${vesselId}`);
  }

  if (!vessel.calendarId) {
    throw new Error(`No calendar configured for vessel: ${vesselId}`);
  }

  const url = new URL(`${GHL_BASE_URL}/calendars/${vessel.calendarId}/free-slots`);
  url.searchParams.set('startDate', startDate);
  url.searchParams.set('endDate', endDate);
  if (GHL_LOCATION_ID) {
    url.searchParams.set('locationId', GHL_LOCATION_ID);
  }

  const res = await fetch(url.toString(), { headers: ghlHeaders() });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`GHL API error (${res.status}): ${text}`);
  }

  const data = await res.json();

  // GHL returns { <date>: { slots: [...] } } — normalise to DayAvailability[]
  const days: DayAvailability[] = Object.entries(
    (data as Record<string, { slots?: { startTime: string; endTime: string }[] }>) || {},
  ).map(([date, day]) => ({
    date,
    slots: (day.slots || []).map((s) => ({
      startTime: s.startTime,
      endTime: s.endTime,
    })),
  }));

  return days;
}

/**
 * Create a booking on a vessel's GHL calendar.
 * Throws BookingConflictError if the slot is taken (409).
 */
/**
 * Update a GHL opportunity's pipeline stage (e.g. "Deposit Paid").
 * Used by the Stripe webhook to sync payment status into the CRM.
 */
export async function updateOpportunityStage(
  opportunityId: string,
  stageName: string,
): Promise<void> {
  const url = `${GHL_BASE_URL}/opportunities/${opportunityId}`;

  const res = await fetch(url, {
    method: 'PUT',
    headers: ghlHeaders(),
    body: JSON.stringify({
      status: stageName,
      locationId: GHL_LOCATION_ID,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(
      `GHL opportunity update failed (${res.status}): ${text}`,
    );
  }
}

/**
 * Create a booking on a vessel's GHL calendar.
 * Throws BookingConflictError if the slot is taken (409).
 */
export async function createBooking(req: BookingRequest): Promise<BookingResponse> {
  const vessel = VESSELS[req.vesselId];
  if (!vessel) {
    throw new Error(`Unknown vessel: ${req.vesselId}`);
  }

  if (!vessel.calendarId) {
    throw new Error(`No calendar configured for vessel: ${req.vesselId}`);
  }

  const url = `${GHL_BASE_URL}/calendars/events/appointments`;

  const body = {
    calendarId: vessel.calendarId,
    locationId: GHL_LOCATION_ID,
    startTime: `${req.date}T${req.startTime}:00`,
    endTime: `${req.date}T${req.endTime}:00`,
    title: `${vessel.name} — ${req.firstName} ${req.lastName} (${req.guestCount} guests)`,
    contactCreate: {
      firstName: req.firstName,
      lastName: req.lastName,
      email: req.email,
      phone: req.phone,
      source: req.source || 'website',
    },
    notes: req.specialRequests || '',
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: ghlHeaders(),
    body: JSON.stringify(body),
  });

  if (res.status === 409) {
    throw new BookingConflictError();
  }

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`GHL booking failed (${res.status}): ${text}`);
  }

  const data = await res.json();

  return {
    id: data.id || data.eventId || '',
    vesselId: req.vesselId,
    date: req.date,
    startTime: req.startTime,
    endTime: req.endTime,
    contactId: data.contactId || '',
    status: data.status || 'confirmed',
  };
}
