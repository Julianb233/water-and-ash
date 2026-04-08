/**
 * EPA Compliance Reminder Cron — /api/cron/epa-reminders
 *
 * Runs daily via Vercel Cron to check for EPA reports approaching their
 * 30-day filing deadline. Sends reminder emails at 14 days and 7 days
 * remaining.
 *
 * Protected by CRON_SECRET to prevent unauthorized access.
 *
 * Note: This endpoint is designed to work with an external data store
 * (e.g., Supabase) for EPA task persistence. Currently returns the
 * reminder check logic and can be extended with database queries.
 */

import { NextRequest, NextResponse } from 'next/server';
import { daysUntilDeadline, sendEpaReminder, type EpaTask } from '@/lib/epa';

export async function GET(req: NextRequest): Promise<NextResponse> {
  // Verify cron secret
  const authHeader = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // TODO: Replace with actual database query for pending EPA tasks
    // Example: const tasks = await db.select().from(epaTasks).where(eq(epaTasks.filed, false));
    const pendingTasks: EpaTask[] = [];

    const results = {
      checked: pendingTasks.length,
      reminders_sent: 0,
      errors: 0,
    };

    for (const task of pendingTasks) {
      const daysLeft = daysUntilDeadline(task.deadline);

      // Send reminders at 14 days, 7 days, 3 days, and 0 days (deadline day)
      const shouldRemind =
        !task.reminderSent && (daysLeft <= 14 || daysLeft <= 7 || daysLeft <= 3 || daysLeft <= 0);

      if (shouldRemind) {
        const sent = await sendEpaReminder(task);
        if (sent) {
          results.reminders_sent++;
          // TODO: Mark reminder as sent in database
          // await db.update(epaTasks).set({ reminderSent: true }).where(eq(epaTasks.id, task.ceremonyId));
        } else {
          results.errors++;
        }
      }
    }

    return NextResponse.json({
      ok: true,
      timestamp: new Date().toISOString(),
      ...results,
    });
  } catch (error) {
    console.error('[epa-cron] Error checking reminders:', error);
    return NextResponse.json(
      { error: 'Failed to check EPA reminders' },
      { status: 500 }
    );
  }
}
