/**
 * GoHighLevel API client
 *
 * Handles:
 * - Opportunity stage updates (Stripe webhook → pipeline)
 * - Per-vessel calendar availability and booking with conflict detection
 */

export { type DayAvailability, type AvailableSlot, type BookingRequest, type BookingResponse } from './types';
export {
  getVesselAvailability,
  createBooking,
  getVessel,
  VESSELS,
  BookingConflictError,
} from './calendar';
export {
  createOpportunity,
  moveOpportunityToStage,
  getOpportunity,
  getOpportunitiesByContact,
  getStageId,
  PIPELINE_STAGES,
  type PipelineStage,
  type CreateOpportunityInput,
  type Opportunity,
} from './pipeline';

import { moveOpportunityToStage } from './pipeline';
import type { PipelineStage } from './pipeline';

/**
 * Legacy stage name → pipeline stage key mapping.
 * Used by the Stripe webhook which passes human-readable names.
 */
const LEGACY_STAGE_MAP: Record<string, PipelineStage> = {
  'New Lead': 'inquiry',
  'Deposit Paid': 'deposit',
  'Ceremony Scheduled': 'confirmed',
  'Completed': 'complete',
};

/**
 * Update a GHL opportunity's pipeline stage.
 *
 * Called by the Stripe webhook handler after successful payment
 * to move the opportunity to "Deposit Paid" stage (PAY-04).
 *
 * Accepts legacy stage names (for backward compat) or pipeline stage keys.
 */
export async function updateOpportunityStage(
  opportunityId: string,
  stageName: string
): Promise<void> {
  const pipelineStage = LEGACY_STAGE_MAP[stageName];

  if (!pipelineStage) {
    console.warn(
      `[ghl] No stage mapped for "${stageName}". Valid names: ${Object.keys(LEGACY_STAGE_MAP).join(', ')}`
    );
    return;
  }

  await moveOpportunityToStage(opportunityId, pipelineStage);
}
