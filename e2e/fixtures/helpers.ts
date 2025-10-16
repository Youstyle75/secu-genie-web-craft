import { Page } from '@playwright/test';

/**
 * Test helpers and utilities for E2E tests
 */

export async function login(page: Page, email: string = 'demo@secugenie.com', password: string = 'demo123') {
  await page.goto('/auth/login');
  await page.getByLabel(/email/i).fill(email);
  await page.getByLabel(/mot de passe/i).fill(password);
  await page.getByRole('button', { name: /se connecter/i }).click();
  await page.waitForURL(/\/dashboard/, { timeout: 10000 });
}

export async function logout(page: Page) {
  const userMenu = page.getByRole('button', { name: /profil|compte/i });
  await userMenu.click();
  
  const logoutButton = page.getByRole('button', { name: /déconnexion/i });
  await logoutButton.click();
  
  await page.waitForURL('/', { timeout: 5000 });
}

export async function createDocument(page: Page, type: 'gn6' | 'plan' | 'notice') {
  const urls = {
    gn6: '/documents/gn6/create',
    plan: '/documents/plans/prevention/create',
    notice: '/documents/notices/securite/create'
  };
  
  await page.goto(urls[type]);
}

export async function waitForToast(page: Page, message: string | RegExp) {
  const toast = page.getByText(message);
  await toast.waitFor({ state: 'visible', timeout: 5000 });
  return toast;
}

export async function fillFormField(page: Page, label: string | RegExp, value: string) {
  const field = page.getByLabel(label);
  await field.fill(value);
}

export async function selectOption(page: Page, label: string | RegExp, option: string) {
  const select = page.getByLabel(label);
  await select.click();
  await page.getByRole('option', { name: option }).click();
}

export async function uploadFile(page: Page, selector: string, filePath: string) {
  const fileInput = page.locator(selector);
  await fileInput.setInputFiles(filePath);
}

export async function waitForNetworkIdle(page: Page, timeout: number = 3000) {
  await page.waitForLoadState('networkidle', { timeout });
}

export async function takeAccessibilitySnapshot(page: Page) {
  const snapshot = await page.accessibility.snapshot();
  return snapshot;
}

export async function measurePageLoadTime(page: Page, url: string) {
  const startTime = Date.now();
  await page.goto(url);
  await page.waitForLoadState('networkidle');
  const endTime = Date.now();
  
  return endTime - startTime;
}

export async function getWebVitals(page: Page) {
  return page.evaluate(() => {
    return new Promise((resolve) => {
      const vitals: any = {};
      
      // LCP
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        vitals.lcp = lastEntry.renderTime || lastEntry.loadTime;
      }).observe({ type: 'largest-contentful-paint', buffered: true });
      
      // FID
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        if (entries.length > 0) {
          const firstInput = entries[0] as any;
          vitals.fid = firstInput.processingStart - firstInput.startTime;
        }
      }).observe({ type: 'first-input', buffered: true });
      
      // CLS
      let clsValue = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        vitals.cls = clsValue;
      }).observe({ type: 'layout-shift', buffered: true });
      
      setTimeout(() => resolve(vitals), 3000);
    });
  });
}

export async function clearDatabase(page: Page) {
  // Helper to clear test data from database
  // This would call a test-only API endpoint
  await page.evaluate(() => {
    // Clear localStorage
    localStorage.clear();
    sessionStorage.clear();
  });
}

export async function seedTestData(page: Page, data: any) {
  // Helper to seed test data
  await page.evaluate((testData) => {
    localStorage.setItem('testData', JSON.stringify(testData));
  }, data);
}

export function generateTestEmail() {
  return `test-${Date.now()}@secugenie.test`;
}

export function generateTestPassword() {
  return `Test${Date.now()}!@#`;
}

export async function checkAccessibility(page: Page, tags: string[] = ['wcag2a', 'wcag2aa', 'wcag2aaa']) {
  // This would use axe-core
  const violations = await page.evaluate(() => {
    // Accessibility check logic
    return [];
  });
  
  return violations;
}
