/**
 * AUTO-05: Post-Service Follow-Up Email (2-3 weeks after ceremony)
 *
 * Heart-centered check-in with grief support resources.
 */

import { emailWrapper, BRAND, type CeremonyDetails, formatDate } from './shared';

export function postServiceFollowUpEmail(details: CeremonyDetails): { subject: string; html: string } {
  const { colors } = BRAND;
  const formattedDate = formatDate(details.ceremonyDate);

  const content = `
    <h2 style="margin:0 0 24px;color:${colors.navy};font-size:22px;font-weight:400;">Thinking of You</h2>
    <p style="margin:0 0 20px;color:${colors.textDark};font-size:15px;line-height:1.7;">Dear ${details.contactName},</p>
    <p style="margin:0 0 20px;color:${colors.textDark};font-size:15px;line-height:1.7;">It has been a few weeks since your ceremony on ${formattedDate}, and we wanted to check in. We hope the experience brought you and your loved ones a sense of peace and closure.</p>
    <p style="margin:0 0 20px;color:${colors.textDark};font-size:15px;line-height:1.7;">Grief is a journey, and there is no timeline for healing. We want you to know that we are here if you ever need anything&mdash;whether it is a question about the ceremony, a copy of the GPS coordinates, or simply someone who understands.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${colors.navy};border-radius:8px;margin:24px 0;">
      <tr><td style="padding:28px;">
        <h3 style="margin:0 0 16px;color:${colors.gold};font-size:14px;letter-spacing:2px;text-transform:uppercase;">Grief Support Resources</h3>
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
          <tr><td style="padding:8px 0;color:${colors.white};font-size:14px;line-height:1.6;">&bull; &nbsp; <a href="https://www.grief.com" style="color:${colors.gold};text-decoration:underline;">Grief.com</a> &mdash; Resources from Dr. David Kessler</td></tr>
          <tr><td style="padding:8px 0;color:${colors.white};font-size:14px;line-height:1.6;">&bull; &nbsp; <a href="https://www.griefshare.org" style="color:${colors.gold};text-decoration:underline;">GriefShare</a> &mdash; Local support groups</td></tr>
          <tr><td style="padding:8px 0;color:${colors.white};font-size:14px;line-height:1.6;">&bull; &nbsp; National Grief Hotline: <a href="tel:18883956471" style="color:${colors.gold};text-decoration:none;">1-888-395-6471</a></td></tr>
        </table>
      </td></tr>
    </table>
    <p style="margin:24px 0 16px;color:${colors.textDark};font-size:15px;line-height:1.7;">If you would like to share your experience or have any feedback, we would be honored to hear from you. Your words may help other families who are considering a burial at sea.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center" style="padding:8px 0;">
        <a href="mailto:${BRAND.email}" style="display:inline-block;background-color:${colors.gold};color:${colors.navy};padding:14px 32px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600;letter-spacing:1px;">Share Your Experience</a>
      </td></tr>
    </table>
    <p style="margin:24px 0 0;color:${colors.textMuted};font-size:13px;line-height:1.6;text-align:center;">With warmth and care,<br />The Water &amp; Ash Team</p>`;

  return {
    subject: `Thinking of You, ${details.contactName}`,
    html: emailWrapper(content, `It has been a few weeks since your ceremony. We are thinking of you and wanted to share some resources.`),
  };
}
