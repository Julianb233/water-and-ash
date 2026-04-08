/**
 * GoHighLevel Webhook Handler — /api/webhooks/gohighlevel
 *
 * Requirements:
 *   CRM-10  GHL webhook endpoint with signature verification and idempotency
 *
 * Flow:
 *   1. Receive raw body
 *   2. Verify webhook signature (HMAC-SHA256 using GHL_WEBHOOK_SECRET)
 *   3. Check idempotency (skip duplicate event deliveries)
 *   4. Route event to appropriate handler
 *
 * GHL webhook events:
 *   - AppointmentCreate / AppointmentUpdate / AppointmentDelete
 *   - ContactCreate / ContactUpdate
 *   - OpportunityStageUpdate
 *   - NoteCreate
 */

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// ─── Configuration ────────────────────────────────────────────────────────

const WEBHOOK_SECRET = process.env.GHL_WEBHOOK_SECRET || '';

// In-memory idempotency store with TTL (24h window for dedup)
// In production, replace with Redis or DB-backed store
const processedEvents = new Map<string, number>();
const IDEMPOTENCY_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const MAX_CACHE_SIZE = 10_000;

// ─── GHL Event Types ──────────────────────────────────────────────────────

interface GHLWebhookPayload {
  type: string;
  locationId?: string;
  id?: string;
  [key: string]: unknown;
}

// ─── Signature Verification ───────────────────────────────────────────────

/**
 * Verify GHL webhook signature.
 *
 * GHL signs webhooks with HMAC-SHA256 using the webhook secret.
 * The signature is sent in the `x-ghl-signature` header.
 */
function verifySignature(body: string, signature: string | null): boolean {
  if (!WEBHOOK_SECRET) {
    console.warn('[ghl-webhook] GHL_WEBHOOK_SECRET not configured — skipping verification');
    return true; // Allow in dev when secret isn't set
  }

  if (!signature) {
    return false;
  }

  const expected = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(body, 'utf8')
    .digest('hex');

  // Constant-time comparison to prevent timing attacks
  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expected),
    );
  } catch {
    // Buffers different length — signature invalid
    return false;
  }
}

// ─── Idempotency ──────────────────────────────────────────────────────────

/**
 * Generate an idempotency key from the event.
 * Uses the event type + resource ID + timestamp to deduplicate.
 */
function getIdempotencyKey(payload: GHLWebhookPayload, headerKey: string | null): string {
  // Prefer GHL's delivery ID header if present
  if (headerKey) return headerKey;

  // Fall back to type + id combo
  return `${payload.type}:${payload.id || 'unknown'}`;
}

function isDuplicate(key: string): boolean {
  const timestamp = processedEvents.get(key);
  if (!timestamp) return false;

  // Check if within TTL window
  if (Date.now() - timestamp < IDEMPOTENCY_TTL_MS) {
    return true;
  }

  // Expired — remove and allow reprocessing
  processedEvents.delete(key);
  return false;
}

function markProcessed(key: string): void {
  // Evict oldest entries if cache is full
  if (processedEvents.size >= MAX_CACHE_SIZE) {
    const oldestKey = processedEvents.keys().next().value;
    if (oldestKey) processedEvents.delete(oldestKey);
  }

  processedEvents.set(key, Date.now());
}

// ─── Event Handlers ───────────────────────────────────────────────────────

async function handleAppointmentCreate(payload: GHLWebhookPayload): Promise<void> {
  console.log('[ghl-webhook] Appointment created:', {
    id: payload.id,
    calendarId: payload.calendarId,
    contactId: payload.contactId,
  });
  // Future: send confirmation email, update internal tracking
}

async function handleAppointmentUpdate(payload: GHLWebhookPayload): Promise<void> {
  console.log('[ghl-webhook] Appointment updated:', {
    id: payload.id,
    status: payload.status,
  });
  // Future: send reschedule notification, update calendar
}

async function handleAppointmentDelete(payload: GHLWebhookPayload): Promise<void> {
  console.log('[ghl-webhook] Appointment cancelled:', {
    id: payload.id,
  });
  // Future: send cancellation email, free up calendar slot
}

async function handleContactCreate(payload: GHLWebhookPayload): Promise<void> {
  console.log('[ghl-webhook] New contact created:', {
    id: payload.id,
    email: payload.email,
  });
  // Future: trigger welcome email sequence
}

async function handleOpportunityStageUpdate(payload: GHLWebhookPayload): Promise<void> {
  console.log('[ghl-webhook] Opportunity stage changed:', {
    id: payload.id,
    pipelineStageId: payload.pipelineStageId,
  });
  // Future: trigger ceremony scheduling flow when moved to "Ceremony Scheduled"
}

// ─── Route Handler ────────────────────────────────────────────────────────

export async function POST(req: NextRequest): Promise<NextResponse> {
  // Step 1: Read raw body for signature verification
  const body = await req.text();

  // Step 2: Verify signature (CRM-10)
  const signature = req.headers.get('x-ghl-signature');
  if (!verifySignature(body, signature)) {
    console.error('[ghl-webhook] Signature verification failed');
    return NextResponse.json(
      { error: 'Invalid webhook signature' },
      { status: 401 },
    );
  }

  // Step 3: Parse payload
  let payload: GHLWebhookPayload;
  try {
    payload = JSON.parse(body);
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 },
    );
  }

  // Step 4: Idempotency check — skip duplicate deliveries
  const deliveryId = req.headers.get('x-ghl-delivery-id');
  const idempotencyKey = getIdempotencyKey(payload, deliveryId);

  if (isDuplicate(idempotencyKey)) {
    console.log(`[ghl-webhook] Duplicate event skipped: ${idempotencyKey}`);
    return NextResponse.json({ received: true, duplicate: true }, { status: 200 });
  }

  // Step 5: Route to event handler
  try {
    switch (payload.type) {
      case 'AppointmentCreate':
        await handleAppointmentCreate(payload);
        break;

      case 'AppointmentUpdate':
        await handleAppointmentUpdate(payload);
        break;

      case 'AppointmentDelete':
        await handleAppointmentDelete(payload);
        break;

      case 'ContactCreate':
      case 'ContactUpdate':
        await handleContactCreate(payload);
        break;

      case 'OpportunityStageUpdate':
        await handleOpportunityStageUpdate(payload);
        break;

      default:
        console.log(`[ghl-webhook] Unhandled event type: ${payload.type}`);
    }

    // Mark as processed after successful handling
    markProcessed(idempotencyKey);

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error(`[ghl-webhook] Error handling ${payload.type}:`, message);
    // Return 500 so GHL will retry
    return NextResponse.json(
      { error: `Webhook handler failed: ${message}` },
      { status: 500 },
    );
  }
}
