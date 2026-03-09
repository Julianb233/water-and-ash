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
