/**
 * AUTO-03: Booking Confirmation Email
 *
 * Sent immediately after a booking is confirmed.
 * Contains ceremony details, what to expect, and preparation guidance.
 */

import { emailWrapper, BRAND, type CeremonyDetails, formatDate, formatTime } from './shared';

export function bookingConfirmationEmail(details: CeremonyDetails): { subject: string; html: string } {
  const { colors } = BRAND;
  const formattedDate = formatDate(details.ceremonyDate);
  const formattedTime = details.ceremonyTime ? formatTime(details.ceremonyTime) : 'To be confirmed';

  const content = `
    <h2 style="margin:0 0 8px;color:${colors.navy};font-size:22px;font-weight:400;">Your Ceremony is Confirmed</h2>
    <p style="margin:0 0 24px;color:${colors.textMuted};font-size:14px;">Confirmation #${details.confirmationId || 'WA-' + Date.now().toString(36).toUpperCase()}</p>
    <p style="margin:0 0 20px;color:${colors.textDark};font-size:15px;line-height:1.7;">Dear ${details.contactName},</p>
    <p style="margin:0 0 20px;color:${colors.textDark};font-size:15px;line-height:1.7;">Thank you for entrusting us with this meaningful journey. We are honored to help you create a beautiful, lasting tribute on the open water.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${colors.lightGray};border-radius:8px;margin:24px 0;border-left:4px solid ${colors.gold};">
      <tr><td style="padding:24px;">
        <h3 style="margin:0 0 16px;color:${colors.navy};font-size:16px;letter-spacing:1px;text-transform:uppercase;">Ceremony Details</h3>
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
          <tr><td style="padding:6px 0;color:${colors.textMuted};font-size:14px;width:120px;">Service</td><td style="padding:6px 0;color:${colors.textDark};font-size:14px;font-weight:600;">${details.serviceName}</td></tr>
          ${details.vesselName ? `<tr><td style="padding:6px 0;color:${colors.textMuted};font-size:14px;">Vessel</td><td style="padding:6px 0;color:${colors.textDark};font-size:14px;font-weight:600;">${details.vesselName}</td></tr>` : ''}
          <tr><td style="padding:6px 0;color:${colors.textMuted};font-size:14px;">Date</td><td style="padding:6px 0;color:${colors.textDark};font-size:14px;font-weight:600;">${formattedDate}</td></tr>
          <tr><td style="padding:6px 0;color:${colors.textMuted};font-size:14px;">Time</td><td style="padding:6px 0;color:${colors.textDark};font-size:14px;font-weight:600;">${formattedTime}</td></tr>
          ${details.location ? `<tr><td style="padding:6px 0;color:${colors.textMuted};font-size:14px;">Location</td><td style="padding:6px 0;color:${colors.textDark};font-size:14px;font-weight:600;">${details.location}</td></tr>` : ''}
          ${details.guestCount ? `<tr><td style="padding:6px 0;color:${colors.textMuted};font-size:14px;">Guests</td><td style="padding:6px 0;color:${colors.textDark};font-size:14px;font-weight:600;">Up to ${details.guestCount}</td></tr>` : ''}
          ${details.depositAmount ? `<tr><td style="padding:6px 0;color:${colors.textMuted};font-size:14px;">Deposit Paid</td><td style="padding:6px 0;color:${colors.textDark};font-size:14px;font-weight:600;">$${details.depositAmount}</td></tr>` : ''}
        </table>
      </td></tr>
    </table>
    <h3 style="margin:28px 0 12px;color:${colors.navy};font-size:16px;font-weight:600;">What to Expect</h3>
    <ul style="margin:0 0 24px;padding-left:20px;color:${colors.textDark};font-size:14px;line-height:2;">
      <li>Our team will contact you 48 hours before to confirm final details</li>
      <li>You will receive a reminder email 24 hours before your ceremony</li>
      <li>Plan to arrive at the marina 30 minutes before departure</li>
      <li>The ceremony typically lasts 2-3 hours, weather permitting</li>
      <li>Comfortable, weather-appropriate attire is recommended</li>
    </ul>
    <h3 style="margin:28px 0 12px;color:${colors.navy};font-size:16px;font-weight:600;">Preparing for the Day</h3>
    <p style="margin:0 0 16px;color:${colors.textDark};font-size:14px;line-height:1.7;">This is your time to honor someone who meant the world to you. There is no right or wrong way to do this. Some families bring flowers, photos, or written words to share. Others prefer the simple beauty of the moment itself.</p>
    <p style="margin:0 0 24px;color:${colors.textDark};font-size:14px;line-height:1.7;">We will be there to guide you every step of the way.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center" style="padding:16px 0;">
        <a href="mailto:${BRAND.email}" style="display:inline-block;background-color:${colors.navy};color:${colors.gold};padding:14px 32px;border-radius:6px;text-decoration:none;font-size:14px;letter-spacing:1px;">Questions? Reach Out Anytime</a>
      </td></tr>
    </table>
    <p style="margin:24px 0 0;color:${colors.textMuted};font-size:13px;line-height:1.6;text-align:center;">With care,<br />The Water &amp; Ash Team</p>`;

  return {
    subject: `Your Ceremony is Confirmed \u2014 ${formattedDate}`,
    html: emailWrapper(content, `Your ${details.serviceName} ceremony is confirmed for ${formattedDate}. Here is everything you need to know.`),
  };
}
