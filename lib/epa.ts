/**
 * EPA Compliance Workflow — Water & Ash Burials
 *
 * EPA requires a burial-at-sea report (EPA Form 1) to be filed within 30 days
 * of each sea burial ceremony. This module provides:
 *
 * 1. Task creation when a ceremony is marked complete
 * 2. 30-day reminder email if the report hasn't been filed
 * 3. Status tracking for compliance auditing
 *
 * Flow:
 *   Service Complete → createEpaTask() → stores deadline
 *   Cron (daily) → checkEpaReminders() → sends reminder if approaching deadline
 *   Admin marks filed → markEpaReportFiled()
 */

import { Resend } from 'resend';
import { emailWrapper, BRAND } from '@/lib/emails/shared';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

export interface EpaTask {
  ceremonyId: string;
  ceremonyDate: string;
  vesselName: string;
  contactName: string;
  gpsCoordinates?: string;
  /** ISO date: 30 days after ceremony */
  deadline: string;
  /** Whether the EPA report has been filed */
  filed: boolean;
  filedDate?: string;
  /** Whether a reminder has been sent */
  reminderSent: boolean;
  createdAt: string;
}

/**
 * Calculate the EPA filing deadline (30 days after ceremony).
 */
export function calculateDeadline(ceremonyDate: string): string {
  const date = new Date(ceremonyDate);
  date.setDate(date.getDate() + 30);
  return date.toISOString().split('T')[0];
}

/**
 * Calculate days remaining until the EPA deadline.
 * Returns negative if past deadline.
 */
export function daysUntilDeadline(deadline: string): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const deadlineDate = new Date(deadline);
  deadlineDate.setHours(0, 0, 0, 0);
  return Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

/**
 * Create an EPA compliance task after a ceremony is completed.
 * Returns the task data to be stored (caller handles persistence).
 */
export function createEpaTask(params: {
  ceremonyId: string;
  ceremonyDate: string;
  vesselName: string;
  contactName: string;
  gpsCoordinates?: string;
}): EpaTask {
  return {
    ...params,
    deadline: calculateDeadline(params.ceremonyDate),
    filed: false,
    reminderSent: false,
    createdAt: new Date().toISOString(),
  };
}

/**
 * Generate the EPA reminder email HTML.
 */
export function epaReminderEmail(task: EpaTask): { subject: string; html: string } {
  const daysLeft = daysUntilDeadline(task.deadline);
  const urgency = daysLeft <= 7 ? 'URGENT' : daysLeft <= 14 ? 'Reminder' : 'Upcoming';

  const { colors } = BRAND;

  const content = `
    <div style="margin-bottom:24px;">
      <span style="display:inline-block;background-color:${daysLeft <= 7 ? '#e53e3e' : colors.gold};color:${colors.white};padding:4px 12px;border-radius:4px;font-size:12px;letter-spacing:1px;text-transform:uppercase;font-weight:600;">
        ${urgency}: EPA Report Due
      </span>
    </div>

    <p style="color:${colors.textDark};font-size:16px;line-height:1.6;margin:0 0 16px;">
      The EPA burial-at-sea report for the following ceremony is due in <strong>${daysLeft} day${daysLeft === 1 ? '' : 's'}</strong>.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${colors.lightGray};border-radius:8px;margin:24px 0;">
      <tr><td style="padding:20px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding:8px 0;color:${colors.textMuted};font-size:14px;width:140px;">Ceremony Date</td>
            <td style="padding:8px 0;color:${colors.textDark};font-size:14px;font-weight:600;">${task.ceremonyDate}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:${colors.textMuted};font-size:14px;">Vessel</td>
            <td style="padding:8px 0;color:${colors.textDark};font-size:14px;font-weight:600;">${task.vesselName}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:${colors.textMuted};font-size:14px;">Family</td>
            <td style="padding:8px 0;color:${colors.textDark};font-size:14px;font-weight:600;">${task.contactName}</td>
          </tr>
          ${task.gpsCoordinates ? `
          <tr>
            <td style="padding:8px 0;color:${colors.textMuted};font-size:14px;">GPS Coordinates</td>
            <td style="padding:8px 0;color:${colors.textDark};font-size:14px;font-weight:600;">${task.gpsCoordinates}</td>
          </tr>` : ''}
          <tr>
            <td style="padding:8px 0;color:${colors.textMuted};font-size:14px;">Filing Deadline</td>
            <td style="padding:8px 0;color:${daysLeft <= 7 ? '#e53e3e' : colors.textDark};font-size:14px;font-weight:600;">${task.deadline}</td>
          </tr>
        </table>
      </td></tr>
    </table>

    <p style="color:${colors.textDark};font-size:14px;line-height:1.6;margin:16px 0;">
      The EPA requires Form 1 (Burial at Sea Report) to be filed within 30 days of the ceremony.
      File online at <a href="https://www.epa.gov/ocean-dumping/burial-sea" style="color:${colors.gold};text-decoration:underline;">epa.gov/ocean-dumping/burial-sea</a>.
    </p>
  `;

  return {
    subject: `${urgency}: EPA Report Due ${task.deadline} — ${task.contactName} (${task.vesselName})`,
    html: emailWrapper(content, `EPA burial-at-sea report due in ${daysLeft} days for ${task.contactName}.`),
  };
}

/**
 * Send the EPA reminder email to the admin team.
 */
export async function sendEpaReminder(task: EpaTask): Promise<boolean> {
  const { subject, html } = epaReminderEmail(task);

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
    to: process.env.RESEND_TO_EMAIL || 'info@waterandashburials.org',
    subject,
    html,
  });

  if (error) {
    console.error('[epa] Failed to send reminder:', error);
    return false;
  }

  return true;
}
