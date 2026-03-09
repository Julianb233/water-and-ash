/**
 * GoHighLevel type definitions for calendar and booking integration.
 */

export interface DayAvailability {
  date: string;
  available: boolean;
  slots: TimeSlot[];
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
  available: boolean;
}

export interface GHLContact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  locationId: string;
  tags?: string[];
  source?: string;
  dateAdded: string;
}

export interface GHLOpportunity {
  id: string;
  name: string;
  contactId: string;
  pipelineId: string;
  pipelineStageId: string;
  monetaryValue?: number;
  status: 'open' | 'won' | 'lost' | 'abandoned';
}

export interface GHLCalendarEvent {
  id: string;
  calendarId: string;
  contactId: string;
  title: string;
  startTime: string;
  endTime: string;
  status: 'confirmed' | 'cancelled' | 'pending';
}
