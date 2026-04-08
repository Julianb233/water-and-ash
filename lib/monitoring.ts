import * as Sentry from '@sentry/nextjs';

/**
 * Webhook delivery monitoring for Water & Ash.
 *
 * Tracks webhook send/receive events and alerts on failures.
 * Integrates with Sentry for centralized error tracking.
 */

export type WebhookDirection = 'inbound' | 'outbound';

export interface WebhookEvent {
  /** e.g. 'stripe', 'ghl', 'resend' */
  provider: string;
  /** 'inbound' (receiving) or 'outbound' (sending to external service) */
  direction: WebhookDirection;
  /** HTTP endpoint path */
  endpoint: string;
  /** HTTP status code of the response */
  statusCode?: number;
  /** Duration in milliseconds */
  durationMs?: number;
  /** Whether the webhook was processed successfully */
  success: boolean;
  /** Error message if failed */
  error?: string;
  /** Additional context metadata */
  metadata?: Record<string, string | number | boolean>;
}

/**
 * Log a webhook delivery event to Sentry as a breadcrumb + span.
 * On failure, captures an exception with full context.
 */
export function trackWebhook(event: WebhookEvent): void {
  const tags = {
    'webhook.provider': event.provider,
    'webhook.direction': event.direction,
    'webhook.endpoint': event.endpoint,
    'webhook.success': String(event.success),
  };

  // Add breadcrumb for all webhook events
  Sentry.addBreadcrumb({
    category: 'webhook',
    message: `${event.direction} webhook ${event.success ? 'succeeded' : 'failed'}: ${event.provider} ${event.endpoint}`,
    level: event.success ? 'info' : 'error',
    data: {
      ...tags,
      statusCode: event.statusCode,
      durationMs: event.durationMs,
      ...event.metadata,
    },
  });

  if (!event.success) {
    // Capture failed webhooks as Sentry errors with full context
    Sentry.withScope((scope) => {
      scope.setTags(tags);

      if (event.statusCode) {
        scope.setExtra('statusCode', event.statusCode);
      }
      if (event.durationMs) {
        scope.setExtra('durationMs', event.durationMs);
      }
      if (event.metadata) {
        scope.setExtras(event.metadata);
      }

      scope.setLevel('error');
      scope.setFingerprint([
        'webhook-failure',
        event.provider,
        event.direction,
        event.endpoint,
      ]);

      Sentry.captureMessage(
        `Webhook delivery failed: ${event.provider} ${event.direction} ${event.endpoint}${event.error ? ` — ${event.error}` : ''}`,
        'error'
      );
    });
  }
}

/**
 * Wrap an async outbound webhook call with monitoring.
 * Automatically tracks timing, success/failure, and reports to Sentry.
 */
export async function withWebhookMonitoring<T>(
  provider: string,
  endpoint: string,
  fn: () => Promise<T>,
  metadata?: Record<string, string | number | boolean>
): Promise<T> {
  const start = Date.now();

  try {
    const result = await fn();
    const durationMs = Date.now() - start;

    trackWebhook({
      provider,
      direction: 'outbound',
      endpoint,
      durationMs,
      success: true,
      metadata,
    });

    return result;
  } catch (error) {
    const durationMs = Date.now() - start;

    trackWebhook({
      provider,
      direction: 'outbound',
      endpoint,
      durationMs,
      success: false,
      error: error instanceof Error ? error.message : String(error),
      metadata,
    });

    throw error;
  }
}

/**
 * Track an inbound webhook reception (e.g., Stripe webhook).
 * Call at the start and end of webhook handler processing.
 */
export function trackInboundWebhook(
  provider: string,
  endpoint: string,
  result: { success: boolean; statusCode?: number; error?: string; durationMs?: number },
  metadata?: Record<string, string | number | boolean>
): void {
  trackWebhook({
    provider,
    direction: 'inbound',
    endpoint,
    ...result,
    metadata,
  });
}
