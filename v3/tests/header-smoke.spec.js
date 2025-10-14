const { test, expect } = require('@playwright/test');

test.describe('Header Structure Smoke Tests', () => {
  test('page loads and has basic structure', async ({ page }) => {
    await page.goto('http://localhost:8080/index.html');

    // Verify the page loads
    await expect(page).toHaveTitle(/WillingTree/);

    // Verify basic app structure
    await expect(page.locator('.screen')).toBeVisible();
  });

  test('createHeaderWithTrack function exists in app', async ({ page }) => {
    await page.goto('http://localhost:8080/index.html');

    // Check that the createHeaderWithTrack function exists
    const hasFunction = await page.evaluate(() => {
      return typeof window.createHeaderWithTrack !== 'undefined' ||
             document.body.innerHTML.includes('createHeaderWithTrack');
    });

    // The function should be defined in the React app
    expect(document.body.innerHTML).toContain('createHeaderWithTrack');
  });

  test('track-name CSS class is defined', async ({ page }) => {
    await page.goto('http://localhost:8080/index.html');

    // Check that track-name CSS is present
    const hasTrackNameStyle = await page.evaluate(() => {
      const styles = Array.from(document.styleSheets)
        .flatMap(sheet => {
          try {
            return Array.from(sheet.cssRules || []);
          } catch (e) {
            return [];
          }
        })
        .map(rule => rule.cssText)
        .join('');

      return styles.includes('.track-name') || styles.includes('track-name');
    });

    expect(hasTrackNameStyle).toBeTruthy();
  });

  test('header-row CSS class is defined', async ({ page }) => {
    await page.goto('http://localhost:8080/index.html');

    // Check that header-row CSS is present
    const hasHeaderRowStyle = await page.evaluate(() => {
      const styles = Array.from(document.styleSheets)
        .flatMap(sheet => {
          try {
            return Array.from(sheet.cssRules || []);
          } catch (e) {
            return [];
          }
        })
        .map(rule => rule.cssText)
        .join('');

      return styles.includes('.header-row') || styles.includes('header-row');
    });

    expect(hasHeaderRowStyle).toBeTruthy();
  });

  test('getTrackName function logic exists', async ({ page }) => {
    await page.goto('http://localhost:8080/index.html');

    // Verify the track name mapping exists in code
    const hasTrackLogic = await page.evaluate(() => {
      const pageContent = document.body.innerHTML;
      return pageContent.includes('Prepare the Mind') &&
             pageContent.includes('Appreciate') &&
             pageContent.includes('Boundaries') &&
             pageContent.includes('Curating Wants');
    });

    expect(hasTrackLogic).toBeTruthy();
  });
});
