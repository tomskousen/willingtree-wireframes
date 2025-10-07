/**
 * WillingTree Demo Flow Recorder
 *
 * This script uses Playwright to:
 * 1. Walk through the complete onboarding flow
 * 2. Record a video of the entire journey
 * 3. Add realistic pauses for watchability
 *
 * Usage:
 *   npm install -D playwright
 *   npx playwright install chromium
 *   node willingtree-demo-recorder.js
 */

const { chromium } = require('playwright');
const path = require('path');

async function recordDemoFlow() {
    console.log('🎬 Starting WillingTree demo recording...\n');

    const browser = await chromium.launch({
        headless: false, // Set to true for background recording
        slowMo: 500 // Slow down actions for better visibility
    });

    const context = await browser.newContext({
        viewport: { width: 1400, height: 900 },
        recordVideo: {
            dir: path.join(__dirname, 'videos'),
            size: { width: 1400, height: 900 }
        }
    });

    const page = await context.newPage();

    // Load the demo
    const demoPath = 'file://' + path.join(__dirname, 'willingtree-full-demo.html');
    await page.goto(demoPath);
    await page.waitForTimeout(2000);

    console.log('✅ Demo loaded\n');
    console.log('📹 Recording flow:\n');

    // ========== SCREEN 1A: WELCOME ==========
    console.log('  1A: Welcome Screen');
    await page.waitForTimeout(1500);
    await page.click('button:has-text("Sign Up")');
    await page.waitForTimeout(1000);

    // ========== SCREEN 1B: PROFILE SETUP ==========
    console.log('  1B: Profile Setup');
    await page.waitForTimeout(1000);
    await page.fill('input[placeholder="Name"]', 'Sarah Johnson');
    await page.waitForTimeout(500);
    await page.fill('input[type="date"]', '1992-05-15');
    await page.waitForTimeout(500);
    await page.selectOption('select.input-field', 'female');
    await page.waitForTimeout(1000);
    await page.click('button:has-text("Continue")');
    await page.waitForTimeout(1000);

    // ========== SCREEN 1B2: PAIRING CHOICE ==========
    console.log('  1B2: Pairing Choice');
    await page.waitForTimeout(1500);
    await page.click('text=Solo Mode');
    await page.waitForTimeout(1500); // Show the expanded details
    await page.click('button:has-text("Continue")');
    await page.waitForTimeout(500);

    // Dismiss alert
    page.on('dialog', async dialog => {
        console.log('    Alert:', dialog.message().split('\n')[0]);
        await dialog.accept();
    });
    await page.waitForTimeout(1000);

    // ========== DAY 1: BONDING STYLE ==========
    console.log('  2A: Day 1 - Bonding Style');
    await page.waitForTimeout(1500);
    await page.click('text=Stone'); // Select bonding style
    await page.waitForTimeout(1500); // Show the description
    await page.click('button:has-text("Continue to Day 2")');
    await page.waitForTimeout(1500);

    // ========== DAY 2: TREE METAPHOR ==========
    console.log('  2B: Day 2 - Tree Metaphor');
    await page.waitForTimeout(2000); // Let them read the metaphors
    await page.click('input[type="checkbox"]'); // Check understanding
    await page.waitForTimeout(1000);
    await page.click('button:has-text("Continue to Day 3")');
    await page.waitForTimeout(1500);

    // ========== DAY 3: COMMITMENT ==========
    console.log('  2C: Day 3 - Commitment');
    await page.waitForTimeout(1500);
    await page.click('text=Dedicated'); // Select commitment level
    await page.waitForTimeout(1500);
    await page.click('button:has-text("Continue to Day 4")');
    await page.waitForTimeout(1500);

    // ========== DAY 4: WILLINGNESS VALUES ==========
    console.log('  2D: Day 4 - Willingness Values');
    await page.waitForTimeout(1500);
    // Click a few tasks to prioritize
    await page.click('text=Cook dinner together');
    await page.waitForTimeout(800);
    await page.click('text=Give a massage');
    await page.waitForTimeout(800);
    await page.click('text=Listen actively');
    await page.waitForTimeout(1500);
    await page.click('button:has-text("Continue to Day 5")');
    await page.waitForTimeout(1500);

    // ========== DAY 5: BENCHMARKS ==========
    console.log('  2E: Day 5 - Benchmarks');
    await page.waitForTimeout(1500);
    await page.fill('textarea', 'I would love if we could have one tech-free dinner together each week where we really talk and connect.');
    await page.waitForTimeout(1000);
    await page.click('input[type="checkbox"]'); // Check understanding
    await page.waitForTimeout(1000);
    await page.click('button:has-text("Continue to Day 6")');
    await page.waitForTimeout(1500);

    // ========== DAY 6: SMALL BRANCHES ==========
    console.log('  2F: Day 6 - Small Branches');
    await page.waitForTimeout(1500);
    await page.selectOption('select.input-field', '0'); // Select slot 1
    await page.waitForTimeout(1000);
    // Select 2 items for slots 2-3
    const checkboxes = await page.locator('input[type="checkbox"]').all();
    if (checkboxes.length >= 2) {
        await checkboxes[0].click();
        await page.waitForTimeout(800);
        await checkboxes[1].click();
        await page.waitForTimeout(1000);
    }
    await page.click('button:has-text("Lock in Small Branches")');
    await page.waitForTimeout(1500);

    // ========== DAY 7: WILLING COMMITMENT ==========
    console.log('  2G: Day 7 - Willing Commitment');
    await page.waitForTimeout(1500);
    await page.fill('textarea', 'I commit to helping with dishes after dinner at least 4 times this week, making it easier for us both.');
    await page.waitForTimeout(1000);
    await page.click('input[type="checkbox"]');
    await page.waitForTimeout(1000);
    await page.click('button:has-text("Confirm Commitment")');
    await page.waitForTimeout(1500);

    // ========== DAY 8: PRACTICE SESSION ==========
    console.log('  2H: Day 8 - Practice Session');
    await page.waitForTimeout(1500);
    await page.click('input[type="checkbox"]'); // Practice checkbox
    await page.waitForTimeout(1000);
    await page.fill('textarea', 'I will do this right after dinner each night. I will set a phone reminder at 6:30pm to help me remember.');
    await page.waitForTimeout(1000);
    await page.click('button:has-text("Continue to Day 9")');
    await page.waitForTimeout(1500);

    // ========== DAY 9: GUESSING GAME ==========
    console.log('  2I: Day 9 - Guessing Game');
    await page.waitForTimeout(2000);
    await page.click('text=Cook dinner'); // First guess
    await page.waitForTimeout(1000);
    await page.click('button:has-text("Make My Guess")');
    await page.waitForTimeout(2000); // Wait for alert and auto-advance

    // ========== DAY 10: COMPLETION ==========
    console.log('  2J: Day 10 - Completion');
    await page.waitForTimeout(2000);
    await page.click('input[type="checkbox"]'); // Ready checkbox
    await page.waitForTimeout(1500);
    await page.click('button:has-text("Start My WillingTree Journey")');
    await page.waitForTimeout(2000);

    // ========== DASHBOARD ==========
    console.log('  1C: Dashboard (Final)');
    await page.waitForTimeout(3000); // Show final dashboard

    console.log('\n✅ Recording complete!\n');
    console.log('📹 Saving video...');

    // Close browser to finalize video
    await context.close();
    await browser.close();

    console.log('✨ Done! Video saved to: videos/');
    console.log('\n💡 You can now find the .webm video file in the videos/ folder');
}

// Run the recording
recordDemoFlow().catch(error => {
    console.error('❌ Error during recording:', error);
    process.exit(1);
});
