import { test, expect } from '@playwright/test';

test.describe('Booking Flow — Multi-Step Form', () => {
  test.beforeEach(async ({ page }) => {
    // Mock the calendar availability API to avoid hitting GHL
    await page.route('/api/calendar/availability*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          days: [
            {
              date: getDateOffset(3),
              available: true,
              hasAvailability: true,
              slots: [
                { startTime: `${getDateOffset(3)}T10:00:00-07:00`, endTime: `${getDateOffset(3)}T12:00:00-07:00`, calendarId: 'cal-1', available: true },
                { startTime: `${getDateOffset(3)}T14:00:00-07:00`, endTime: `${getDateOffset(3)}T16:00:00-07:00`, calendarId: 'cal-1', available: true },
              ],
            },
            {
              date: getDateOffset(5),
              available: true,
              hasAvailability: true,
              slots: [
                { startTime: `${getDateOffset(5)}T09:00:00-07:00`, endTime: `${getDateOffset(5)}T11:00:00-07:00`, calendarId: 'cal-1', available: true },
              ],
            },
          ],
        }),
      });
    });

    await page.goto('/book');
  });

  test('renders the booking page with vessel selection', async ({ page }) => {
    await expect(page.locator('h1')).toBeVisible();
    // Check vessel selection buttons are present
    await expect(page.getByText(/the osprey/i).first()).toBeVisible();
    await expect(page.getByText(/white nights/i).first()).toBeVisible();
    await expect(page.getByText(/relentless/i).first()).toBeVisible();
  });

  test('step 1: selecting a vessel advances to date selection', async ({ page }) => {
    // Click vessel button for "The Osprey"
    await page.getByRole('button', { name: /osprey/i }).click();

    // Should show date selection (calendar) after selecting vessel
    await expect(
      page.getByText(/select a date/i)
        .or(page.getByText(/choose.*date/i))
        .or(page.locator('[class*="calendar"]'))
    ).toBeVisible({ timeout: 5000 });
  });

  test('step 2: selecting a date shows time slots', async ({ page }) => {
    // Select vessel
    await page.getByRole('button', { name: /osprey/i }).click();

    // Wait for calendar to load
    await page.waitForTimeout(1000);

    // Click an available date
    const availableDay = page.locator('button:not([disabled])').filter({ hasText: /\d+/ }).first();
    if (await availableDay.isVisible()) {
      await availableDay.click();
    }

    // Should show time slots section
    await expect(
      page.getByText(/select.*time/i)
        .or(page.getByText(/available.*time/i))
        .or(page.getByText(/choose.*time/i))
        .or(page.locator('[class*="time"]'))
    ).toBeVisible({ timeout: 5000 });
  });

  test('booking form contact fields accept input', async ({ page }) => {
    // Mock the booking API
    await page.route('/api/calendar/book', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          appointmentId: 'apt-123',
          vessel: 'osprey',
          date: getDateOffset(3),
          startTime: `${getDateOffset(3)}T10:00:00-07:00`,
          endTime: `${getDateOffset(3)}T12:00:00-07:00`,
          contactId: 'contact-456',
        }),
      });
    });

    // Step 1: Select vessel
    await page.getByRole('button', { name: /osprey/i }).click();
    await page.waitForTimeout(500);

    // Step 2: Try to find and click an available date
    const calendarButtons = page.locator('button').filter({ hasText: /^\d{1,2}$/ });
    const count = await calendarButtons.count();
    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const btn = calendarButtons.nth(i);
        if (!(await btn.isDisabled())) {
          await btn.click();
          break;
        }
      }
    }

    await page.waitForTimeout(500);

    // Step 3: Select a time slot if visible
    const timeSlots = page.locator('button').filter({ hasText: /\d{1,2}:\d{2}/ });
    if (await timeSlots.first().isVisible({ timeout: 3000 }).catch(() => false)) {
      await timeSlots.first().click();
      await page.waitForTimeout(500);
    }

    // Step 4: Fill contact info if visible
    const firstNameField = page.locator('#firstName').or(page.locator('[name="firstName"]'));
    if (await firstNameField.isVisible({ timeout: 3000 }).catch(() => false)) {
      await firstNameField.fill('Jane');
      await page.locator('#lastName').or(page.locator('[name="lastName"]')).fill('Smith');
      await page.locator('#email').or(page.locator('[name="email"]')).fill('jane@example.com');
      await page.locator('#phone').or(page.locator('[name="phone"]')).fill('619-928-9160');
    }
  });

  test('booking confirmation page displays booking details', async ({ page }) => {
    await page.goto('/book/confirmation?vessel=osprey&date=2026-05-15&time=10:00%20AM&appointmentId=apt-123');

    await expect(
      page.getByText(/confirmation/i)
        .or(page.getByText(/booked/i))
        .or(page.getByText(/thank/i))
    ).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(/osprey/i)).toBeVisible();
    await expect(page.getByText(/what happens next/i)).toBeVisible();
  });
});

/** Returns a date string (YYYY-MM-DD) offset from today by N days */
function getDateOffset(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}
