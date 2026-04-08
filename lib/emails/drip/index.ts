/**
 * Drip sequence exports
 *
 * AUTO-01: B2C post-inquiry drip (4 emails over 7 days)
 * AUTO-02: B2B partner nurture drip (4 emails over 10 days)
 */

export { enqueueB2CDrip } from './scheduler';
export { enqueueB2BDrip } from './scheduler';
export type { B2CLeadDetails } from './b2c-sequence';
export type { B2BLeadDetails } from './b2b-sequence';
