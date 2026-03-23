/**
 * S8: Review Request Email (3-4 weeks after ceremony)
 *
 * Gentle request for a review, positioned as helping other families.
 */

import { emailWrapper, BRAND, type CeremonyDetails, formatDate } from './shared';

export function reviewRequestEmail(details: CeremonyDetails): { subject: string; html: string } {
  const { colors } = BRAND;
  const formattedDate = formatDate(details.ceremonyDate);

  const content = `
    <h2 style="margin:0 0 24px;color:${colors.navy};font-size:22px;font-weight:400;">Your Words Can Help Another Family</h2>
    <p style="margin:0 0 20px;color:${colors.textDark};font-size:15px;line-height:1.7;">Dear ${details.contactName},</p>
    <p style="margin:0 0 20px;color:${colors.textDark};font-size:15px;line-height:1.7;">We were honored to serve your family during the ceremony on ${formattedDate}. When families are considering a burial at sea, hearing from someone who has been through the experience is one of the most meaningful things we can offer them.</p>
    <p style="margin:0 0 20px;color:${colors.textDark};font-size:15px;line-height:1.7;">If you feel comfortable, would you share a few words about your experience? It does not need to be long&mdash;even a sentence or two can make a real difference for a family going through a difficult time.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center" style="padding:16px 0;">
        <a href="https://g.page/r/waterandashburials/review" style="display:inline-block;background-color:${colors.gold};color:${colors.navy};padding:14px 32px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600;letter-spacing:1px;">Leave a Google Review</a>
      </td></tr>
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fffbeb;border-radius:8px;margin:24px 0;border-left:4px solid ${colors.gold};">
      <tr><td style="padding:16px 20px;">
        <p style="margin:0;color:${colors.textDark};font-size:13px;line-height:1.6;">Not comfortable with a public review? You can always reply to this email with your thoughts. We appreciate any feedback, public or private.</p>
      </td></tr>
    </table>
    <p style="margin:24px 0 0;color:${colors.textMuted};font-size:13px;line-height:1.6;text-align:center;">Thank you for trusting us with something so meaningful.<br />With gratitude,<br />The Water &amp; Ash Team</p>`;

  return {
    subject: `Your experience can help another family, ${details.contactName}`,
    html: emailWrapper(content, `Would you share a few words about your ceremony experience? Your words can help other families.`),
  };
}
