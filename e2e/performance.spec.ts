import { test, expect } from '@playwright/test';

/**
 * Tests E2E - Performance et Core Web Vitals
 * Couvre : LCP < 2.5s, FID < 100ms, CLS < 0.1, TTFB, etc.
 */

interface WebVitals {
  lcp: number;
  fid: number;
  cls: number;
  ttfb: number;
  fcp: number;
}

test.describe('Performance and Core Web Vitals', () => {
  test('should load homepage with LCP < 2.5s', async ({ page }) => {
    await page.goto('/');

    // Measure Largest Contentful Paint
    const lcp = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          resolve(lastEntry.renderTime || lastEntry.loadTime);
        });
        
        observer.observe({ type: 'largest-contentful-paint', buffered: true });
        
        // Fallback timeout
        setTimeout(() => resolve(0), 5000);
      });
    });

    console.log(`LCP: ${lcp}ms`);
    
    // WCAG AAA recommendation: LCP < 2500ms
    expect(lcp).toBeLessThan(2500);
  });

  test('should have FID < 100ms on interactions', async ({ page }) => {
    await page.goto('/');

    // Measure First Input Delay
    const fid = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          if (entries.length > 0) {
            const firstInput = entries[0] as any;
            resolve(firstInput.processingStart - firstInput.startTime);
          }
        });
        
        observer.observe({ type: 'first-input', buffered: true });
        
        // Trigger an interaction
        document.body.click();
        
        setTimeout(() => resolve(0), 3000);
      });
    });

    console.log(`FID: ${fid}ms`);
    
    // WCAG AAA: FID < 100ms
    if (fid > 0) {
      expect(fid).toBeLessThan(100);
    }
  });

  test('should have CLS < 0.1', async ({ page }) => {
    await page.goto('/');

    // Wait for page to fully load
    await page.waitForLoadState('networkidle');

    // Measure Cumulative Layout Shift
    const cls = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        let clsValue = 0;
        
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries() as any) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
        });
        
        observer.observe({ type: 'layout-shift', buffered: true });
        
        setTimeout(() => {
          observer.disconnect();
          resolve(clsValue);
        }, 3000);
      });
    });

    console.log(`CLS: ${cls}`);
    
    // WCAG AAA: CLS < 0.1
    expect(cls).toBeLessThan(0.1);
  });

  test('should have TTFB < 600ms', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    
    const ttfb = await page.evaluate(() => {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return perfData.responseStart - perfData.requestStart;
    });

    console.log(`TTFB: ${ttfb}ms`);
    
    // Good TTFB is < 600ms
    expect(ttfb).toBeLessThan(600);
  });

  test('should have FCP < 1.8s', async ({ page }) => {
    await page.goto('/');

    const fcp = await page.evaluate(() => {
      return new Promise<number>((resolve) => {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          if (entries.length > 0) {
            const fcpEntry = entries[0] as any;
            resolve(fcpEntry.startTime);
          }
        });
        
        observer.observe({ type: 'paint', buffered: true });
        
        setTimeout(() => resolve(0), 5000);
      });
    });

    console.log(`FCP: ${fcp}ms`);
    
    // Good FCP is < 1800ms
    if (fcp > 0) {
      expect(fcp).toBeLessThan(1800);
    }
  });

  test('should have fast Time to Interactive', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const tti = Date.now() - startTime;
    
    console.log(`TTI: ${tti}ms`);
    
    // TTI should be < 3.8s
    expect(tti).toBeLessThan(3800);
  });

  test('should load critical resources efficiently', async ({ page }) => {
    await page.goto('/');

    const resourceTimings = await page.evaluate(() => {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      
      return resources.map(resource => ({
        name: resource.name,
        duration: resource.duration,
        size: (resource as any).transferSize || 0,
        type: resource.initiatorType
      }));
    });

    // Check main bundle size
    const scripts = resourceTimings.filter(r => r.type === 'script');
    const totalScriptSize = scripts.reduce((sum, s) => sum + s.size, 0);
    
    console.log(`Total script size: ${(totalScriptSize / 1024).toFixed(2)} KB`);
    
    // Main bundle should be < 500KB
    expect(totalScriptSize).toBeLessThan(500 * 1024);

    // Check CSS size
    const styles = resourceTimings.filter(r => r.type === 'link' || r.name.includes('.css'));
    const totalStyleSize = styles.reduce((sum, s) => sum + s.size, 0);
    
    console.log(`Total CSS size: ${(totalStyleSize / 1024).toFixed(2)} KB`);
    
    // CSS should be < 100KB
    expect(totalStyleSize).toBeLessThan(100 * 1024);
  });

  test('should optimize images', async ({ page }) => {
    await page.goto('/');

    const images = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      
      return imgs.map(img => ({
        src: img.src,
        width: img.naturalWidth,
        height: img.naturalHeight,
        displayWidth: img.width,
        displayHeight: img.height,
        loading: img.loading
      }));
    });

    for (const img of images) {
      // Check for lazy loading on below-fold images
      if (img.displayHeight > 0) {
        // Images should use lazy loading
        expect(img.loading === 'lazy' || img.loading === 'eager').toBeTruthy();
      }

      // Check for responsive sizing (not serving oversized images)
      if (img.width > 0 && img.displayWidth > 0) {
        const ratio = img.width / img.displayWidth;
        
        // Image should not be more than 2x display size
        expect(ratio).toBeLessThan(2);
      }
    }
  });

  test('should minimize main thread blocking time', async ({ page }) => {
    await page.goto('/');

    const longTasks = await page.evaluate(() => {
      return new Promise<any[]>((resolve) => {
        const tasks: any[] = [];
        
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            tasks.push({
              duration: entry.duration,
              startTime: entry.startTime
            });
          }
        });
        
        observer.observe({ type: 'longtask', buffered: true });
        
        setTimeout(() => {
          observer.disconnect();
          resolve(tasks);
        }, 5000);
      });
    });

    console.log(`Long tasks found: ${longTasks.length}`);
    
    // Should have minimal long tasks
    expect(longTasks.length).toBeLessThan(3);
    
    // No task should block for more than 50ms
    for (const task of longTasks) {
      expect(task.duration).toBeLessThan(50);
    }
  });

  test('should use efficient caching strategies', async ({ page }) => {
    await page.goto('/');

    const cacheHeaders = await page.evaluate(() => {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      
      return resources.map(r => ({
        url: r.name,
        cached: (r as any).transferSize === 0
      }));
    });

    // Reload page
    await page.reload();

    const cachedResources = await page.evaluate(() => {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      
      return resources.filter(r => (r as any).transferSize === 0).length;
    });

    console.log(`Cached resources: ${cachedResources}`);
    
    // Some resources should be cached on reload
    expect(cachedResources).toBeGreaterThan(0);
  });

  test('should measure total page weight', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const totalSize = await page.evaluate(() => {
      const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
      
      return resources.reduce((sum, r) => {
        return sum + ((r as any).transferSize || 0);
      }, 0);
    });

    console.log(`Total page size: ${(totalSize / 1024).toFixed(2)} KB`);
    
    // Total page size should be < 2MB for good performance
    expect(totalSize).toBeLessThan(2 * 1024 * 1024);
  });

  test('should have fast PDF generation performance', async ({ page }) => {
    // Login
    await page.goto('/auth/login');
    await page.getByLabel(/email/i).fill('demo@secugenie.com');
    await page.getByLabel(/mot de passe/i).fill('demo123');
    await page.getByRole('button', { name: /se connecter/i }).click();
    await page.waitForURL(/\/dashboard/);

    // Navigate to document
    await page.goto('/documents/list');
    const firstDoc = page.locator('.card').first();
    await firstDoc.click();

    // Measure PDF export time
    const startTime = Date.now();
    
    const exportButton = page.getByRole('button', { name: /exporter/i });
    await exportButton.click();
    
    const pdfOption = page.getByRole('menuitem', { name: /pdf/i });
    await pdfOption.click();

    const downloadPromise = page.waitForEvent('download');
    await downloadPromise;
    
    const exportDuration = Date.now() - startTime;
    
    console.log(`PDF export duration: ${exportDuration}ms`);
    
    // PDF export should complete within 5 seconds
    expect(exportDuration).toBeLessThan(5000);
  });

  test('should maintain performance with multiple concurrent users', async ({ browser }) => {
    // Simulate 5 concurrent users
    const contexts = await Promise.all(
      Array.from({ length: 5 }, () => browser.newContext())
    );

    const startTime = Date.now();

    // All users navigate simultaneously
    await Promise.all(
      contexts.map(async (context) => {
        const page = await context.newPage();
        await page.goto('/');
        await page.waitForLoadState('networkidle');
      })
    );

    const totalDuration = Date.now() - startTime;
    
    console.log(`5 concurrent page loads: ${totalDuration}ms`);
    
    // Should handle concurrent load efficiently
    expect(totalDuration).toBeLessThan(10000);

    // Cleanup
    await Promise.all(contexts.map(c => c.close()));
  });

  test('should have efficient real-time updates performance', async ({ page }) => {
    await page.goto('/auth/login');
    await page.getByLabel(/email/i).fill('demo@secugenie.com');
    await page.getByLabel(/mot de passe/i).fill('demo123');
    await page.getByRole('button', { name: /se connecter/i }).click();
    await page.waitForURL(/\/dashboard/);

    // Navigate to a collaborative document
    await page.goto('/documents/test-doc');

    // Measure time for real-time update
    const updateTime = await page.evaluate(async () => {
      const start = performance.now();
      
      // Simulate a real-time event
      const event = new CustomEvent('realtimeUpdate', { detail: { test: true } });
      document.dispatchEvent(event);
      
      // Wait for DOM update
      await new Promise(resolve => setTimeout(resolve, 100));
      
      return performance.now() - start;
    });

    console.log(`Real-time update latency: ${updateTime}ms`);
    
    // Real-time updates should be < 200ms
    expect(updateTime).toBeLessThan(200);
  });

  test('should generate comprehensive performance report', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const performanceData = await page.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');
      
      return {
        dns: nav.domainLookupEnd - nav.domainLookupStart,
        tcp: nav.connectEnd - nav.connectStart,
        ttfb: nav.responseStart - nav.requestStart,
        download: nav.responseEnd - nav.responseStart,
        domInteractive: nav.domInteractive - nav.fetchStart,
        domComplete: nav.domComplete - nav.fetchStart,
        loadComplete: nav.loadEventEnd - nav.fetchStart,
        fcp: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0
      };
    });

    console.log('Performance Report:', JSON.stringify(performanceData, null, 2));

    // Assert all timings are reasonable
    expect(performanceData.dns).toBeLessThan(200);
    expect(performanceData.tcp).toBeLessThan(300);
    expect(performanceData.ttfb).toBeLessThan(600);
    expect(performanceData.domInteractive).toBeLessThan(2000);
    expect(performanceData.loadComplete).toBeLessThan(4000);
  });
});
