/**
 * GoHighLevel API Client
 *
 * Handles communication with the GHL CRM for:
 * - Contact lookup and updates
 * - Opportunity/pipeline management
 * - Calendar/appointment queries
 * - Tag management for automation tracking
 */

const GHL_BASE_URL =
  process.env.GHL_BASE_URL || 'https://services.leadconnectorhq.com';
const GHL_API_KEY = process.env.GHL_API_KEY || '';
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || '';

interface GHLRequestOptions {
  method?: string;
  body?: Record<string, unknown>;
  params?: Record<string, string>;
}

async function ghlFetch<T>(
  path: string,
  options: GHLRequestOptions = {}
): Promise<T> {
  const { method = 'GET', body, params } = options;

  const url = new URL(`${GHL_BASE_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.set(key, value)
    );
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${GHL_API_KEY}`,
    'Content-Type': 'application/json',
    Version: '2021-07-28',
  };

  const response = await fetch(url.toString(), {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `GHL API error (${response.status}): ${errorText}`
    );
  }

  return response.json() as Promise<T>;
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface GHLContact {
  id: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email?: string;
  phone?: string;
  tags?: string[];
  customFields?: Array<{ id: string; value: string }>;
}

export interface GHLOpportunity {
  id: string;
  name: string;
  status: string;
  pipelineId: string;
  pipelineStageId: string;
  contactId: string;
  monetaryValue?: number;
  customFields?: Array<{ id: string; key: string; value: string }>;
}

// ─── Contact Operations ──────────────────────────────────────────────────────

export async function getContact(contactId: string): Promise<GHLContact> {
  const data = await ghlFetch<{ contact: GHLContact }>(
    `/contacts/${contactId}`
  );
  return data.contact;
}

export async function addTagsToContact(
  contactId: string,
  tags: string[]
): Promise<void> {
  await ghlFetch(`/contacts/${contactId}/tags`, {
    method: 'POST',
    body: { tags },
  });
}

// ─── Opportunity Operations ──────────────────────────────────────────────────

export async function getOpportunity(
  opportunityId: string
): Promise<GHLOpportunity> {
  const data = await ghlFetch<{ opportunity: GHLOpportunity }>(
    `/opportunities/${opportunityId}`
  );
  return data.opportunity;
}

export async function updateOpportunityStatus(
  opportunityId: string,
  status: string
): Promise<void> {
  await ghlFetch(`/opportunities/${opportunityId}/status`, {
    method: 'PUT',
    body: { status },
  });
}

/**
 * Update an opportunity's pipeline stage by stage name.
 * Used by the Stripe webhook to move opportunities to "Deposit Paid".
 *
 * GHL API requires the pipeline stage ID, so we look up the pipeline first
 * to resolve the stage name → stage ID mapping.
 */
export async function updateOpportunityStage(
  opportunityId: string,
  stageName: string
): Promise<void> {
  // First, get the current opportunity to find its pipeline
  const opportunity = await getOpportunity(opportunityId);

  // Fetch pipeline stages to resolve the stage name → ID
  const pipeline = await ghlFetch<{
    pipeline: {
      id: string;
      stages: Array<{ id: string; name: string }>;
    };
  }>(`/opportunities/pipelines/${opportunity.pipelineId}`);

  const targetStage = pipeline.pipeline.stages.find(
    (s) => s.name.toLowerCase() === stageName.toLowerCase()
  );

  if (!targetStage) {
    throw new Error(
      `Stage "${stageName}" not found in pipeline ${opportunity.pipelineId}. ` +
        `Available stages: ${pipeline.pipeline.stages.map((s) => s.name).join(', ')}`
    );
  }

  // Update the opportunity with the new stage
  await ghlFetch(`/opportunities/${opportunityId}`, {
    method: 'PUT',
    body: {
      pipelineStageId: targetStage.id,
    },
  });
}

export async function searchOpportunities(filters: {
  pipelineId?: string;
  status?: string;
  contactId?: string;
}): Promise<GHLOpportunity[]> {
  const params: Record<string, string> = {
    location_id: GHL_LOCATION_ID,
  };
  if (filters.pipelineId) params.pipeline_id = filters.pipelineId;
  if (filters.status) params.status = filters.status;
  if (filters.contactId) params.contact_id = filters.contactId;

  const data = await ghlFetch<{ opportunities: GHLOpportunity[] }>(
    '/opportunities/search',
    { method: 'GET', params }
  );
  return data.opportunities || [];
}
