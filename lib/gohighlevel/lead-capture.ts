import { ghlClient } from './client';
import { GHL_CONFIG, getSegmentForSource } from './config';
import { triggerLeadAutomation } from './automations';
import type {
  LeadCaptureData,
  LeadSegment,
  GHLCustomField,
} from './types';

/**
 * Lead Capture Service
 *
 * Handles the full lead capture flow:
 * 1. Create or update contact in GHL
 * 2. Set custom fields (service interest, vessel preference, UTM params)
 * 3. Create opportunity in appropriate pipeline (B2C or B2B)
 * 4. Add segmentation tags
 * 5. Trigger automation workflows (auto-response, drip, notifications)
 */

export interface LeadCaptureResult {
  contactId: string;
  opportunityId: string;
  isExisting: boolean;
}

/**
 * Capture a lead from any website form.
 * Implements CRM-01 through CRM-07, AUTO-01 through AUTO-02.
 */
export async function captureLead(
  data: LeadCaptureData
): Promise<LeadCaptureResult> {
  const segment = data.segment || (getSegmentForSource(data.source) as LeadSegment);
  const isB2B = segment !== 'direct-consumer';

  // Split name into first/last
  const nameParts = data.name.trim().split(/\s+/);
  const firstName = nameParts[0] || data.name;
  const lastName = nameParts.slice(1).join(' ') || '';

  // Build custom fields array
  const customFields: GHLCustomField[] = [];

  if (data.service && GHL_CONFIG.customFields.serviceInterest) {
    customFields.push({
      id: GHL_CONFIG.customFields.serviceInterest,
      value: data.service,
    });
  }
  if (data.preferredDate && GHL_CONFIG.customFields.preferredDate) {
    customFields.push({
      id: GHL_CONFIG.customFields.preferredDate,
      value: data.preferredDate,
    });
  }
  if (data.vesselPreference && GHL_CONFIG.customFields.vesselPreference) {
    customFields.push({
      id: GHL_CONFIG.customFields.vesselPreference,
      value: data.vesselPreference,
    });
  }
  if (data.source && GHL_CONFIG.customFields.leadSource) {
    customFields.push({
      id: GHL_CONFIG.customFields.leadSource,
      value: data.source,
    });
  }
  if (data.utmSource && GHL_CONFIG.customFields.utmSource) {
    customFields.push({
      id: GHL_CONFIG.customFields.utmSource,
      value: data.utmSource,
    });
  }
  if (data.utmMedium && GHL_CONFIG.customFields.utmMedium) {
    customFields.push({
      id: GHL_CONFIG.customFields.utmMedium,
      value: data.utmMedium,
    });
  }
  if (data.utmCampaign && GHL_CONFIG.customFields.utmCampaign) {
    customFields.push({
      id: GHL_CONFIG.customFields.utmCampaign,
      value: data.utmCampaign,
    });
  }

  // Build tags
  const tags: string[] = [
    `source-${data.source}`,
    `segment-${segment}`,
  ];
  if (data.utmCampaign) {
    tags.push(`campaign-${data.utmCampaign}`);
  }

  // Step 1: Check for existing contact
  let contactId: string;
  let isExisting = false;

  const existing = await ghlClient.lookupContactByEmail(data.email);
  if (existing) {
    contactId = existing.contact.id;
    isExisting = true;

    // Update existing contact with new data
    await ghlClient.updateContact(contactId, {
      phone: data.phone,
      tags,
      customFields,
    });
  } else {
    // Create new contact [CRM-01]
    const contactResponse = await ghlClient.createContact({
      firstName,
      lastName,
      email: data.email,
      phone: data.phone,
      source: data.source,
      tags,
      customFields,
    });
    contactId = contactResponse.contact.id;
  }

  // Step 2: Add message as note if provided
  if (data.message) {
    await ghlClient.addContactNote(
      contactId,
      `Website message: ${data.message}`
    );
  }

  // Step 3: Create opportunity in appropriate pipeline [CRM-05, CRM-06]
  const pipeline = isB2B
    ? GHL_CONFIG.pipelines.b2b
    : GHL_CONFIG.pipelines.b2c;
  const initialStage = isB2B
    ? GHL_CONFIG.pipelines.b2b.stages.partnerInquiry
    : GHL_CONFIG.pipelines.b2c.stages.inquiry;

  const monetaryValue = getMonetaryValue(data.service);

  const opportunityResponse = await ghlClient.createOpportunity({
    pipelineId: pipeline.id,
    pipelineStageId: initialStage,
    contactId,
    name: `${data.name} - ${data.service || 'General Inquiry'}`,
    status: 'open',
    monetaryValue,
    source: data.source,
  });

  // Step 4: Trigger automations [CRM-03, CRM-04, AUTO-01, AUTO-02]
  await triggerLeadAutomation(contactId, segment);

  return {
    contactId,
    opportunityId: opportunityResponse.opportunity.id,
    isExisting,
  };
}

/**
 * Get monetary value based on service selection.
 */
function getMonetaryValue(service?: string): number {
  const values: Record<string, number> = {
    osprey: 2000,
    'white-nights': 2000,
    relentless: 2000,
    'at-home': 400,
  };
  return values[service || ''] || 0;
}
