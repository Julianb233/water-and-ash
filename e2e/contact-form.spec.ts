import { test, expect } from '@playwright/test';

test.describe('Contact Form — Lead Capture Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('renders the contact form with all required fields', async ({ page }) => {
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#phone')).toBeVisible();
    await expect(page.locator('#service')).toBeVisible();
    await expect(page.locator('#message')).toBeVisible();
    await expect(page.getByRole('button', { name: /send message/i })).toBeVisible();
  });

  test('shows validation errors when submitting empty form', async ({ page }) => {
    await page.getByRole('button', { name: /send message/i }).click();

    // Wait for client-side validation errors to appear
    await expect(page.getByRole('alert').first()).toBeVisible({ timeout: 5000 });
  });

  test('shows validation error for invalid email', async ({ page }) => {
    await page.locator('#name').fill('Jane Smith');
    await page.locator('#email').fill('not-an-email');
    await page.locator('#phone').fill('619-928-9160');
    await page.locator('#service').selectOption('osprey');

    await page.getByRole('button', { name: /send message/i }).click();

    await expect(page.getByText(/valid email/i)).toBeVisible({ timeout: 5000 });
  });

  test('successfully submits the contact form and redirects to thank-you', async ({ page }) => {
    // Intercept the API call and mock a success response
    await page.route('/api/contact', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Message sent successfully' }),
      });
    });

    await page.locator('#name').fill('Jane Smith');
    await page.locator('#email').fill('jane@example.com');
    await page.locator('#phone').fill('619-928-9160');
    await page.locator('#service').selectOption('osprey');
    await page.locator('#message').fill('I would like to learn more about your services.');

    await page.getByRole('button', { name: /send message/i }).click();

    // Should redirect to /thank-you
    await page.waitForURL('/thank-you', { timeout: 10000 });
    await expect(page.locator('h1')).toContainText(/thank you/i);
  });

  test('shows error message when API returns failure', async ({ page }) => {
    await page.route('/api/contact', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Failed to send email. Please try again or call us directly.' }),
      });
    });

    await page.locator('#name').fill('Jane Smith');
    await page.locator('#email').fill('jane@example.com');
    await page.locator('#phone').fill('619-928-9160');
    await page.locator('#service').selectOption('osprey');

    await page.getByRole('button', { name: /send message/i }).click();

    // Should show error alert on the page
    await expect(page.getByRole('alert')).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('alert')).toContainText(/failed/i);
  });

  test('shows loading state during submission', async ({ page }) => {
    // Delay the API response to observe loading state
    await page.route('/api/contact', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Message sent successfully' }),
      });
    });

    await page.locator('#name').fill('Jane Smith');
    await page.locator('#email').fill('jane@example.com');
    await page.locator('#phone').fill('619-928-9160');
    await page.locator('#service').selectOption('osprey');

    await page.getByRole('button', { name: /send message/i }).click();

    // Button should show "Sending..." loading state
    await expect(page.getByText(/sending/i)).toBeVisible({ timeout: 3000 });

    // Form inputs should be disabled
    await expect(page.locator('#name')).toBeDisabled();
  });

  test('service dropdown contains all expected options', async ({ page }) => {
    const select = page.locator('#service');
    const options = select.locator('option');

    // 5 services + 1 placeholder
    await expect(options).toHaveCount(6);

    await expect(select.locator('option[value="osprey"]')).toHaveText('The Osprey');
    await expect(select.locator('option[value="white-nights"]')).toHaveText('White Nights');
    await expect(select.locator('option[value="relentless"]')).toHaveText('Relentless');
    await expect(select.locator('option[value="at-home"]')).toHaveText('At-Home Memorial');
    await expect(select.locator('option[value="general"]')).toHaveText('General Inquiry');
  });
});
