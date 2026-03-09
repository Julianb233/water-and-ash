// GoHighLevel API v2 Types

// ─── Pipeline Types ──────────────────────────────────────────────────

export type B2CPipelineStage =
  | 'Inquiry'
  | 'Consultation'
  | 'Deposit'
  | 'Confirmed'
  | 'Complete';

export type B2BPipelineStage =
  | 'Partner Inquiry'
  | 'Discovery'
  | 'Agreement'
  | 'Active Partner';

export type PipelineType = 'b2c' | 'b2b';

// ─── Contact Types ───────────────────────────────────────────────────

export interface GHLContactCreate {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  source: string;
  tags?: string[];
  customFields?: GHLCustomField[];
}

export interface GHLCustomField {
  id: string;
  value: string;
}

export interface GHLContact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  tags: string[];
  source: string;
  dateAdded: string;
  customFields: GHLCustomField[];
}

export interface GHLContactResponse {
  contact: GHLContact;
}

// ─── Opportunity Types ───────────────────────────────────────────────

export interface GHLOpportunityCreate {
  pipelineId: string;
  pipelineStageId: string;
  contactId: string;
  name: string;
  status: 'open' | 'won' | 'lost' | 'abandoned';
  monetaryValue?: number;
  source?: string;
}

export interface GHLOpportunity {
  id: string;
  name: string;
  pipelineId: string;
  pipelineStageId: string;
  contactId: string;
  status: string;
  monetaryValue: number;
  source: string;
  dateAdded: string;
}

export interface GHLOpportunityResponse {
  opportunity: GHLOpportunity;
}

// ─── Calendar Types ──────────────────────────────────────────────────

export interface GHLCalendarSlot {
  startTime: string;
  endTime: string;
}

export interface GHLCalendarSlotsResponse {
  slots: Record<string, GHLCalendarSlot[]>;
}

export interface GHLAppointmentCreate {
  calendarId: string;
  contactId: string;
  startTime: string;
  endTime: string;
  title: string;
  notes?: string;
  address?: string;
}

export interface GHLAppointment {
  id: string;
  calendarId: string;
  contactId: string;
  startTime: string;
  endTime: string;
  title: string;
  status: string;
  notes: string;
}

export interface GHLAppointmentResponse {
  appointment: GHLAppointment;
}

// ─── Webhook Types ───────────────────────────────────────────────────

export type GHLWebhookEventType =
  | 'ContactCreate'
  | 'ContactUpdate'
  | 'ContactDelete'
  | 'OpportunityCreate'
  | 'OpportunityStatusUpdate'
  | 'OpportunityStageUpdate'
  | 'AppointmentCreate'
  | 'AppointmentUpdate'
  | 'AppointmentDelete'
  | 'NoteCreate';

export interface GHLWebhookPayload {
  type: GHLWebhookEventType;
  locationId: string;
  id: string;
  // Contact fields (when type is Contact*)
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  // Opportunity fields (when type is Opportunity*)
  pipelineId?: string;
  pipelineStageId?: string;
  status?: string;
  monetaryValue?: number;
  contactId?: string;
  // Appointment fields (when type is Appointment*)
  calendarId?: string;
  startTime?: string;
  endTime?: string;
  title?: string;
  // Metadata
  dateAdded?: string;
  dateUpdated?: string;
}

// ─── Lead Capture Types ──────────────────────────────────────────────

export type LeadSource =
  | 'website-contact'
  | 'website-funeral-homes'
  | 'website-mortuaries'
  | 'website-hospice'
  | 'website-estate-planners'
  | 'website-booking';

export type LeadSegment =
  | 'direct-consumer'
  | 'funeral-home'
  | 'mortuary'
  | 'hospice'
  | 'estate-planner';

export interface LeadCaptureData {
  name: string;
  email: string;
  phone: string;
  service?: string;
  message?: string;
  source: LeadSource;
  segment: LeadSegment;
  preferredDate?: string;
  vesselPreference?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

// ─── Automation Types ────────────────────────────────────────────────

export interface AutomationTrigger {
  type: 'lead_created' | 'opportunity_stage_changed' | 'appointment_created' | 'service_complete';
  contactId: string;
  segment: LeadSegment;
  data: Record<string, string>;
}

// ─── EPA Compliance Types ────────────────────────────────────────────

export interface EPAReportTask {
  contactId: string;
  opportunityId: string;
  ceremonyDate: string;
  vesselName: string;
  gpsCoordinates?: string;
  reportDueDate: string;
  status: 'pending' | 'filed';
}
