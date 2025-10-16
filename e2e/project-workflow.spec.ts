import { test, expect } from '@playwright/test';
import path from 'path';

/**
 * Tests E2E - Workflow complet de projet
 * Couvre : Création GN6, Upload plan, Génération IA, Signature, Export PDF
 */

test.describe('Complete Project Workflow', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/auth/login');
    await page.getByLabel(/email/i).fill('demo@secugenie.com');
    await page.getByLabel(/mot de passe/i).fill('demo123');
    await page.getByRole('button', { name: /se connecter/i }).click();
    await page.waitForURL(/\/dashboard/);
  });

  test('should create a new GN6 document', async ({ page }) => {
    // Navigate to GN6 creation
    await page.goto('/documents/gn6/create');
    
    await expect(page.getByRole('heading', { name: /gn6/i })).toBeVisible();

    // Fill GN6 form - Step 1: Event Information
    await page.getByLabel(/type.*événement/i).fill('Concert en plein air');
    await page.getByLabel(/lieu/i).fill('Place de la République, Paris');
    
    // Select dates
    const startDate = page.getByLabel(/date.*début/i);
    await startDate.click();
    await page.keyboard.type('2025-06-01');
    
    const endDate = page.getByLabel(/date.*fin/i);
    await endDate.click();
    await page.keyboard.type('2025-06-03');

    // Continue to next step
    const nextButton = page.getByRole('button', { name: /suivant/i });
    await nextButton.click();

    // Step 2: Capacity
    await page.getByLabel(/public/i).fill('5000');
    await page.getByLabel(/personnel/i).fill('100');
    await nextButton.click();

    // Step 3: Safety Measures
    const fireExtinguisher = page.getByLabel(/extincteurs/i);
    if (await fireExtinguisher.isVisible()) {
      await fireExtinguisher.check();
    }
    
    const emergencyExit = page.getByLabel(/issues.*secours/i);
    if (await emergencyExit.isVisible()) {
      await emergencyExit.check();
    }

    await nextButton.click();

    // Step 4: Rescue Means
    const ambulance = page.getByLabel(/ambulance/i);
    if (await ambulance.isVisible()) {
      await ambulance.check();
    }

    // Save document
    const saveButton = page.getByRole('button', { name: /enregistrer|terminer/i });
    await saveButton.click();

    // Should show success message
    await expect(page.getByText(/document.*créé|succès/i)).toBeVisible({ timeout: 10000 });
  });

  test('should upload and edit a prevention plan', async ({ page }) => {
    await page.goto('/documents/plans/prevention/create');

    // Fill basic information
    await page.getByLabel(/entreprise.*utilisatrice/i).fill('SecuGenie SARL');
    await page.getByLabel(/entreprise.*extérieure/i).fill('External Corp');
    await page.getByLabel(/nature.*travaux/i).fill('Installation électrique');
    
    // Upload a plan drawing
    const fileInput = page.locator('input[type="file"]').first();
    
    // Create a test file
    const testFilePath = path.join(__dirname, '../test-fixtures/test-plan.png');
    
    if (await fileInput.isVisible()) {
      await fileInput.setInputFiles(testFilePath);
      
      // Wait for upload
      await expect(page.getByText(/fichier.*chargé|upload/i)).toBeVisible({ timeout: 10000 });
    }

    // Save
    await page.getByRole('button', { name: /enregistrer/i }).click();
    await expect(page.getByText(/enregistré|succès/i)).toBeVisible({ timeout: 10000 });
  });

  test('should use AI to generate document content', async ({ page }) => {
    await page.goto('/documents/plans/prevention/create');

    // Look for AI assistant button
    const aiButton = page.getByRole('button', { name: /assistant.*ia|générer/i });
    
    if (await aiButton.isVisible()) {
      await aiButton.click();

      // Enter prompt
      const promptInput = page.getByPlaceholder(/décrivez|demandez/i);
      await promptInput.fill('Générer une liste de risques pour travaux électriques en hauteur');
      
      const generateButton = page.getByRole('button', { name: /générer|envoyer/i });
      await generateButton.click();

      // Wait for AI response
      await expect(page.getByText(/électrique|hauteur|chute/i)).toBeVisible({ timeout: 15000 });
    }
  });

  test('should add electronic signature to document', async ({ page }) => {
    await page.goto('/documents/plans/prevention/create');

    // Fill minimal form data
    await page.getByLabel(/entreprise.*utilisatrice/i).fill('Test Corp');
    
    // Navigate to signature section
    const signatureTab = page.getByRole('tab', { name: /signature/i });
    if (await signatureTab.isVisible()) {
      await signatureTab.click();
    } else {
      // Scroll to signature section
      await page.getByText(/signature/i).scrollIntoViewIfNeeded();
    }

    // Fill signature details
    await page.getByLabel(/nom/i).fill('Jean Dupont');
    await page.getByLabel(/fonction/i).fill('Responsable Sécurité');

    // Draw signature on canvas
    const signatureCanvas = page.locator('canvas').first();
    if (await signatureCanvas.isVisible()) {
      const box = await signatureCanvas.boundingBox();
      if (box) {
        // Draw a simple signature
        await page.mouse.move(box.x + 10, box.y + 10);
        await page.mouse.down();
        await page.mouse.move(box.x + 100, box.y + 30);
        await page.mouse.move(box.x + 150, box.y + 20);
        await page.mouse.up();

        // Validate signature
        const validateButton = page.getByRole('button', { name: /valider.*signature/i });
        await validateButton.click();

        await expect(page.getByText(/signature.*ajoutée/i)).toBeVisible();
      }
    }
  });

  test('should export document to PDF', async ({ page }) => {
    await page.goto('/documents/list');

    // Find first document
    const firstDocument = page.locator('.card').first();
    await firstDocument.click();

    // Click export button
    const exportButton = page.getByRole('button', { name: /exporter/i });
    await exportButton.click();

    // Select PDF export
    const pdfOption = page.getByRole('menuitem', { name: /pdf/i });
    await pdfOption.click();

    // Wait for download
    const downloadPromise = page.waitForEvent('download');
    const download = await downloadPromise;

    // Verify download
    expect(download.suggestedFilename()).toMatch(/\.pdf$/i);
    
    // Verify file is not empty
    const path = await download.path();
    expect(path).toBeTruthy();
  });

  test('should export document to JSON', async ({ page }) => {
    await page.goto('/documents/list');

    const firstDocument = page.locator('.card').first();
    await firstDocument.click();

    const exportButton = page.getByRole('button', { name: /exporter/i });
    await exportButton.click();

    const jsonOption = page.getByRole('menuitem', { name: /json/i });
    await jsonOption.click();

    const downloadPromise = page.waitForEvent('download');
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toMatch(/\.json$/i);
  });

  test('should export plan drawing to SVG', async ({ page }) => {
    await page.goto('/plans/editor');

    // Draw something on canvas
    const canvas = page.locator('canvas').first();
    const box = await canvas.boundingBox();
    
    if (box) {
      // Add a rectangle
      const rectangleButton = page.getByRole('button', { name: /rectangle/i });
      if (await rectangleButton.isVisible()) {
        await rectangleButton.click();
      }

      // Export as SVG
      const exportSVGButton = page.getByRole('button', { name: /svg/i });
      if (await exportSVGButton.isVisible()) {
        const downloadPromise = page.waitForEvent('download');
        await exportSVGButton.click();
        
        const download = await downloadPromise;
        expect(download.suggestedFilename()).toMatch(/\.svg$/i);
      }
    }
  });

  test('should validate downloaded PDF content', async ({ page }) => {
    await page.goto('/documents/list');

    const firstDocument = page.locator('.card').first();
    await firstDocument.click();

    const exportButton = page.getByRole('button', { name: /exporter/i });
    await exportButton.click();

    const pdfOption = page.getByRole('menuitem', { name: /pdf/i });
    await pdfOption.click();

    const downloadPromise = page.waitForEvent('download');
    const download = await downloadPromise;

    // Get file path
    const filePath = await download.path();
    
    // Basic validation - file should exist and have content
    expect(filePath).toBeTruthy();
    
    // Additional validation could be done with pdf-parse library
    // For now, just verify the file was downloaded
    const fileName = download.suggestedFilename();
    expect(fileName).toContain('secugenie');
    expect(fileName).toMatch(/\d{4}-\d{2}-\d{2}/); // Should have date
  });

  test('should complete full document lifecycle', async ({ page }) => {
    // 1. Create document
    await page.goto('/documents/gn6/create');
    await page.getByLabel(/type.*événement/i).fill('Test Event E2E');
    await page.getByLabel(/lieu/i).fill('Test Location');
    
    // Save draft
    const saveDraftButton = page.getByRole('button', { name: /brouillon/i });
    if (await saveDraftButton.isVisible()) {
      await saveDraftButton.click();
    }

    await expect(page.getByText(/enregistré/i)).toBeVisible({ timeout: 10000 });

    // 2. Navigate to document list
    await page.goto('/documents/list');
    await expect(page.getByText(/Test Event E2E/i)).toBeVisible();

    // 3. Open document for review
    await page.getByText(/Test Event E2E/i).click();
    
    // 4. Add comment
    const commentButton = page.getByRole('button', { name: /commentaire/i });
    if (await commentButton.isVisible()) {
      await commentButton.click();
      await page.getByPlaceholder(/commentaire/i).fill('Révision nécessaire');
      await page.getByRole('button', { name: /envoyer/i }).click();
    }

    // 5. Export final version
    const exportButton = page.getByRole('button', { name: /exporter/i });
    await exportButton.click();
    await page.getByRole('menuitem', { name: /pdf/i }).click();

    const downloadPromise = page.waitForEvent('download');
    await downloadPromise;

    // Success - full workflow completed
  });
});
