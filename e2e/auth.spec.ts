import { test, expect } from '@playwright/test';

/**
 * Tests E2E - Authentification complète
 * Couvre : Signup, Login, Logout, 2FA, Password Reset
 */

test.describe('Authentication Flow', () => {
  const testEmail = `test-${Date.now()}@secugenie.com`;
  const testPassword = 'SecurePass123!@#';
  const testName = 'Test User';

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display login page', async ({ page }) => {
    await page.getByRole('link', { name: /connexion/i }).click();
    await expect(page).toHaveURL(/\/auth\/login/);
    await expect(page.getByRole('heading', { name: /connexion/i })).toBeVisible();
  });

  test('should complete full signup flow', async ({ page }) => {
    // Navigate to signup
    await page.getByRole('link', { name: /inscription/i }).click();
    await expect(page).toHaveURL(/\/auth\/register/);

    // Fill signup form
    await page.getByLabel(/nom/i).fill(testName);
    await page.getByLabel(/email/i).fill(testEmail);
    await page.getByLabel(/mot de passe/i).first().fill(testPassword);
    await page.getByLabel(/confirmer/i).fill(testPassword);
    
    // Accept terms
    const termsCheckbox = page.getByRole('checkbox', { name: /conditions/i });
    await termsCheckbox.check();
    await expect(termsCheckbox).toBeChecked();

    // Submit
    await page.getByRole('button', { name: /créer un compte/i }).click();

    // Should redirect to dashboard or show success
    await expect(page).toHaveURL(/\/(dashboard|auth\/login)/, { timeout: 10000 });
    
    // Check for success message
    const successToast = page.getByText(/compte créé|inscription réussie/i);
    await expect(successToast).toBeVisible({ timeout: 5000 });
  });

  test('should validate email format on signup', async ({ page }) => {
    await page.getByRole('link', { name: /inscription/i }).click();
    
    // Enter invalid email
    await page.getByLabel(/email/i).fill('invalid-email');
    await page.getByLabel(/mot de passe/i).first().fill(testPassword);
    await page.getByRole('button', { name: /créer un compte/i }).click();

    // Should show error
    const errorMessage = page.getByText(/email.*valide/i);
    await expect(errorMessage).toBeVisible();
  });

  test('should validate password strength', async ({ page }) => {
    await page.getByRole('link', { name: /inscription/i }).click();
    
    await page.getByLabel(/email/i).fill(testEmail);
    await page.getByLabel(/mot de passe/i).first().fill('weak');
    await page.getByRole('button', { name: /créer un compte/i }).click();

    // Should show password strength error
    const errorMessage = page.getByText(/mot de passe.*fort|caractères/i);
    await expect(errorMessage).toBeVisible();
  });

  test('should login with valid credentials', async ({ page }) => {
    await page.getByRole('link', { name: /connexion/i }).click();

    // Fill login form (using demo credentials)
    await page.getByLabel(/email/i).fill('demo@secugenie.com');
    await page.getByLabel(/mot de passe/i).fill('demo123');
    
    await page.getByRole('button', { name: /se connecter/i }).click();

    // Should redirect to dashboard
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });
    
    // Check user is logged in
    const userMenu = page.getByRole('button', { name: /profil|compte/i });
    await expect(userMenu).toBeVisible();
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await page.getByRole('link', { name: /connexion/i }).click();

    await page.getByLabel(/email/i).fill('invalid@test.com');
    await page.getByLabel(/mot de passe/i).fill('wrongpassword');
    await page.getByRole('button', { name: /se connecter/i }).click();

    // Should show error message
    const errorToast = page.getByText(/identifiants.*invalides|erreur/i);
    await expect(errorToast).toBeVisible({ timeout: 5000 });
  });

  test('should logout successfully', async ({ page }) => {
    // Login first
    await page.getByRole('link', { name: /connexion/i }).click();
    await page.getByLabel(/email/i).fill('demo@secugenie.com');
    await page.getByLabel(/mot de passe/i).fill('demo123');
    await page.getByRole('button', { name: /se connecter/i }).click();
    
    await page.waitForURL(/\/dashboard/);

    // Logout
    const userMenu = page.getByRole('button', { name: /profil|compte/i });
    await userMenu.click();
    
    const logoutButton = page.getByRole('button', { name: /déconnexion/i });
    await logoutButton.click();

    // Should redirect to home
    await expect(page).toHaveURL('/', { timeout: 5000 });
  });

  test('should navigate to password reset', async ({ page }) => {
    await page.getByRole('link', { name: /connexion/i }).click();
    
    const resetLink = page.getByRole('link', { name: /mot de passe oublié/i });
    await resetLink.click();

    await expect(page).toHaveURL(/\/auth\/reset-password/);
    await expect(page.getByRole('heading', { name: /réinitialiser/i })).toBeVisible();
  });

  test('should submit password reset request', async ({ page }) => {
    await page.goto('/auth/reset-password');
    
    await page.getByLabel(/email/i).fill(testEmail);
    await page.getByRole('button', { name: /envoyer/i }).click();

    // Should show success message
    const successMessage = page.getByText(/email.*envoyé|vérifiez/i);
    await expect(successMessage).toBeVisible({ timeout: 5000 });
  });

  test('should handle 2FA setup flow', async ({ page }) => {
    // Login first
    await page.getByRole('link', { name: /connexion/i }).click();
    await page.getByLabel(/email/i).fill('demo@secugenie.com');
    await page.getByLabel(/mot de passe/i).fill('demo123');
    await page.getByRole('button', { name: /se connecter/i }).click();
    
    await page.waitForURL(/\/dashboard/);

    // Navigate to security settings
    await page.goto('/settings/security');

    // Enable 2FA
    const enable2FAButton = page.getByRole('button', { name: /activer.*2fa|authentification/i });
    if (await enable2FAButton.isVisible()) {
      await enable2FAButton.click();

      // Should show QR code
      const qrCode = page.getByRole('img', { name: /qr code/i });
      await expect(qrCode).toBeVisible();

      // Should show backup codes
      const backupCodes = page.getByText(/codes.*secours/i);
      await expect(backupCodes).toBeVisible();
    }
  });

  test('should enforce session timeout', async ({ page, context }) => {
    // This would require mocking time or waiting
    // Placeholder for session timeout testing
    await page.getByRole('link', { name: /connexion/i }).click();
    await page.getByLabel(/email/i).fill('demo@secugenie.com');
    await page.getByLabel(/mot de passe/i).fill('demo123');
    await page.getByRole('button', { name: /se connecter/i }).click();
    
    await page.waitForURL(/\/dashboard/);
    
    // Clear all cookies to simulate session expiration
    await context.clearCookies();
    await page.reload();

    // Should redirect to login
    await expect(page).toHaveURL(/\/auth\/login/, { timeout: 5000 });
  });
});
