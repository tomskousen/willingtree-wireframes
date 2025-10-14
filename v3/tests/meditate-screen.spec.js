const { test, expect } = require('@playwright/test');

test.describe('Meditate Screen Tests', () => {
  test('MeditateScreen component exists in code', async ({ page }) => {
    await page.goto('http://localhost:8080/index.html');

    // Check that MeditateScreen function is defined
    const hasMeditateScreen = await page.evaluate(() => {
      return document.body.innerHTML.includes('MeditateScreen') &&
             document.body.innerHTML.includes('Meditate in the Sun');
    });

    expect(hasMeditateScreen).toBeTruthy();
  });

  test('Title changed to Good Soil', async ({ page }) => {
    await page.goto('http://localhost:8080/index.html');

    // Check that "Good Soil" title exists
    const hasGoodSoil = await page.evaluate(() => {
      return document.body.innerHTML.includes('Good Soil');
    });

    expect(hasGoodSoil).toBeTruthy();
  });

  test('Sun emoji and meditation text present', async ({ page }) => {
    await page.goto('http://localhost:8080/index.html');

    // Check meditation-related text
    const hasMeditationText = await page.evaluate(() => {
      return document.body.innerHTML.includes('Take a moment to breathe') &&
             document.body.innerHTML.includes('☀️');
    });

    expect(hasMeditationText).toBeTruthy();
  });
});
