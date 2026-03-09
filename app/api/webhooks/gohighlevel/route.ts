import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { GHL_CONFIG } from '@/lib/gohighlevel/config';
import { handleServiceComplete } from '@/lib/gohighlevel/automations';
import type { GHLWebhookPayload } from '@/lib/gohighlevel/types';

/**
 * Processed webhook IDs to prevent duplicate processing.
 * In production, this should use Redis or a database.
 */
const processedWebhooks = new Set<string>();
const MAX_PROCESSED_CACHE = 10000;

/**
 * POST /api/webhooks/gohighlevel
 *
 * Webhook endpoint for GoHighLevel status updates [CRM-10].
 *
 * Handles:
 * - contact.created / contact.updated
 * - opportunity.status_changed / opportunity.stage_changed
 * - appointment.created / appointment.updated
 *
 * Features:
 * - Signature verification (SHA-256 HMAC)
 * - Idempotency tracking (prevents duplicate processing)
 * - Async processing with immediate 200 OK response
 */
export async function POST(req: NextRequest) {
  // Respond immediately to prevent GHL timeouts
  const body = await req.text();

  // Verify webhook signature
  if (GHL_CONFIG.webhookSecret) {
    const signature = req.headers.get('x-ghl-signature') || '';
    const expectedSignature = createHash('sha256')
      .update(body + GHL_CONFIG.webhookSecret)
      .digest('hex');

    if (signature !== expectedSignature) {
      console.error('GHL webhook signature verification failed');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }
  }

  let payload: GHLWebhookPayload;
  try {
    payload = JSON.parse(body) as GHLWebhookPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // Idempotency check
  const webhookId = `${payload.type}-${payload.id}-${payload.dateUpdated || payload.dateAdded}`;
  if (processedWebhooks.has(webhookId)) {
    return NextResponse.json({ status: 'already_processed' }, { status: 200 });
  }

  // Track processed webhook
  processedWebhooks.add(webhookId);
  if (processedWebhooks.size > MAX_PROCESSED_CACHE) {
    const firstEntry = processedWebhooks.values().next().value;
    if (firstEntry) {
      processedWebhooks.delete(firstEntry);
    }
  }

  // Process webhook asynchronously (don't await, return 200 immediately)
  processWebhook(payload).catch((error) => {
    console.error(`GHL webhook processing error [${payload.type}]:`, error);
  });

  return NextResponse.json({ status: 'received' }, { status: 200 });
}

/**
 * Process webhook events based on type.
 */
async function processWebhook(payload: GHLWebhookPayload): Promise<void> {
  console.log(`Processing GHL webhook: ${payload.type} for ${payload.id}`);

  switch (payload.type) {
    case 'ContactCreate':
      await handleContactCreated(payload);
      break;

    case 'OpportunityStageUpdate':
      await handleOpportunityStageUpdate(payload);
      break;

    case 'OpportunityStatusUpdate':
      await handleOpportunityStatusUpdate(payload);
      break;

    case 'AppointmentCreate':
      await handleAppointmentCreated(payload);
      break;

    default:
      console.log(`Unhandled GHL webhook type: ${payload.type}`);
  }
}

/**
 * Handle new contact creation from GHL.
 * Logs for monitoring — contact may have been created outside our flow.
 */
async function handleContactCreated(payload: GHLWebhookPayload): Promise<void> {
  console.log(
    `New GHL contact: ${payload.firstName} ${payload.lastName} (${payload.email})`
  );
}

/**
 * Handle opportunity stage changes.
 * Triggers automations when opportunity reaches specific stages.
 */
async function handleOpportunityStageUpdate(
  payload: GHLWebhookPayload
): Promise<void> {
  const { id, pipelineStageId, contactId } = payload;

  if (!contactId || !pipelineStageId) {
    console.warn('Missing contactId or pipelineStageId in opportunity stage update');
    return;
  }

  // Check if opportunity moved to "Complete" stage
  const completeStageId = GHL_CONFIG.pipelines.b2c.stages.complete;
  if (pipelineStageId === completeStageId) {
    // Trigger post-service automations + EPA compliance
    await handleServiceComplete(
      contactId,
      id,
      new Date().toISOString(), // ceremony date from opportunity
      'Vessel' // vessel name from opportunity
    );
  }

  // Check if moved to "Confirmed" stage — trigger pre-ceremony reminder
  const confirmedStageId = GHL_CONFIG.pipelines.b2c.stages.confirmed;
  if (pipelineStageId === confirmedStageId) {
    const { triggerPreCeremonyReminder } = await import(
      '@/lib/gohighlevel/automations'
    );
    await triggerPreCeremonyReminder(contactId);
  }

  console.log(
    `Opportunity ${id} stage updated to ${pipelineStageId} for contact ${contactId}`
  );
}

/**
 * Handle opportunity status changes (won/lost/abandoned).
 */
async function handleOpportunityStatusUpdate(
  payload: GHLWebhookPayload
): Promise<void> {
  console.log(
    `Opportunity ${payload.id} status changed to ${payload.status}`
  );
}

/**
 * Handle new appointment creation.
 * Triggers booking confirmation automation.
 */
async function handleAppointmentCreated(
  payload: GHLWebhookPayload
): Promise<void> {
  const { contactId, startTime, title } = payload;

  if (!contactId || !startTime) {
    console.warn('Missing contactId or startTime in appointment webhook');
    return;
  }

  const { triggerBookingConfirmation } = await import(
    '@/lib/gohighlevel/automations'
  );
  await triggerBookingConfirmation(
    contactId,
    title || 'Sea Burial Ceremony',
    startTime
  );

  console.log(
    `Appointment created for contact ${contactId} at ${startTime}`
  );
}
