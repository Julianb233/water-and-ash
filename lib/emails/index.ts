/**
 * Email template exports
 *
 * All ceremony lifecycle email templates:
 * - AUTO-03: Booking confirmation
 * - AUTO-04: Pre-ceremony reminder (24h)
 * - AUTO-05: Post-service follow-up (2-3 weeks)
 * - S8: Review request (3-4 weeks)
 */

export { bookingConfirmationEmail } from './booking-confirmation';
export { ceremonyReminderEmail } from './ceremony-reminder';
export { postServiceFollowUpEmail } from './post-service-followup';
export { reviewRequestEmail } from './review-request';
export { emailWrapper, BRAND, formatDate, formatTime } from './shared';
export type { CeremonyDetails } from './shared';
