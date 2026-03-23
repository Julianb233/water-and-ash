/**
 * Shared email template utilities
 *
 * Premium design system: navy (#1a2744), gold (#c5a55a), white (#ffffff)
 * All emails use grief-sensitive, heart-centered language
 */

export const BRAND = {
  name: 'Water & Ash Burials',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://waterandashburials.org',
  email: 'info@waterandashburials.org',
  phone: '(702) 555-0199',
  colors: {
    navy: '#1a2744',
    gold: '#c5a55a',
    white: '#ffffff',
    lightGray: '#f8f9fa',
    textDark: '#2d3748',
    textMuted: '#718096',
  },
};

export function emailWrapper(content: string, preheader?: string): string {
  const { colors } = BRAND;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${BRAND.name}</title>
  ${preheader ? `<span style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">${preheader}</span>` : ''}
</head>
<body style="margin:0;padding:0;background-color:${colors.lightGray};font-family:'Georgia','Times New Roman',serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${colors.lightGray};">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:${colors.white};border-radius:8px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.07);">
          <tr>
            <td style="background-color:${colors.navy};padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:${colors.gold};font-size:28px;font-weight:400;letter-spacing:2px;font-family:'Georgia','Times New Roman',serif;">Water &amp; Ash</h1>
              <p style="margin:4px 0 0;color:${colors.white};font-size:12px;letter-spacing:3px;text-transform:uppercase;opacity:0.8;">Burials at Sea</p>
            </td>
          </tr>
          <tr>
            <td style="padding:40px;">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="background-color:${colors.lightGray};padding:24px 40px;text-align:center;border-top:1px solid #e2e8f0;">
              <p style="margin:0 0 8px;color:${colors.textMuted};font-size:13px;">${BRAND.name} &middot; Las Vegas, NV</p>
              <p style="margin:0 0 8px;color:${colors.textMuted};font-size:13px;">
                <a href="mailto:${BRAND.email}" style="color:${colors.gold};text-decoration:none;">${BRAND.email}</a>
                &nbsp;&middot;&nbsp;
                <a href="tel:${BRAND.phone.replace(/[^\d+]/g, '')}" style="color:${colors.gold};text-decoration:none;">${BRAND.phone}</a>
              </p>
              <p style="margin:0;color:${colors.textMuted};font-size:11px;">
                <a href="${BRAND.url}" style="color:${colors.textMuted};text-decoration:underline;">Visit our website</a>
                &nbsp;&middot;&nbsp;
                <a href="${BRAND.url}/privacy" style="color:${colors.textMuted};text-decoration:underline;">Privacy Policy</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export interface CeremonyDetails {
  contactName: string;
  contactEmail: string;
  serviceName: string;
  vesselName?: string;
  ceremonyDate: string;
  ceremonyTime?: string;
  location?: string;
  guestCount?: number;
  specialRequests?: string;
  depositAmount?: string;
  confirmationId?: string;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}
