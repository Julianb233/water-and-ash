import { z } from 'zod';

/**
 * Optional UTM parameter fields, shared across all form validation schemas.
 * These are captured client-side and included in form submissions for
 * lead source attribution in CRM and notification emails.
 */
export const utmSchema = z.object({
  utm_source: z.string().max(200).optional(),
  utm_medium: z.string().max(200).optional(),
  utm_campaign: z.string().max(200).optional(),
  utm_term: z.string().max(200).optional(),
  utm_content: z.string().max(200).optional(),
});

export type UtmData = z.infer<typeof utmSchema>;

/**
 * Format UTM params as an HTML snippet for inclusion in notification emails.
 */
export function formatUtmHtml(data: UtmData): string {
  const entries = Object.entries(data).filter(
    ([key, val]) => key.startsWith('utm_') && val
  );

  if (entries.length === 0) return '';

  const rows = entries
    .map(([key, val]) => `<li><strong>${key}:</strong> ${val}</li>`)
    .join('\n');

  return `
    <hr />
    <h3>Lead Source Attribution</h3>
    <ul>${rows}</ul>
  `;
}
