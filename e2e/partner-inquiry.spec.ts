import { test, expect } from '@playwright/test';

test.describe('Partner Inquiry — B2B Lead Capture Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/mortuaries');
  });

  test('renders the partner inquiry form with all required fields', async ({ page }) => {
    await expect(page.locator('#contactName').or(page.locator('[name="contactName"]'))).toBeVisible({ timeout: 5000 });
    await expect(page.locator('#businessName').or(page.locator('[name="businessName"]'))).toBeVisible();
    await expect(page.locator('#email').or(page.locator('[name="email"]'))).toBeVisible();
    await expect(page.locator('#phone').or(page.locator('[name="phone"]'))).toBeVisible();
    await expect(page.locator('#businessType').or(page.locator('[name="businessType"]'))).toBeVisible();
    await expect(page.locator('#referralVolume').or(page.locator('[name="referralVolume"]'))).toBeVisible();
  });

  test('shows validation errors when submitting empty form', async ({ page }) => {
    const submitBtn = page.getByRole('button', { name: /submit|send|partner/i });
    await submitBtn.click();

    await expect(page.getByRole('alert').first()).toBeVisible({ timeout: 5000 });
  });

  test('successfully submits partner inquiry and redirects', async ({ page }) => {
    await page.route('/api/partner-inquiry', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Inquiry sent successfully' }),
      });
    });

    await page.locator('#contactName').or(page.locator('[name="contactName"]')).fill('Dr. James Wilson');
    await page.locator('#businessName').or(page.locator('[name="businessName"]')).fill('Wilson Memorial Services');
    await page.locator('#email').or(page.locator('[name="email"]')).fill('james@wilsonmemorial.com');
    await page.locator('#phone').or(page.locator('[name="phone"]')).fill('858-555-0100');

    const businessTypeSelect = page.locator('#businessType').or(page.locator('[name="businessType"]'));
    await businessTypeSelect.selectOption('mortuary');

    const referralSelect = page.locator('#referralVolume').or(page.locator('[name="referralVolume"]'));
    await referralSelect.selectOption('6-15');

    await page.locator('#message').or(page.locator('[name="message"]')).fill('Interested in partnering for burial at sea services.');

    const submitBtn = page.getByRole('button', { name: /submit|send|partner/i });
    await submitBtn.click();

    await page.waitForURL(/\/thank-you\??.*type=partner/i, { timeout: 10000 });
    await expect(page.locator('h1')).toContainText(/thank you/i);
  });

  test('shows error when API fails', async ({ page }) => {
    await page.route('/api/partner-inquiry', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Server error' }),
      });
    });

    await page.locator('#contactName').or(page.locator('[name="contactName"]')).fill('Dr. James Wilson');
    await page.locator('#businessName').or(page.locator('[name="businessName"]')).fill('Wilson Memorial');
    await page.locator('#email').or(page.locator('[name="email"]')).fill('james@example.com');
    await page.locator('#phone').or(page.locator('[name="phone"]')).fill('858-555-0100');
    const businessTypeSelect = page.locator('#businessType').or(page.locator('[name="businessType"]'));
    await businessTypeSelect.selectOption('mortuary');
    const referralSelect = page.locator('#referralVolume').or(page.locator('[name="referralVolume"]'));
    await referralSelect.selectOption('1-5');

    const submitBtn = page.getByRole('button', { name: /submit|send|partner/i });
    await submitBtn.click();

    await expect(page.getByRole('alert')).toBeVisible({ timeout: 10000 });
  });

  test('business type dropdown contains expected options', async ({ page }) => {
    const select = page.locator('#businessType').or(page.locator('[name="businessType"]'));
    await expect(select.locator('option[value="mortuary"]')).toBeAttached();
    await expect(select.locator('option[value="funeral-home"]')).toBeAttached();
    await expect(select.locator('option[value="crematory"]')).toBeAttached();
    await expect(select.locator('option[value="hospice"]')).toBeAttached();
    await expect(select.locator('option[value="estate-planner"]')).toBeAttached();
    await expect(select.locator('option[value="other"]')).toBeAttached();
  });
});
