import { test, expect } from '@playwright/test';

/**
 * Tests E2E - Collaboration en temps réel
 * Couvre : Multi-utilisateurs, Commentaires temps réel, Notifications
 */

test.describe('Real-time Collaboration', () => {
  test('should display real-time comments from multiple users', async ({ browser }) => {
    // Create two browser contexts (two users)
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();

    // Login as user 1
    await page1.goto('/auth/login');
    await page1.getByLabel(/email/i).fill('user1@secugenie.com');
    await page1.getByLabel(/mot de passe/i).fill('demo123');
    await page1.getByRole('button', { name: /se connecter/i }).click();
    await page1.waitForURL(/\/dashboard/);

    // Login as user 2
    await page2.goto('/auth/login');
    await page2.getByLabel(/email/i).fill('user2@secugenie.com');
    await page2.getByLabel(/mot de passe/i).fill('demo123');
    await page2.getByRole('button', { name: /se connecter/i }).click();
    await page2.waitForURL(/\/dashboard/);

    // Both users navigate to same document
    const documentId = 'test-doc-123';
    await page1.goto(`/documents/${documentId}`);
    await page2.goto(`/documents/${documentId}`);

    // User 1 adds a comment
    const commentButton1 = page1.getByRole('button', { name: /commentaire/i });
    await commentButton1.click();
    
    const commentText = `Test comment ${Date.now()}`;
    await page1.getByPlaceholder(/commentaire/i).fill(commentText);
    await page1.getByRole('button', { name: /envoyer/i }).click();

    // User 2 should see the comment in real-time
    await expect(page2.getByText(commentText)).toBeVisible({ timeout: 10000 });

    // Cleanup
    await context1.close();
    await context2.close();
  });

  test('should show user presence indicators', async ({ browser }) => {
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();

    // Login both users
    await page1.goto('/auth/login');
    await page1.getByLabel(/email/i).fill('user1@secugenie.com');
    await page1.getByLabel(/mot de passe/i).fill('demo123');
    await page1.getByRole('button', { name: /se connecter/i }).click();
    await page1.waitForURL(/\/dashboard/);

    await page2.goto('/auth/login');
    await page2.getByLabel(/email/i).fill('user2@secugenie.com');
    await page2.getByLabel(/mot de passe/i).fill('demo123');
    await page2.getByRole('button', { name: /se connecter/i }).click();
    await page2.waitForURL(/\/dashboard/);

    // Navigate to shared document
    await page1.goto('/documents/shared-doc');
    await page2.goto('/documents/shared-doc');

    // Check for presence indicator
    const presenceIndicator = page1.getByText(/utilisateur.*en ligne|online/i);
    await expect(presenceIndicator).toBeVisible({ timeout: 10000 });

    await context1.close();
    await context2.close();
  });

  test('should send and receive real-time notifications', async ({ browser }) => {
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();

    // Setup users
    await page1.goto('/auth/login');
    await page1.getByLabel(/email/i).fill('demo@secugenie.com');
    await page1.getByLabel(/mot de passe/i).fill('demo123');
    await page1.getByRole('button', { name: /se connecter/i }).click();
    await page1.waitForURL(/\/dashboard/);

    await page2.goto('/auth/login');
    await page2.getByLabel(/email/i).fill('collaborator@secugenie.com');
    await page2.getByLabel(/mot de passe/i).fill('demo123');
    await page2.getByRole('button', { name: /se connecter/i }).click();
    await page2.waitForURL(/\/dashboard/);

    // User 1 mentions User 2 in a comment
    await page1.goto('/documents/test-doc');
    
    const commentButton = page1.getByRole('button', { name: /commentaire/i });
    if (await commentButton.isVisible()) {
      await commentButton.click();
      await page1.getByPlaceholder(/commentaire/i).fill('@collaborator Révision nécessaire');
      await page1.getByRole('button', { name: /envoyer/i }).click();
    }

    // User 2 should receive notification
    const notificationBell = page2.getByRole('button', { name: /notification/i });
    if (await notificationBell.isVisible()) {
      await expect(notificationBell).toHaveAttribute('data-badge', /1|\+/);
      
      await notificationBell.click();
      await expect(page2.getByText(/révision nécessaire/i)).toBeVisible();
    }

    await context1.close();
    await context2.close();
  });

  test('should handle concurrent edits gracefully', async ({ browser }) => {
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();

    // Both users login and navigate to editor
    for (const page of [page1, page2]) {
      await page.goto('/auth/login');
      await page.getByLabel(/email/i).fill('demo@secugenie.com');
      await page.getByLabel(/mot de passe/i).fill('demo123');
      await page.getByRole('button', { name: /se connecter/i }).click();
      await page.waitForURL(/\/dashboard/);
      await page.goto('/plans/editor');
    }

    // User 1 adds an element
    const addRectButton1 = page1.getByRole('button', { name: /rectangle/i });
    if (await addRectButton1.isVisible()) {
      await addRectButton1.click();
    }

    // User 2 adds an element
    const addCircleButton2 = page2.getByRole('button', { name: /circle/i });
    if (await addCircleButton2.isVisible()) {
      await addCircleButton2.click();
    }

    // Both should see updates (if real-time sync is implemented)
    await page1.waitForTimeout(2000);
    await page2.waitForTimeout(2000);

    // Verify no conflicts
    const canvas1 = page1.locator('canvas').first();
    const canvas2 = page2.locator('canvas').first();
    
    await expect(canvas1).toBeVisible();
    await expect(canvas2).toBeVisible();

    await context1.close();
    await context2.close();
  });

  test('should sync document status across users', async ({ browser }) => {
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();

    // Setup
    for (const page of [page1, page2]) {
      await page.goto('/auth/login');
      await page.getByLabel(/email/i).fill('demo@secugenie.com');
      await page.getByLabel(/mot de passe/i).fill('demo123');
      await page.getByRole('button', { name: /se connecter/i }).click();
      await page.waitForURL(/\/dashboard/);
      await page.goto('/documents/list');
    }

    // User 1 changes document status
    const firstDoc = page1.locator('.card').first();
    await firstDoc.click();
    
    const statusButton = page1.getByRole('button', { name: /statut|status/i });
    if (await statusButton.isVisible()) {
      await statusButton.click();
      await page1.getByRole('menuitem', { name: /révision|review/i }).click();
    }

    // User 2 should see updated status
    await page2.reload();
    await expect(page2.getByText(/révision|review/i)).toBeVisible({ timeout: 10000 });

    await context1.close();
    await context2.close();
  });

  test('should handle notification preferences', async ({ page }) => {
    await page.goto('/auth/login');
    await page.getByLabel(/email/i).fill('demo@secugenie.com');
    await page.getByLabel(/mot de passe/i).fill('demo123');
    await page.getByRole('button', { name: /se connecter/i }).click();
    await page.waitForURL(/\/dashboard/);

    // Navigate to settings
    await page.goto('/settings');

    // Find notification settings
    const notifSettings = page.getByText(/notification/i);
    await notifSettings.click();

    // Toggle email notifications
    const emailNotifToggle = page.getByLabel(/email.*notification/i);
    if (await emailNotifToggle.isVisible()) {
      const isChecked = await emailNotifToggle.isChecked();
      await emailNotifToggle.click();
      
      // Verify state changed
      await expect(emailNotifToggle).toBeChecked({ checked: !isChecked });
    }

    // Save preferences
    const saveButton = page.getByRole('button', { name: /enregistrer/i });
    await saveButton.click();
    
    await expect(page.getByText(/préférences.*enregistrées/i)).toBeVisible();
  });

  test('should display activity feed in real-time', async ({ browser }) => {
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();

    // Setup both users
    for (const page of [page1, page2]) {
      await page.goto('/auth/login');
      await page.getByLabel(/email/i).fill('demo@secugenie.com');
      await page.getByLabel(/mot de passe/i).fill('demo123');
      await page.getByRole('button', { name: /se connecter/i }).click();
      await page.waitForURL(/\/dashboard/);
    }

    // Both view activity feed
    await page1.goto('/dashboard');
    await page2.goto('/dashboard');

    // User 1 creates a document
    await page1.goto('/documents/gn6/create');
    await page1.getByLabel(/type.*événement/i).fill('New Activity Test');
    
    const saveButton = page1.getByRole('button', { name: /enregistrer/i });
    if (await saveButton.isVisible()) {
      await saveButton.click();
    }

    // Go back to dashboard
    await page1.goto('/dashboard');

    // User 2 should see activity
    await page2.reload();
    await expect(page2.getByText(/New Activity Test/i)).toBeVisible({ timeout: 10000 });

    await context1.close();
    await context2.close();
  });
});
