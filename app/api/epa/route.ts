/**
 * EPA Compliance API — /api/epa
 *
 * POST: Create a new EPA compliance task when a ceremony is completed
 * PATCH: Mark an EPA report as filed
 *
 * These endpoints are for internal use by the admin dashboard or
 * automation workflows (e.g., GHL webhook → service complete → create EPA task).
 */

import { NextRequest, NextResponse } from 'next/server';
import { createEpaTask, type EpaTask } from '@/lib/epa';

/**
 * Create a new EPA compliance task.
 *
 * Body: { ceremonyId, ceremonyDate, vesselName, contactName, gpsCoordinates? }
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();

    const { ceremonyId, ceremonyDate, vesselName, contactName, gpsCoordinates } = body;

    if (!ceremonyId || !ceremonyDate || !vesselName || !contactName) {
      return NextResponse.json(
        { error: 'Missing required fields: ceremonyId, ceremonyDate, vesselName, contactName' },
        { status: 400 }
      );
    }

    const task: EpaTask = createEpaTask({
      ceremonyId,
      ceremonyDate,
      vesselName,
      contactName,
      gpsCoordinates,
    });

    // TODO: Persist to database
    // await db.insert(epaTasks).values(task);

    console.log(`[epa] Created compliance task for ceremony ${ceremonyId}, deadline: ${task.deadline}`);

    return NextResponse.json({
      ok: true,
      task: {
        ceremonyId: task.ceremonyId,
        deadline: task.deadline,
        daysToFile: 30,
      },
    });
  } catch (error) {
    console.error('[epa] Error creating task:', error);
    return NextResponse.json(
      { error: 'Failed to create EPA compliance task' },
      { status: 500 }
    );
  }
}

/**
 * Mark an EPA report as filed.
 *
 * Body: { ceremonyId }
 */
export async function PATCH(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { ceremonyId } = body;

    if (!ceremonyId) {
      return NextResponse.json(
        { error: 'Missing required field: ceremonyId' },
        { status: 400 }
      );
    }

    // TODO: Update in database
    // await db.update(epaTasks).set({ filed: true, filedDate: new Date().toISOString() }).where(eq(epaTasks.ceremonyId, ceremonyId));

    console.log(`[epa] Marked EPA report as filed for ceremony ${ceremonyId}`);

    return NextResponse.json({
      ok: true,
      ceremonyId,
      filed: true,
      filedDate: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[epa] Error marking report filed:', error);
    return NextResponse.json(
      { error: 'Failed to mark EPA report as filed' },
      { status: 500 }
    );
  }
}
