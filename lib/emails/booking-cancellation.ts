/**
 * Booking Cancellation Email
 *
 * Sent when a booking is cancelled (by client or operator).
 * Compassionate tone, includes refund information and rebooking guidance.
 */

import { emailWrapper, BRAND, type CeremonyDetails, formatDate } from './shared';

interface CancellationDetails {
  contactName: string;
  contactEmail: string;
  serviceName: string;
  vesselName?: string;
  ceremonyDate: string;
  confirmationId?: string;
  refundAmount?: string;
  refundMethod?: string;
  cancelledBy?: 'client' | 'operator';
  reason?: string;
}

export function bookingCancellationEmail(details: CancellationDetails): { subject: string; html: string } {
  const { colors } = BRAND;
  const formattedDate = formatDate(details.ceremonyDate);
  const confirmationId = details.confirmationId || 'WA-' + Date.now().toString(36).toUpperCase();

  const isByOperator = details.cancelledBy === 'operator';

  const content = `
    <h2 style="margin:0 0 8px;color:${colors.navy};font-size:22px;font-weight:400;">
      ${isByOperator ? 'Important Update About Your Ceremony' : 'Ceremony Cancellation Confirmed'}
    </h2>
    <p style="margin:0 0 24px;color:${colors.textMuted};font-size:14px;">Reference #${confirmationId}</p>

    <p style="margin:0 0 20px;color:${colors.textDark};font-size:15px;line-height:1.7;">Dear ${details.contactName},</p>

    ${isByOperator ? `
    <p style="margin:0 0 20px;color:${colors.textDark};font-size:15px;line-height:1.7;">
      We regret to inform you that your ${details.serviceName} ceremony scheduled for ${formattedDate}${details.vesselName ? ` aboard the ${details.vesselName}` : ''} has been cancelled${details.reason ? ` due to ${details.reason}` : ''}.
    </p>
    <p style="margin:0 0 20px;color:${colors.textDark};font-size:15px;line-height:1.7;">
      We understand how meaningful this ceremony is to you and your family, and we sincerely apologize for any inconvenience. Our team will reach out shortly to help reschedule at a time that works for you.
    </p>
    ` : `
    <p style="margin:0 0 20px;color:${colors.textDark};font-size:15px;line-height:1.7;">
      We have received your cancellation request for the ${details.serviceName} ceremony scheduled for ${formattedDate}${details.vesselName ? ` aboard the ${details.vesselName}` : ''}.
    </p>
    <p style="margin:0 0 20px;color:${colors.textDark};font-size:15px;line-height:1.7;">
      We understand that circumstances change, and we respect your decision. If you ever wish to plan a ceremony in the future, we are here for you.
    </p>
    `}

    ${details.refundAmount ? `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${colors.lightGray};border-radius:8px;margin:24px 0;border-left:4px solid ${colors.gold};">
      <tr><td style="padding:24px;">
        <h3 style="margin:0 0 16px;color:${colors.navy};font-size:16px;letter-spacing:1px;text-transform:uppercase;">Refund Details</h3>
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="padding:6px 0;color:${colors.textMuted};font-size:14px;width:140px;">Refund Amount</td>
            <td style="padding:6px 0;color:${colors.textDark};font-size:14px;font-weight:600;">$${details.refundAmount}</td>
          </tr>
          ${details.refundMethod ? `
          <tr>
            <td style="padding:6px 0;color:${colors.textMuted};font-size:14px;">Refunded To</td>
            <td style="padding:6px 0;color:${colors.textDark};font-size:14px;font-weight:600;">${details.refundMethod}</td>
          </tr>` : ''}
          <tr>
            <td style="padding:6px 0;color:${colors.textMuted};font-size:14px;">Processing Time</td>
            <td style="padding:6px 0;color:${colors.textDark};font-size:14px;font-weight:600;">5-10 business days</td>
          </tr>
        </table>
      </td></tr>
    </table>
    ` : ''}

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${colors.lightGray};border-radius:8px;margin:24px 0;border-left:4px solid ${colors.gold};">
      <tr><td style="padding:24px;">
        <h3 style="margin:0 0 16px;color:${colors.navy};font-size:16px;letter-spacing:1px;text-transform:uppercase;">Original Booking</h3>
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
          <tr><td style="padding:6px 0;color:${colors.textMuted};font-size:14px;width:120px;">Service</td><td style="padding:6px 0;color:${colors.textDark};font-size:14px;">${details.serviceName}</td></tr>
          ${details.vesselName ? `<tr><td style="padding:6px 0;color:${colors.textMuted};font-size:14px;">Vessel</td><td style="padding:6px 0;color:${colors.textDark};font-size:14px;">${details.vesselName}</td></tr>` : ''}
          <tr><td style="padding:6px 0;color:${colors.textMuted};font-size:14px;">Date</td><td style="padding:6px 0;color:${colors.textDark};font-size:14px;">${formattedDate}</td></tr>
        </table>
      </td></tr>
    </table>

    <h3 style="margin:28px 0 12px;color:${colors.navy};font-size:16px;font-weight:600;">Ready to Reschedule?</h3>
    <p style="margin:0 0 24px;color:${colors.textDark};font-size:14px;line-height:1.7;">
      If you would like to book a new ceremony, we are happy to help you find a date that works. Simply reply to this email or call us directly.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td align="center" style="padding:16px 0;">
        <a href="mailto:${BRAND.email}" style="display:inline-block;background-color:${colors.navy};color:${colors.gold};padding:14px 32px;border-radius:6px;text-decoration:none;font-size:14px;letter-spacing:1px;">Contact Us to Reschedule</a>
      </td></tr>
    </table>

    <p style="margin:24px 0 0;color:${colors.textMuted};font-size:13px;line-height:1.6;text-align:center;">With care,<br />The Water &amp; Ash Team</p>`;

  return {
    subject: isByOperator
      ? `Important Update \u2014 Your ${details.serviceName} Ceremony`
      : `Cancellation Confirmed \u2014 ${details.serviceName} on ${formattedDate}`,
    html: emailWrapper(
      content,
      isByOperator
        ? `We have an important update about your ceremony on ${formattedDate}.`
        : `Your cancellation for ${formattedDate} has been processed.`
    ),
  };
}
