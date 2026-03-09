export { ghlClient } from './client';
export { GHL_CONFIG, getCalendarIdForVessel, getSegmentForSource } from './config';
export { captureLead, type LeadCaptureResult } from './lead-capture';
export {
  triggerLeadAutomation,
  triggerBookingConfirmation,
  triggerPreCeremonyReminder,
  triggerPostServiceFollowup,
  triggerEPAComplianceWorkflow,
  handleServiceComplete,
} from './automations';
export type * from './types';
