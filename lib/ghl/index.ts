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
 * B2C pipeline stage mapping (consumer inquiries).
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
 * B2B pipeline stage mapping (partner inquiries).
 * Stages: Partner Inquiry → Discovery → Agreement → Active Partner
 * CRM-06 requirement.
 */
const B2B_STAGE_MAP: Record<string, string> = {
  'Partner Inquiry': process.env.GHL_B2B_STAGE_PARTNER_INQUIRY || '',
  'Discovery': process.env.GHL_B2B_STAGE_DISCOVERY || '',
  'Agreement': process.env.GHL_B2B_STAGE_AGREEMENT || '',
  'Active Partner': process.env.GHL_B2B_STAGE_ACTIVE_PARTNER || '',
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

/**
 * Create a GHL contact and opportunity in the B2B partner pipeline.
 *
 * Called by the partner inquiry API route when a new B2B form is submitted.
 * Creates the contact, then creates an opportunity at the "Partner Inquiry" stage.
 * CRM-06 requirement.
 */
export async function createB2BPartnerOpportunity(partner: {
  contactName: string;
  businessName: string;
  email: string;
  phone: string;
  businessType: string;
  source?: string;
}): Promise<{ contactId: string; opportunityId: string } | null> {
  const { apiKey, locationId } = getConfig();
  const pipelineId = process.env.GHL_B2B_PIPELINE_ID;

  if (!pipelineId) {
    console.warn('[ghl] GHL_B2B_PIPELINE_ID not set. Skipping B2B opportunity creation.');
    return null;
  }

  const stageId = B2B_STAGE_MAP['Partner Inquiry'];
  if (!stageId) {
    console.warn('[ghl] GHL_B2B_STAGE_PARTNER_INQUIRY not set. Skipping B2B opportunity creation.');
    return null;
  }

  // Create or update contact
  const nameParts = partner.contactName.trim().split(/\s+/);
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const contactResponse = await fetch(
    `${GHL_API_BASE}/contacts/`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Version: '2021-07-28',
      },
      body: JSON.stringify({
        locationId,
        firstName,
        lastName,
        email: partner.email,
        phone: partner.phone,
        companyName: partner.businessName,
        tags: ['b2b-partner', partner.businessType],
        source: partner.source || 'partner-inquiry-form',
      }),
    }
  );

  if (!contactResponse.ok) {
    const errorBody = await contactResponse.text();
    console.error(`[ghl] Contact creation failed (${contactResponse.status}): ${errorBody}`);
    throw new Error(`GHL contact creation failed: ${errorBody}`);
  }

  const contactData = await contactResponse.json();
  const contactId = contactData.contact?.id;

  if (!contactId) {
    console.error('[ghl] No contact ID returned from GHL');
    return null;
  }

  // Create opportunity in B2B pipeline
  const opportunityResponse = await fetch(
    `${GHL_API_BASE}/opportunities/`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Version: '2021-07-28',
      },
      body: JSON.stringify({
        locationId,
        pipelineId,
        pipelineStageId: stageId,
        contactId,
        name: `B2B Partner: ${partner.businessName}`,
        status: 'open',
        source: partner.source || 'partner-inquiry-form',
      }),
    }
  );

  if (!opportunityResponse.ok) {
    const errorBody = await opportunityResponse.text();
    console.error(`[ghl] Opportunity creation failed (${opportunityResponse.status}): ${errorBody}`);
    throw new Error(`GHL opportunity creation failed: ${errorBody}`);
  }

  const opportunityData = await opportunityResponse.json();
  const opportunityId = opportunityData.opportunity?.id;

  console.log(`[ghl] B2B opportunity created: contact=${contactId}, opportunity=${opportunityId}`);
  return { contactId, opportunityId: opportunityId || '' };
}

/**
 * Move a B2B partner opportunity to a new pipeline stage.
 */
export async function updateB2BOpportunityStage(
  opportunityId: string,
  stageName: string
): Promise<void> {
  const { apiKey } = getConfig();
  const pipelineStageId = B2B_STAGE_MAP[stageName];

  if (!pipelineStageId) {
    console.warn(
      `[ghl] No B2B stage ID mapped for "${stageName}". Check GHL_B2B_STAGE_* env vars.`
    );
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
      `GHL B2B API error (${response.status}): ${errorBody}`
    );
  }
}
