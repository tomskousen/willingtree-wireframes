/**
 * WillingTree Demo Flow Recorder V2
 *
 * Updated for new step/substep naming convention
 *
 * Usage:
 *   npm install -D playwright
 *   npx playwright install chromium
 *   node willingtree-demo-recorder-v2.js
 */

const { chromium } = require('playwright');
const path = require('path');

async function recordDemoFlow() {
    console.log('🎬 Starting WillingTree demo recording (V2)...\\n');

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
    const demoPath = 'file://' + path.join(__dirname, 'willingtree-full-demo-v2.html');
    await page.goto(demoPath);
    await page.waitForTimeout(2000);

    console.log('✅ Demo loaded\\n');
    console.log('📹 Recording flow:\\n');

    // ========== STEP 1: WELCOME & SETUP ==========

    // Screen 1.1: Welcome
    console.log('  1.1: Welcome Screen');
    await page.waitForTimeout(1500);
    await page.click('button:has-text("Sign Up")');
    await page.waitForTimeout(1000);

    // Screen 1.2: Profile Setup
    console.log('  1.2: Profile Setup');
    await page.waitForTimeout(1000);
    await page.fill('input[placeholder="Your name"]', 'Sarah Johnson');
    await page.waitForTimeout(500);
    await page.fill('input[type="date"]', '1992-05-15');
    await page.waitForTimeout(500);
    await page.selectOption('select.input-field', 'female');
    await page.waitForTimeout(1000);
    await page.click('button:has-text("Continue")');
    await page.waitForTimeout(1000);

    // Screen 1.3: Pairing Choice
    console.log('  1.3: Pairing Choice');
    await page.waitForTimeout(1500);
    await page.click('text=Solo Mode');
    await page.waitForTimeout(1500); // Show the expanded details
    await page.click('button:has-text("Continue")');
    await page.waitForTimeout(500);

    // Dismiss alert
    page.on('dialog', async dialog => {
        console.log('    Alert:', dialog.message().split('\\n')[0]);
        await dialog.accept();
    });
    await page.waitForTimeout(1000);

    // ========== STEP 2: 10-DAY ONBOARDING ==========

    // Screen 2.1: Day 1 - Bonding Styles
    console.log('  2.1: Day 1 - Bonding Styles');
    await page.waitForTimeout(1500);
    await page.click('text=Stone'); // Select bonding style
    await page.waitForTimeout(1500); // Show the description
    await page.click('button:has-text("Continue to Day 2")');
    await page.waitForTimeout(1500);

    // Screen 2.2: Day 2 - Tree Metaphor
    console.log('  2.2: Day 2 - Tree Metaphor');
    await page.waitForTimeout(2000); // Let them read the metaphors
    await page.click('input[type="checkbox"]'); // Check understanding
    await page.waitForTimeout(1000);
    await page.click('button:has-text("Continue to Day 3")');
    await page.waitForTimeout(1500);

    // Screen 2.3: Day 3 - Commitment
    console.log('  2.3: Day 3 - Commitment');
    await page.waitForTimeout(1500);
    await page.click('text=Dedicated'); // Select commitment level
    await page.waitForTimeout(1500);
    await page.click('button:has-text("Continue to Day 4")');
    await page.waitForTimeout(1500);

    // Screen 2.4: Day 4 - Willingness Values
    console.log('  2.4: Day 4 - Willingness Values');
    await page.waitForTimeout(1500);
    // Click tasks to prioritize
    await page.click('text=Cook dinner together');
    await page.waitForTimeout(800);
    await page.click('text=Give a massage');
    await page.waitForTimeout(800);
    await page.click('text=Listen actively');
    await page.waitForTimeout(1500);
    await page.click('button:has-text("Continue to Day 5")');
    await page.waitForTimeout(1500);

    // Screen 2.5: Day 5 - Benchmarks
    console.log('  2.5: Day 5 - Benchmarks');
    await page.waitForTimeout(1500);
    await page.fill('textarea', 'I would love if we could have one tech-free dinner together each week where we really talk and connect.');
    await page.waitForTimeout(1000);
    await page.click('input[type="checkbox"]'); // Check understanding
    await page.waitForTimeout(1000);
    await page.click('button:has-text("Continue to Day 6")');
    await page.waitForTimeout(1500);

    // Screen 2.6: Day 6 - Small Branches
    console.log('  2.6: Day 6 - Small Branches');
    await page.waitForTimeout(1500);
    await page.selectOption('select.input-field', 'massage'); // Select slot 1
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

    // Screen 2.7: Day 7 - Willing Commitment
    console.log('  2.7: Day 7 - Willing Commitment');
    await page.waitForTimeout(1500);
    await page.fill('textarea', 'I commit to helping with dishes after dinner at least 4 times this week, making it easier for us both.');
    await page.waitForTimeout(1000);
    await page.click('input[type="checkbox"]');
    await page.waitForTimeout(1000);
    await page.click('button:has-text("Confirm Commitment")');
    await page.waitForTimeout(1500);

    // Screen 2.8: Day 8 - Practice Session
    console.log('  2.8: Day 8 - Practice Session');
    await page.waitForTimeout(1500);
    await page.click('input[type="checkbox"]'); // Practice checkbox
    await page.waitForTimeout(1000);
    await page.fill('textarea', 'I will do this right after dinner each night. I will set a phone reminder at 6:30pm to help me remember.');
    await page.waitForTimeout(1000);
    await page.click('button:has-text("Continue to Day 9")');
    await page.waitForTimeout(1500);

    // Screen 2.9: Day 9 - Guessing Game
    console.log('  2.9: Day 9 - Guessing Game');
    await page.waitForTimeout(2000);
    await page.click('text=Cook dinner'); // First guess
    await page.waitForTimeout(1000);
    await page.click('button:has-text("Make My Guess")');
    await page.waitForTimeout(2000); // Wait for alert and auto-advance

    // Screen 2.10: Day 10 - Completion
    console.log('  2.10: Day 10 - Completion');
    await page.waitForTimeout(2000);
    await page.click('input[type="checkbox"]'); // Ready checkbox
    await page.waitForTimeout(1500);
    await page.click('button:has-text("Start My WillingTree Journey")');
    await page.waitForTimeout(2000);

    // ========== STEP 3: DASHBOARD ==========
    console.log('  3.1: Dashboard (Final)');
    await page.waitForTimeout(3000); // Show final dashboard

    console.log('\\n✅ Recording complete!\\n');
    console.log('📹 Saving video...');

    // Close browser to finalize video
    await context.close();
    await browser.close();

    console.log('✨ Done! Video saved to: videos/');
    console.log('\\n💡 You can now find the .webm video file in the videos/ folder');
}

// Run the recording
recordDemoFlow().catch(error => {
    console.error('❌ Error during recording:', error);
    process.exit(1);
});
