/**
 * Email template exports
 *
 * Drip sequences (pre-booking):
 * - AUTO-01: B2C post-inquiry drip (4 emails over 7 days)
 * - AUTO-02: B2B partner nurture drip (4 emails over 10 days)
 *
 * Ceremony lifecycle (post-booking):
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
export { enqueueB2CDrip, enqueueB2BDrip } from './drip';
export type { B2CLeadDetails, B2BLeadDetails } from './drip';
