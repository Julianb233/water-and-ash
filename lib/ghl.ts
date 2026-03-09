/**
 * GoHighLevel CRM API Client
 *
 * Provides helpers for interacting with the GHL API,
 * primarily for updating opportunity pipeline stages.
 */

const GHL_BASE_URL =
  process.env.GHL_BASE_URL || 'https://services.leadconnectorhq.com';
const GHL_API_KEY = process.env.GHL_API_KEY;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;

/** Map human-readable stage names to GHL stage IDs from env */
const STAGE_MAP: Record<string, string | undefined> = {
  'New Lead': process.env.GHL_STAGE_NEW_LEAD,
  'Deposit Paid': process.env.GHL_STAGE_DEPOSIT_PAID,
  'Ceremony Scheduled': process.env.GHL_STAGE_CEREMONY_SCHEDULED,
  Completed: process.env.GHL_STAGE_COMPLETED,
};

/**
 * Update a GHL opportunity's pipeline stage.
 *
 * @param opportunityId - The GHL opportunity ID
 * @param stageName - Human-readable stage name (e.g. "Deposit Paid")
 */
export async function updateOpportunityStage(
  opportunityId: string,
  stageName: string
): Promise<void> {
  if (!GHL_API_KEY) {
    console.warn('[ghl] GHL_API_KEY not configured — skipping stage update');
    return;
  }

  const stageId = STAGE_MAP[stageName];
  if (!stageId) {
    console.warn(
      `[ghl] No stage ID mapped for "${stageName}" — check GHL_STAGE_* env vars`
    );
    return;
  }

  const url = `${GHL_BASE_URL}/opportunities/${opportunityId}`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${GHL_API_KEY}`,
      'Content-Type': 'application/json',
      Version: '2021-07-28',
    },
    body: JSON.stringify({
      locationId: GHL_LOCATION_ID,
      pipelineStageId: stageId,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `[ghl] Failed to update opportunity ${opportunityId}: ${response.status} ${body}`
    );
  }

  console.log(
    `[ghl] Updated opportunity ${opportunityId} to stage "${stageName}" (${stageId})`
  );
}
