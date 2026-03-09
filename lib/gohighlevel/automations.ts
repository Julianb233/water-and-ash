import { ghlClient } from './client';
import { GHL_CONFIG } from './config';
import type { LeadSegment } from './types';

/**
 * Automation workflows for Water & Ash Burials
 *
 * These functions trigger GHL automations by adding tags and notes
 * that GHL workflows listen to. The actual email/SMS sequences
 * are configured in GHL's workflow builder.
 */

// ─── Tag-Based Automation Triggers ───────────────────────────────────
// GHL workflows trigger on tag additions. We add tags to contacts
// and GHL handles the email/SMS automation sequences.

const AUTOMATION_TAGS = {
  // Drip sequence triggers
  b2cDrip: 'automation-b2c-drip',
  b2bNurture: 'automation-b2b-nurture',

  // Notification triggers
  ownerNotify: 'notify-owner-new-lead',
  autoResponse: 'automation-auto-response',

  // Booking triggers
  bookingConfirmation: 'automation-booking-confirmation',
  preServiceReminder: 'automation-pre-service-reminder',

  // Post-service triggers
  postServiceFollowup: 'automation-post-service-followup',
  reviewRequest: 'automation-review-request',

  // EPA compliance
  epaReportRequired: 'epa-report-required',

  // Segment tags
  segments: {
    'direct-consumer': 'segment-b2c',
    'funeral-home': 'segment-funeral-home',
    mortuary: 'segment-mortuary',
    hospice: 'segment-hospice',
    'estate-planner': 'segment-estate-planner',
  } as Record<string, string>,
} as const;

/**
 * Trigger post-inquiry automation based on lead segment.
 * [AUTO-01] B2C drip sequence
 * [AUTO-02] B2B partnership nurture sequence
 * [CRM-03] Auto-response email (< 5min)
 * [CRM-04] SMS + email owner notification
 */
export async function triggerLeadAutomation(
  contactId: string,
  segment: LeadSegment
): Promise<void> {
  const tags: string[] = [
    AUTOMATION_TAGS.autoResponse,
    AUTOMATION_TAGS.ownerNotify,
  ];

  // Add segment tag
  const segmentTag = AUTOMATION_TAGS.segments[segment];
  if (segmentTag) {
    tags.push(segmentTag);
  }

  // Trigger appropriate drip sequence
  if (segment === 'direct-consumer') {
    tags.push(AUTOMATION_TAGS.b2cDrip);
  } else {
    tags.push(AUTOMATION_TAGS.b2bNurture);
  }

  await ghlClient.addContactTags(contactId, tags);

  // Add a note for the owner's context
  const segmentLabel = segment.replace(/-/g, ' ');
  await ghlClient.addContactNote(
    contactId,
    `New ${segmentLabel} lead from website. Auto-response sent. Drip sequence started.`
  );
}

/**
 * Trigger booking confirmation automation.
 * [AUTO-03] Booking confirmation email with ceremony details
 */
export async function triggerBookingConfirmation(
  contactId: string,
  vesselName: string,
  ceremonyDate: string
): Promise<void> {
  await ghlClient.addContactTags(contactId, [
    AUTOMATION_TAGS.bookingConfirmation,
  ]);

  await ghlClient.addContactNote(
    contactId,
    `Booking confirmed: ${vesselName} on ${ceremonyDate}. Confirmation email sent.`
  );
}

/**
 * Trigger pre-ceremony reminder.
 * [AUTO-04] Pre-ceremony reminder (24 hours before)
 *
 * Note: This is triggered by a GHL workflow based on appointment date.
 * We add the tag so the workflow knows to include this contact.
 */
export async function triggerPreCeremonyReminder(
  contactId: string
): Promise<void> {
  await ghlClient.addContactTags(contactId, [
    AUTOMATION_TAGS.preServiceReminder,
  ]);
}

/**
 * Trigger post-service follow-up and review request.
 * [AUTO-05] Post-service follow-up (grief-sensitive, 2-3 weeks after)
 * [S8] Post-service review request automation
 */
export async function triggerPostServiceFollowup(
  contactId: string
): Promise<void> {
  await ghlClient.addContactTags(contactId, [
    AUTOMATION_TAGS.postServiceFollowup,
    AUTOMATION_TAGS.reviewRequest,
  ]);

  await ghlClient.addContactNote(
    contactId,
    'Service complete. Post-service follow-up (2-3 weeks) and review request queued.'
  );
}

/**
 * Create EPA compliance task and trigger workflow.
 * EPA burial at sea reporting is required. Creates a task with
 * a 30-day deadline and triggers the reminder automation.
 */
export async function triggerEPAComplianceWorkflow(
  contactId: string,
  opportunityId: string,
  ceremonyDate: string,
  vesselName: string
): Promise<void> {
  // Calculate 30-day EPA report deadline
  const ceremony = new Date(ceremonyDate);
  const reportDueDate = new Date(ceremony);
  reportDueDate.setDate(reportDueDate.getDate() + 30);

  // Create EPA report task
  await ghlClient.createTask(
    contactId,
    `EPA Report - ${vesselName} - ${ceremonyDate}`,
    reportDueDate.toISOString(),
    `EPA burial at sea report required for ceremony on ${ceremonyDate} aboard ${vesselName}. ` +
      `Report must be filed within 30 days of ceremony. Due: ${reportDueDate.toISOString().split('T')[0]}. ` +
      `Opportunity ID: ${opportunityId}`
  );

  // Add EPA tag for workflow trigger
  await ghlClient.addContactTags(contactId, [
    AUTOMATION_TAGS.epaReportRequired,
  ]);

  // Update custom fields for EPA tracking
  if (GHL_CONFIG.customFields.epaReportStatus) {
    await ghlClient.updateContact(contactId, {
      customFields: [
        { id: GHL_CONFIG.customFields.epaReportStatus, value: 'pending' },
        {
          id: GHL_CONFIG.customFields.epaReportDueDate,
          value: reportDueDate.toISOString().split('T')[0],
        },
      ],
    } as Partial<import('./types').GHLContactCreate>);
  }

  await ghlClient.addContactNote(
    contactId,
    `EPA report task created. Due by ${reportDueDate.toISOString().split('T')[0]}. 30-day reminder automation started.`
  );
}

/**
 * Move opportunity to "Complete" stage and trigger post-service automations.
 * Called when a service is marked as complete.
 */
export async function handleServiceComplete(
  contactId: string,
  opportunityId: string,
  ceremonyDate: string,
  vesselName: string
): Promise<void> {
  // Move to Complete stage
  await ghlClient.updateOpportunityStage(
    opportunityId,
    GHL_CONFIG.pipelines.b2c.stages.complete
  );

  // Trigger post-service follow-up (grief-sensitive, delayed)
  await triggerPostServiceFollowup(contactId);

  // Trigger EPA compliance workflow
  await triggerEPAComplianceWorkflow(
    contactId,
    opportunityId,
    ceremonyDate,
    vesselName
  );
}
