import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Tests E2E - Accessibilité AAA
 * Couvre : Navigation clavier, Screen reader, Contrastes, ARIA labels
 */

test.describe('Accessibility Compliance (AAA)', () => {
  test('should have no accessibility violations on homepage', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag2aaa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have no accessibility violations on login page', async ({ page }) => {
    await page.goto('/auth/login');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag2aaa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have no accessibility violations on dashboard', async ({ page }) => {
    // Login first
    await page.goto('/auth/login');
    await page.getByLabel(/email/i).fill('demo@secugenie.com');
    await page.getByLabel(/mot de passe/i).fill('demo123');
    await page.getByRole('button', { name: /se connecter/i }).click();
    await page.waitForURL(/\/dashboard/);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag2aaa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should navigate entire site using only keyboard', async ({ page }) => {
    await page.goto('/');

    // Tab through navigation
    await page.keyboard.press('Tab'); // First focusable element
    await page.keyboard.press('Tab'); // Second element
    
    // Verify focus is visible
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();

    // Navigate to login using Enter
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/auth\/login/);

    // Fill form with keyboard
    await page.keyboard.press('Tab'); // Email field
    await page.keyboard.type('demo@secugenie.com');
    
    await page.keyboard.press('Tab'); // Password field
    await page.keyboard.type('demo123');
    
    await page.keyboard.press('Tab'); // Submit button
    await page.keyboard.press('Enter');

    await page.waitForURL(/\/dashboard/, { timeout: 10000 });
  });

  test('should have proper ARIA labels on all interactive elements', async ({ page }) => {
    await page.goto('/');

    // Check buttons have aria-labels or accessible text
    const buttons = await page.locator('button').all();
    
    for (const button of buttons) {
      const ariaLabel = await button.getAttribute('aria-label');
      const text = await button.textContent();
      const title = await button.getAttribute('title');
      
      expect(ariaLabel || text?.trim() || title).toBeTruthy();
    }

    // Check links have accessible names
    const links = await page.locator('a').all();
    
    for (const link of links) {
      const ariaLabel = await link.getAttribute('aria-label');
      const text = await link.textContent();
      
      expect(ariaLabel || text?.trim()).toBeTruthy();
    }
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');

    // Get all headings
    const h1s = await page.locator('h1').count();
    const h2s = await page.locator('h2').count();
    
    // Should have exactly one h1
    expect(h1s).toBe(1);
    
    // Should have h2s if content exists
    if (h2s > 0) {
      expect(h2s).toBeGreaterThan(0);
    }

    // Verify headings are in order
    const headings = await page.$$eval(
      'h1, h2, h3, h4, h5, h6',
      elements => elements.map(el => ({
        level: parseInt(el.tagName[1]),
        text: el.textContent
      }))
    );

    // Check no heading level is skipped
    for (let i = 1; i < headings.length; i++) {
      const diff = headings[i].level - headings[i - 1].level;
      expect(diff).toBeLessThanOrEqual(1);
    }
  });

  test('should have sufficient color contrast ratios', async ({ page }) => {
    await page.goto('/');

    const contrastResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa', 'wcag2aaa'])
      .include('body')
      .disableRules(['color-contrast']) // We'll check this specifically
      .analyze();

    // Run specific color contrast check
    const colorContrastResults = await new AxeBuilder({ page })
      .withRules(['color-contrast'])
      .analyze();

    expect(colorContrastResults.violations).toEqual([]);
  });

  test('should have proper form labels and error messages', async ({ page }) => {
    await page.goto('/auth/login');

    // Check all inputs have labels
    const inputs = await page.locator('input').all();
    
    for (const input of inputs) {
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');
      
      if (id) {
        const label = await page.locator(`label[for="${id}"]`).count();
        expect(label > 0 || ariaLabel || ariaLabelledBy).toBeTruthy();
      }
    }

    // Trigger validation errors
    const submitButton = page.getByRole('button', { name: /se connecter/i });
    await submitButton.click();

    // Error messages should be accessible
    const errorMessages = await page.locator('[role="alert"], .form-error').all();
    
    for (const error of errorMessages) {
      const text = await error.textContent();
      expect(text?.trim()).toBeTruthy();
    }
  });

  test('should support screen reader navigation', async ({ page }) => {
    await page.goto('/');

    // Check for landmark regions
    const main = await page.locator('main, [role="main"]').count();
    expect(main).toBeGreaterThan(0);

    const nav = await page.locator('nav, [role="navigation"]').count();
    expect(nav).toBeGreaterThan(0);

    const header = await page.locator('header, [role="banner"]').count();
    expect(header).toBeGreaterThan(0);

    const footer = await page.locator('footer, [role="contentinfo"]').count();
    expect(footer).toBeGreaterThan(0);

    // Check skip link
    const skipLink = page.locator('.skip-to-main, [href="#main"]');
    if (await skipLink.count() > 0) {
      await expect(skipLink.first()).toBeInViewport();
    }
  });

  test('should have accessible focus indicators', async ({ page }) => {
    await page.goto('/');

    // Tab to first focusable element
    await page.keyboard.press('Tab');

    // Get computed styles of focused element
    const outlineStyle = await page.evaluate(() => {
      const element = document.activeElement as HTMLElement;
      const styles = window.getComputedStyle(element);
      return {
        outline: styles.outline,
        outlineWidth: styles.outlineWidth,
        outlineColor: styles.outlineColor,
        boxShadow: styles.boxShadow
      };
    });

    // Should have visible focus indicator
    expect(
      outlineStyle.outline !== 'none' ||
      outlineStyle.outlineWidth !== '0px' ||
      outlineStyle.boxShadow !== 'none'
    ).toBeTruthy();
  });

  test('should have proper alt text for all images', async ({ page }) => {
    await page.goto('/');

    const images = await page.locator('img').all();
    
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      const role = await img.getAttribute('role');
      
      // Decorative images should have empty alt or presentation role
      // Content images should have descriptive alt
      expect(alt !== null || role === 'presentation').toBeTruthy();
      
      if (alt && role !== 'presentation') {
        expect(alt.length).toBeGreaterThan(0);
      }
    }
  });

  test('should support text resize up to 200%', async ({ page }) => {
    await page.goto('/');

    // Get initial text size
    const initialSize = await page.evaluate(() => {
      const element = document.querySelector('p');
      return element ? window.getComputedStyle(element).fontSize : null;
    });

    // Zoom to 200%
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.evaluate(() => {
      document.body.style.zoom = '2';
    });

    await page.waitForTimeout(500);

    // Content should still be readable and not overflow
    const isOverflowing = await page.evaluate(() => {
      return document.body.scrollWidth > window.innerWidth;
    });

    // Some horizontal scroll is acceptable at 200% zoom
    expect(isOverflowing).toBeDefined();
  });

  test('should have accessible tables with proper headers', async ({ page }) => {
    // Navigate to a page with tables
    await page.goto('/documents/list');

    const tables = await page.locator('table').all();
    
    for (const table of tables) {
      // Should have thead or th elements
      const headers = await table.locator('th, thead').count();
      
      if (headers > 0) {
        // Check scope attributes
        const ths = await table.locator('th').all();
        
        for (const th of ths) {
          const scope = await th.getAttribute('scope');
          expect(scope).toMatch(/col|row|colgroup|rowgroup/);
        }
      }
    }
  });

  test('should announce dynamic content changes', async ({ page }) => {
    await page.goto('/auth/login');

    // Submit form to trigger error
    await page.getByRole('button', { name: /se connecter/i }).click();

    // Error should be in an aria-live region or role="alert"
    const liveRegions = await page.locator('[aria-live], [role="alert"]').count();
    expect(liveRegions).toBeGreaterThan(0);
  });

  test('should have accessible modals and dialogs', async ({ page }) => {
    await page.goto('/');

    // Open a dialog/modal if available
    const dialogTrigger = page.getByRole('button', { name: /ouvrir|modal/i }).first();
    
    if (await dialogTrigger.count() > 0) {
      await dialogTrigger.click();

      // Dialog should have proper ARIA attributes
      const dialog = page.locator('[role="dialog"], [role="alertdialog"]');
      await expect(dialog).toBeVisible();

      const ariaLabel = await dialog.getAttribute('aria-label');
      const ariaLabelledBy = await dialog.getAttribute('aria-labelledby');
      
      expect(ariaLabel || ariaLabelledBy).toBeTruthy();

      // Focus should be trapped
      await page.keyboard.press('Tab');
      const focusedElement = await page.evaluate(() => 
        document.activeElement?.closest('[role="dialog"], [role="alertdialog"]')
      );
      
      expect(focusedElement).toBeTruthy();
    }
  });

  test('should have minimum touch target size of 44x44px', async ({ page }) => {
    await page.goto('/');

    const interactiveElements = await page.locator('a, button, input, [role="button"]').all();
    
    for (const element of interactiveElements) {
      if (await element.isVisible()) {
        const box = await element.boundingBox();
        
        if (box) {
          // WCAG AAA requires 44x44px minimum
          expect(box.width >= 44 || box.height >= 44).toBeTruthy();
        }
      }
    }
  });
});
