/**
 * Drip Sequence Scheduler
 *
 * Uses Resend's scheduledAt to enqueue future emails at submission time.
 * No cron jobs or external schedulers needed.
 *
 * AUTO-01: B2C post-inquiry — 4 emails over 7 days
 * AUTO-02: B2B partner nurture — 4 emails over 10 days
 */

import { Resend } from 'resend';
import {
  b2cEmail1Acknowledgment,
  b2cEmail2ServiceDetails,
  b2cEmail3SocialProof,
  b2cEmail4GentleFollowup,
  type B2CLeadDetails,
} from './b2c-sequence';
import {
  b2bEmail1Acknowledgment,
  b2bEmail2Benefits,
  b2bEmail3CoMarketing,
  b2bEmail4ScheduleCall,
  type B2BLeadDetails,
} from './b2b-sequence';

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

interface DripEmail {
  delayDays: number;
  generate: () => { subject: string; html: string };
}

function scheduleDate(delayDays: number): string {
  const date = new Date();
  date.setDate(date.getDate() + delayDays);
  // Send at 10am UTC (roughly morning Pacific)
  date.setUTCHours(10, 0, 0, 0);
  return date.toISOString();
}

async function sendDripSequence(
  toEmail: string,
  emails: DripEmail[]
): Promise<{ scheduled: number; errors: string[] }> {
  const errors: string[] = [];
  let scheduled = 0;

  for (const email of emails) {
    const { subject, html } = email.generate();

    try {
      if (email.delayDays === 0) {
        // Send immediately
        const { error } = await resend.emails.send({
          from: FROM_EMAIL,
          to: toEmail,
          subject,
          html,
        });
        if (error) {
          errors.push(`Day ${email.delayDays}: ${error.message}`);
        } else {
          scheduled++;
        }
      } else {
        // Schedule for future delivery
        const { error } = await resend.emails.send({
          from: FROM_EMAIL,
          to: toEmail,
          subject,
          html,
          scheduledAt: scheduleDate(email.delayDays),
        });
        if (error) {
          errors.push(`Day ${email.delayDays}: ${error.message}`);
        } else {
          scheduled++;
        }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      errors.push(`Day ${email.delayDays}: ${message}`);
    }
  }

  return { scheduled, errors };
}

/**
 * AUTO-01: Enqueue B2C post-inquiry drip sequence.
 * Called after a family submits the contact form.
 *
 * Timeline: Day 0, Day 1, Day 3, Day 7
 */
export async function enqueueB2CDrip(
  lead: B2CLeadDetails
): Promise<{ scheduled: number; errors: string[] }> {
  const emails: DripEmail[] = [
    { delayDays: 0, generate: () => b2cEmail1Acknowledgment(lead) },
    { delayDays: 1, generate: () => b2cEmail2ServiceDetails(lead) },
    { delayDays: 3, generate: () => b2cEmail3SocialProof(lead) },
    { delayDays: 7, generate: () => b2cEmail4GentleFollowup(lead) },
  ];

  return sendDripSequence(lead.email, emails);
}

/**
 * AUTO-02: Enqueue B2B partner nurture drip sequence.
 * Called after a business submits the partnership inquiry form.
 *
 * Timeline: Day 0, Day 2, Day 5, Day 10
 */
export async function enqueueB2BDrip(
  lead: B2BLeadDetails
): Promise<{ scheduled: number; errors: string[] }> {
  const emails: DripEmail[] = [
    { delayDays: 0, generate: () => b2bEmail1Acknowledgment(lead) },
    { delayDays: 2, generate: () => b2bEmail2Benefits(lead) },
    { delayDays: 5, generate: () => b2bEmail3CoMarketing(lead) },
    { delayDays: 10, generate: () => b2bEmail4ScheduleCall(lead) },
  ];

  return sendDripSequence(lead.email, emails);
}
