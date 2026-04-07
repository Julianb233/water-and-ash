/**
 * GoHighLevel B2C Pipeline — Opportunity Management
 *
 * B2C Pipeline stages:
 *   Inquiry → Consultation → Deposit → Confirmed → Complete
 *
 * Each stage maps to a GHL pipeline stage ID configured via env vars.
 * Opportunities move through stages as the customer progresses
 * from initial inquiry to completed ceremony.
 */

const GHL_API_BASE = process.env.GHL_BASE_URL || 'https://services.leadconnectorhq.com';
const API_VERSION = '2021-07-28';

// ─── Pipeline Stage Definitions ───────────────────────────────────────────

export const PIPELINE_STAGES = {
  inquiry: {
    name: 'Inquiry',
    envVar: 'GHL_STAGE_INQUIRY',
    order: 1,
    description: 'Initial contact — website form, phone call, or referral',
  },
  consultation: {
    name: 'Consultation',
    envVar: 'GHL_STAGE_CONSULTATION',
    order: 2,
    description: 'Consultation scheduled or completed — discussing ceremony details',
  },
  deposit: {
    name: 'Deposit',
    envVar: 'GHL_STAGE_DEPOSIT_PAID',
    order: 3,
    description: 'Deposit paid via Stripe — ceremony financially committed',
  },
  confirmed: {
    name: 'Confirmed',
    envVar: 'GHL_STAGE_CEREMONY_SCHEDULED',
    order: 4,
    description: 'Ceremony date confirmed, vessel reserved, details finalized',
  },
  complete: {
    name: 'Complete',
    envVar: 'GHL_STAGE_COMPLETED',
    order: 5,
    description: 'Ceremony completed — trigger post-service follow-up',
  },
} as const;

export type PipelineStage = keyof typeof PIPELINE_STAGES;

/**
 * Resolve a stage name to its GHL pipeline stage ID.
 * Returns null if the env var isn't configured.
 */
export function getStageId(stage: PipelineStage): string | null {
  const config = PIPELINE_STAGES[stage];
  const id = process.env[config.envVar];
  return id || null;
}

/**
 * Get the GHL pipeline ID from env vars.
 */
function getPipelineId(): string {
  const id = process.env.GHL_PIPELINE_ID;
  if (!id) throw new Error('GHL_PIPELINE_ID is not configured');
  return id;
}

function getApiKey(): string {
  const key = process.env.GHL_API_KEY;
  if (!key) throw new Error('GHL_API_KEY is not configured');
  return key;
}

function getLocationId(): string {
  const id = process.env.GHL_LOCATION_ID;
  if (!id) throw new Error('GHL_LOCATION_ID is not configured');
  return id;
}

function ghlHeaders(): Record<string, string> {
  return {
    Authorization: `Bearer ${getApiKey()}`,
    'Content-Type': 'application/json',
    Version: API_VERSION,
  };
}

// ─── Opportunity Types ────────────────────────────────────────────────────

export interface CreateOpportunityInput {
  contactId: string;
  name: string;
  stage?: PipelineStage;
  monetaryValue?: number;
  source?: string;
  vesselId?: string;
  ceremonyDate?: string;
}

export interface Opportunity {
  id: string;
  name: string;
  pipelineId: string;
  pipelineStageId: string;
  contactId: string;
  monetaryValue?: number;
  status: string;
}

// ─── Opportunity CRUD ─────────────────────────────────────────────────────

/**
 * Create a new opportunity in the B2C pipeline.
 * Defaults to the "Inquiry" stage.
 */
export async function createOpportunity(
  input: CreateOpportunityInput,
): Promise<Opportunity> {
  const stage = input.stage || 'inquiry';
  const stageId = getStageId(stage);

  if (!stageId) {
    throw new Error(
      `Pipeline stage "${stage}" not configured. Set ${PIPELINE_STAGES[stage].envVar} env var.`,
    );
  }

  const response = await fetch(`${GHL_API_BASE}/opportunities/`, {
    method: 'POST',
    headers: ghlHeaders(),
    body: JSON.stringify({
      pipelineId: getPipelineId(),
      pipelineStageId: stageId,
      locationId: getLocationId(),
      contactId: input.contactId,
      name: input.name,
      monetaryValue: input.monetaryValue,
      source: input.source || 'website',
      customFields: [
        input.vesselId ? { key: 'vessel', value: input.vesselId } : null,
        input.ceremonyDate ? { key: 'ceremony_date', value: input.ceremonyDate } : null,
      ].filter(Boolean),
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`GHL create opportunity failed (${response.status}): ${errorBody}`);
  }

  const data = await response.json();
  return {
    id: data.opportunity?.id || data.id,
    name: input.name,
    pipelineId: getPipelineId(),
    pipelineStageId: stageId,
    contactId: input.contactId,
    monetaryValue: input.monetaryValue,
    status: 'open',
  };
}

/**
 * Move an opportunity to a new pipeline stage.
 *
 * Validates that the target stage is valid and configured.
 * Used by webhook handlers and the booking flow to advance
 * opportunities through the B2C pipeline.
 */
export async function moveOpportunityToStage(
  opportunityId: string,
  stage: PipelineStage,
): Promise<void> {
  const stageId = getStageId(stage);

  if (!stageId) {
    console.warn(
      `[ghl-pipeline] Stage "${stage}" not configured (${PIPELINE_STAGES[stage].envVar}). Skipping.`,
    );
    return;
  }

  const response = await fetch(
    `${GHL_API_BASE}/opportunities/${opportunityId}`,
    {
      method: 'PUT',
      headers: ghlHeaders(),
      body: JSON.stringify({ pipelineStageId: stageId }),
    },
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `GHL update opportunity failed (${response.status}): ${errorBody}`,
    );
  }
}

/**
 * Get an opportunity by ID.
 */
export async function getOpportunity(
  opportunityId: string,
): Promise<Opportunity | null> {
  const response = await fetch(
    `${GHL_API_BASE}/opportunities/${opportunityId}`,
    { headers: ghlHeaders() },
  );

  if (!response.ok) {
    if (response.status === 404) return null;
    const errorBody = await response.text();
    throw new Error(
      `GHL get opportunity failed (${response.status}): ${errorBody}`,
    );
  }

  const data = await response.json();
  const opp = data.opportunity || data;

  return {
    id: opp.id,
    name: opp.name,
    pipelineId: opp.pipelineId,
    pipelineStageId: opp.pipelineStageId,
    contactId: opp.contactId,
    monetaryValue: opp.monetaryValue,
    status: opp.status,
  };
}

/**
 * Search opportunities by contact ID.
 * Returns all opportunities for a given contact in the B2C pipeline.
 */
export async function getOpportunitiesByContact(
  contactId: string,
): Promise<Opportunity[]> {
  const params = new URLSearchParams({
    location_id: getLocationId(),
    contact_id: contactId,
    pipeline_id: getPipelineId(),
  });

  const response = await fetch(
    `${GHL_API_BASE}/opportunities/search?${params}`,
    { headers: ghlHeaders() },
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `GHL search opportunities failed (${response.status}): ${errorBody}`,
    );
  }

  const data = await response.json();
  const opportunities = data.opportunities || [];

  return opportunities.map((opp: Record<string, unknown>) => ({
    id: opp.id as string,
    name: opp.name as string,
    pipelineId: opp.pipelineId as string,
    pipelineStageId: opp.pipelineStageId as string,
    contactId: opp.contactId as string,
    monetaryValue: opp.monetaryValue as number | undefined,
    status: opp.status as string,
  }));
}
