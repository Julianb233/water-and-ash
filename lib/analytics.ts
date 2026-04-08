/**
 * Conversion tracking and lead attribution for Water & Ash.
 *
 * - Captures UTM parameters + referrer on first visit
 * - Persists attribution data across page navigations via sessionStorage
 * - Fires Vercel Analytics custom events on form submissions and bookings
 */

const ATTRIBUTION_KEY = 'wa_attribution';

export interface AttributionData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  landing_page?: string;
  first_visit?: string;
}

/**
 * Capture UTM params and referrer from the current URL.
 * Only stores on first visit within the session (doesn't overwrite).
 */
export function captureAttribution(): void {
  if (typeof window === 'undefined') return;

  // Don't overwrite existing attribution data within same session
  const existing = sessionStorage.getItem(ATTRIBUTION_KEY);
  if (existing) return;

  const params = new URLSearchParams(window.location.search);
  const attribution: AttributionData = {
    landing_page: window.location.pathname,
    first_visit: new Date().toISOString(),
  };

  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;
  for (const key of utmKeys) {
    const value = params.get(key);
    if (value) {
      attribution[key] = value;
    }
  }

  if (document.referrer && !document.referrer.includes(window.location.hostname)) {
    attribution.referrer = document.referrer;
  }

  sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(attribution));
}

/**
 * Retrieve stored attribution data for the current session.
 */
export function getAttribution(): AttributionData {
  if (typeof window === 'undefined') return {};

  try {
    const stored = sessionStorage.getItem(ATTRIBUTION_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

/**
 * Track a conversion event via Vercel Analytics custom events.
 * Also logs to console in development for debugging.
 */
export function trackConversion(
  eventName: string,
  properties?: Record<string, string | number>
): void {
  if (typeof window === 'undefined') return;

  const attribution = getAttribution();
  const eventData = {
    ...properties,
    ...(attribution.utm_source && { utm_source: attribution.utm_source }),
    ...(attribution.utm_medium && { utm_medium: attribution.utm_medium }),
    ...(attribution.utm_campaign && { utm_campaign: attribution.utm_campaign }),
    ...(attribution.referrer && { referrer: attribution.referrer }),
    ...(attribution.landing_page && { landing_page: attribution.landing_page }),
  };

  // Vercel Analytics custom events (va.track)
  const win = window as unknown as { va?: (event: string, name: string, data?: Record<string, string | number>) => void };
  if (typeof win.va === 'function') {
    win.va('event', eventName, eventData);
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(`[analytics] ${eventName}`, eventData);
  }
}

// Pre-defined conversion events
export const ConversionEvents = {
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
  PARTNER_INQUIRY_SUBMIT: 'partner_inquiry_submit',
  BOOKING_SUBMIT: 'booking_submit',
  BOOKING_CONFIRMED: 'booking_confirmed',
  PHONE_CLICK: 'phone_click',
  EMAIL_CLICK: 'email_click',
} as const;
