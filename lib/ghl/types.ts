/**
 * GoHighLevel shared types used by booking components and automation system.
 */

export interface DayAvailability {
  date: string;
  available: boolean;
  hasAvailability: boolean;
  slots: AvailableSlot[];
}

export interface AvailableSlot {
  startTime: string;
  endTime: string;
  calendarId: string;
  available: boolean;
}

/** Booking request from the frontend form */
export interface BookingRequest {
  vesselId: string;
  date: string;
  startTime: string;
  endTime: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  guestCount: number;
  specialRequests?: string;
  source?: string;
}

/** Booking response returned after successful creation */
export interface BookingResponse {
  appointmentId: string;
  vessel: string;
  date: string;
  startTime: string;
  endTime: string;
  contactId: string;
}

/** GHL calendar free-slot response shape */
export interface GHLFreeSlot {
  startTime: string;
  endTime: string;
}

/** GHL contact upsert shape */
export interface GHLContact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

/** Vessel config mapping */
export interface VesselConfig {
  id: string;
  name: string;
  calendarId: string;
  capacity: number;
}
