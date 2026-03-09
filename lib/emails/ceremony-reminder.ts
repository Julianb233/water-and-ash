/**
 * AUTO-04: Pre-Ceremony Reminder Email (24 hours before)
 *
 * Gentle reminder with practical details and emotional support.
 */

import { emailWrapper, BRAND, type CeremonyDetails, formatDate, formatTime } from './shared';

export function ceremonyReminderEmail(details: CeremonyDetails): { subject: string; html: string } {
  const { colors } = BRAND;
  const formattedDate = formatDate(details.ceremonyDate);
  const formattedTime = details.ceremonyTime ? formatTime(details.ceremonyTime) : 'As scheduled';

  const content = `
    <h2 style="margin:0 0 24px;color:${colors.navy};font-size:22px;font-weight:400;">Tomorrow Is the Day</h2>
    <p style="margin:0 0 20px;color:${colors.textDark};font-size:15px;line-height:1.7;">Dear ${details.contactName},</p>
    <p style="margin:0 0 20px;color:${colors.textDark};font-size:15px;line-height:1.7;">We wanted to gently remind you that your ceremony is tomorrow. We have prepared everything to ensure this is a peaceful, meaningful experience for you and your loved ones.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${colors.navy};border-radius:8px;margin:24px 0;">
      <tr><td style="padding:28px;">
        <h3 style="margin:0 0 16px;color:${colors.gold};font-size:14px;letter-spacing:2px;text-transform:uppercase;">Tomorrow's Details</h3>
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
          <tr><td style="padding:8px 0;color:rgba(255,255,255,0.7);font-size:14px;width:100px;">Date</td><td style="padding:8px 0;color:${colors.white};font-size:14px;font-weight:600;">${formattedDate}</td></tr>
          <tr><td style="padding:8px 0;color:rgba(255,255,255,0.7);font-size:14px;">Time</td><td style="padding:8px 0;color:${colors.white};font-size:14px;font-weight:600;">${formattedTime}</td></tr>
          ${details.vesselName ? `<tr><td style="padding:8px 0;color:rgba(255,255,255,0.7);font-size:14px;">Vessel</td><td style="padding:8px 0;color:${colors.white};font-size:14px;font-weight:600;">${details.vesselName}</td></tr>` : ''}
          ${details.location ? `<tr><td style="padding:8px 0;color:rgba(255,255,255,0.7);font-size:14px;">Location</td><td style="padding:8px 0;color:${colors.white};font-size:14px;font-weight:600;">${details.location}</td></tr>` : ''}
          <tr><td style="padding:8px 0;color:rgba(255,255,255,0.7);font-size:14px;">Arrive by</td><td style="padding:8px 0;color:${colors.gold};font-size:14px;font-weight:600;">30 minutes before departure</td></tr>
        </table>
      </td></tr>
    </table>
    <h3 style="margin:28px 0 12px;color:${colors.navy};font-size:16px;font-weight:600;">Quick Checklist</h3>
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
      <tr><td style="padding:8px 0;color:${colors.textDark};font-size:14px;line-height:1.6;">&check; &nbsp; Comfortable, weather-appropriate clothing and shoes</td></tr>
      <tr><td style="padding:8px 0;color:${colors.textDark};font-size:14px;line-height:1.6;">&check; &nbsp; Sunscreen and sunglasses (we will be on open water)</td></tr>
      <tr><td style="padding:8px 0;color:${colors.textDark};font-size:14px;line-height:1.6;">&check; &nbsp; Any flowers, photos, or keepsakes you would like to bring</td></tr>
      <tr><td style="padding:8px 0;color:${colors.textDark};font-size:14px;line-height:1.6;">&check; &nbsp; Motion sickness medication if you are prone to seasickness</td></tr>
      <tr><td style="padding:8px 0;color:${colors.textDark};font-size:14px;line-height:1.6;">&check; &nbsp; Water and any personal comfort items</td></tr>
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#fffbeb;border-radius:8px;margin:24px 0;border-left:4px solid ${colors.gold};">
      <tr><td style="padding:16px 20px;">
        <p style="margin:0;color:${colors.textDark};font-size:13px;line-height:1.6;"><strong>Weather Note:</strong> If conditions become unsafe for the voyage, we will contact you to reschedule at no additional cost. Your safety and comfort come first.</p>
      </td></tr>
    </table>
    <p style="margin:24px 0 16px;color:${colors.textDark};font-size:15px;line-height:1.7;">If you have any last-minute questions or need to reach us, please do not hesitate to call or email. We are here for you.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center" style="padding:8px 0;">
        <a href="tel:${BRAND.phone.replace(/[^\d+]/g, '')}" style="display:inline-block;background-color:${colors.gold};color:${colors.navy};padding:14px 32px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:600;letter-spacing:1px;">Call Us: ${BRAND.phone}</a>
      </td></tr>
    </table>
    <p style="margin:24px 0 0;color:${colors.textMuted};font-size:13px;line-height:1.6;text-align:center;">We will see you tomorrow.<br />With warmth,<br />The Water &amp; Ash Team</p>`;

  return {
    subject: `Tomorrow: Your Ceremony Aboard ${details.vesselName || 'Our Vessel'}`,
    html: emailWrapper(content, `A gentle reminder about your ceremony tomorrow, ${formattedDate}. Here is what to bring and expect.`),
  };
}
