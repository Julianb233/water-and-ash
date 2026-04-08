/**
 * UTM parameter tracking for lead source attribution.
 *
 * Captures utm_source, utm_medium, utm_campaign, utm_term, utm_content
 * from the URL on first visit and persists them in sessionStorage so they
 * survive navigation between pages. All form submissions include these
 * params for CRM sync and email attribution.
 */

export interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
] as const;

const STORAGE_KEY = 'wa_utm_params';

/**
 * Extract UTM params from a URL search string.
 */
export function parseUtmParams(search: string): UtmParams {
  const params = new URLSearchParams(search);
  const utm: UtmParams = {};

  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) {
      utm[key] = value;
    }
  }

  return utm;
}

/**
 * Save UTM params to sessionStorage (only if at least one param exists).
 */
export function storeUtmParams(utm: UtmParams): void {
  if (typeof window === 'undefined') return;
  if (Object.keys(utm).length === 0) return;

  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utm));
  } catch {
    // sessionStorage unavailable (private browsing, quota, etc.)
  }
}

/**
 * Retrieve stored UTM params from sessionStorage.
 */
export function getStoredUtmParams(): UtmParams {
  if (typeof window === 'undefined') return {};

  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as UtmParams;
    }
  } catch {
    // Parse error or storage unavailable
  }

  return {};
}

/**
 * Capture UTM params from the current URL. If the URL has UTM params,
 * they overwrite any previously stored values. Returns the current
 * UTM params (from URL or storage).
 */
export function captureUtmParams(): UtmParams {
  if (typeof window === 'undefined') return {};

  const fromUrl = parseUtmParams(window.location.search);

  if (Object.keys(fromUrl).length > 0) {
    storeUtmParams(fromUrl);
    return fromUrl;
  }

  return getStoredUtmParams();
}
