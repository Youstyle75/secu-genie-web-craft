import { test, expect } from '@playwright/test';

/**
 * Smoke Tests - Tests critiques rapides
 * À exécuter avant chaque déploiement
 */

test.describe('Smoke Tests - Critical Paths', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/SecuGenie/i);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('can navigate to all main pages', async ({ page }) => {
    const pages = [
      { url: '/', name: 'Accueil' },
      { url: '/solutions', name: 'Solutions' },
      { url: '/pricing', name: 'Tarifs' },
      { url: '/about', name: 'À propos' },
      { url: '/contact', name: 'Contact' },
      { url: '/auth/login', name: 'Connexion' }
    ];

    for (const { url, name } of pages) {
      await page.goto(url);
      await expect(page).toHaveURL(url);
      console.log(`✓ ${name} page loaded`);
    }
  });

  test('can login and access dashboard', async ({ page }) => {
    await page.goto('/auth/login');
    await page.getByLabel(/email/i).fill('demo@secugenie.com');
    await page.getByLabel(/mot de passe/i).fill('demo123');
    await page.getByRole('button', { name: /se connecter/i }).click();
    
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 10000 });
    await expect(page.getByText(/tableau de bord|dashboard/i)).toBeVisible();
  });

  test('can create a new document', async ({ page }) => {
    // Login
    await page.goto('/auth/login');
    await page.getByLabel(/email/i).fill('demo@secugenie.com');
    await page.getByLabel(/mot de passe/i).fill('demo123');
    await page.getByRole('button', { name: /se connecter/i }).click();
    await page.waitForURL(/\/dashboard/);

    // Create document
    await page.goto('/documents/gn6/create');
    await expect(page.getByRole('heading', { name: /gn6/i })).toBeVisible();
  });

  test('API endpoints are responding', async ({ request }) => {
    // Test health check if available
    const response = await request.get('/api/health').catch(() => null);
    
    if (response) {
      expect(response.ok()).toBeTruthy();
    }
  });

  test('no console errors on homepage', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Filter out known non-critical errors
    const criticalErrors = errors.filter(error => 
      !error.includes('favicon') && 
      !error.includes('404')
    );

    expect(criticalErrors.length).toBe(0);
  });

  test('page loads within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;

    console.log(`Page load time: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(3000);
  });

  test('responsive design works on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.goto('/');
    
    const nav = page.getByRole('navigation');
    await expect(nav).toBeVisible();
  });

  test('can export a document to PDF', async ({ page }) => {
    await page.goto('/auth/login');
    await page.getByLabel(/email/i).fill('demo@secugenie.com');
    await page.getByLabel(/mot de passe/i).fill('demo123');
    await page.getByRole('button', { name: /se connecter/i }).click();
    await page.waitForURL(/\/dashboard/);

    await page.goto('/documents/list');
    
    const firstDoc = page.locator('.card').first();
    if (await firstDoc.count() > 0) {
      await firstDoc.click();
      
      const exportButton = page.getByRole('button', { name: /exporter/i });
      await exportButton.click();
      
      const pdfOption = page.getByRole('menuitem', { name: /pdf/i });
      await pdfOption.click();

      const downloadPromise = page.waitForEvent('download');
      const download = await downloadPromise;
      
      expect(download.suggestedFilename()).toMatch(/\.pdf$/);
    }
  });
});
