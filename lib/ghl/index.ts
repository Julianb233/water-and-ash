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
  createContact,
  getContactByEmail,
  getContactById,
  addContactTags,
  removeContactTags,
  updateContactCustomFields,
  addContactNote,
  CUSTOM_FIELDS,
  type CreateContactInput,
  type GHLContactResponse,
  type LeadSource,
} from './contacts';

const GHL_API_BASE = 'https://services.leadconnectorhq.com';

interface GHLConfig {
  apiKey: string;
  locationId: string;
}

function getConfig(): GHLConfig {
  const apiKey = process.env.GHL_API_KEY;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!apiKey) {
    throw new Error('GHL_API_KEY environment variable is required');
  }
  if (!locationId) {
    throw new Error('GHL_LOCATION_ID environment variable is required');
  }

  return { apiKey, locationId };
}

/**
 * GHL pipeline stage mapping.
 * Maps human-readable stage names to GHL pipeline stage IDs.
 * These IDs must match the pipeline configuration in GHL.
 */
const STAGE_MAP: Record<string, string> = {
  'New Lead': process.env.GHL_STAGE_NEW_LEAD || '',
  'Deposit Paid': process.env.GHL_STAGE_DEPOSIT_PAID || '',
  'Ceremony Scheduled': process.env.GHL_STAGE_CEREMONY_SCHEDULED || '',
  'Completed': process.env.GHL_STAGE_COMPLETED || '',
};

/**
 * Update a GHL opportunity's pipeline stage.
 *
 * Called by the Stripe webhook handler after successful payment
 * to move the opportunity to "Deposit Paid" stage (PAY-04).
 */
export async function updateOpportunityStage(
  opportunityId: string,
  stageName: string
): Promise<void> {
  const { apiKey } = getConfig();
  const pipelineStageId = STAGE_MAP[stageName];

  if (!pipelineStageId) {
    console.warn(
      `[ghl] No stage ID mapped for "${stageName}". Check GHL_STAGE_* env vars.`
    );
    // Don't throw — log and continue so webhook returns 200
    return;
  }

  const response = await fetch(
    `${GHL_API_BASE}/opportunities/${opportunityId}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Version: '2021-07-28',
      },
      body: JSON.stringify({
        pipelineStageId,
      }),
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `GHL API error (${response.status}): ${errorBody}`
    );
  }
}
