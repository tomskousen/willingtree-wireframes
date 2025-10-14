# WillingTree Gamification - Final Implementation Plan

## Overview
This plan covers the remaining gamification features needed to complete the credit system, growth mechanics, and harvest unlocks. Each phase is broken into manual approval steps with Playwright testing.

---

## PHASE 1: Profile Water Credit (SIMPLEST - START HERE)

### Step 1.1: Add Water Credit to Profile Completion
**What**: Award 1 water credit when user completes profile (screen 1.2)

**Implementation**:
- Update `ProfileScreen` component to accept `awardCredits` prop
- Add water credit award on Continue button click
- Update routing to pass `awardCredits` to ProfileScreen
- Add CreditsDisplay to ProfileScreen showing 💧 0/1

**Files**: `v3/index.html` (ProfileScreen component + routing)

**Playwright Test**:
```javascript
test('Profile completion awards 1 water credit', async ({ page }) => {
  await page.goto('http://localhost:8080/index.html');
  await page.fill('#name', 'Test User');
  await page.fill('#email', 'test@example.com');
  await page.selectOption('#gender', 'male');
  await page.click('button:has-text("Continue")');

  // Check that 1 water credit was awarded
  const creditsDisplay = await page.locator('.credits-display');
  await expect(creditsDisplay).toContainText('💧 1/1');
});
```

**Approval Checkpoint**: User tests profile → 2.1.1 flow manually and verifies 1 water credit appears

---

## PHASE 2: Screen 2.1.3 Water Credits

### Step 2.1: Add Water Credits to Budding/Pollinate Screen
**What**: Award 2 water credits when user completes willingness scoring (screen 2.1.3)

**Implementation**:
- Update `Level1BuddingPollinateScreen` to track water credits earned
- Award 2 water when user clicks "Continue to Pollinate" (Step 1 → Step 2)
- Update CreditsDisplay to show 💧 0/2 during Step 1
- Update to 💧 2/2 when transitioning to Step 2

**Files**: `v3/index.html` (Level1BuddingPollinateScreen component)

**Playwright Test**:
```javascript
test('Screen 2.1.3 awards 2 water credits', async ({ page }) => {
  // Navigate to 2.1.3
  await navigateToScreen(page, '2.1.3');

  // Score all 20 items
  for (let i = 0; i < 20; i++) {
    await page.click(`button[data-item="${i}"][data-score="3"]`);
  }

  // Click Continue to Pollinate
  await page.click('button:has-text("Continue to Pollinate")');

  // Verify 2 water credits awarded
  const creditsDisplay = await page.locator('.credits-display');
  await expect(creditsDisplay).toContainText('💧 2/2');
});
```

**Approval Checkpoint**: User completes 2.1.3 and verifies 2 water credits awarded

---

## PHASE 3: Screen 2.1.4 Sun Credits & Growth Interrupt (MOST COMPLEX)

### Step 3.1: Add Sun Credit Tracking to 2.1.4
**What**: Award 1 sun credit per item rated in Fertilize screen (up to 20 sun total)

**Implementation**:
- Update `Day6SmallBranchesScreen` to track sun credits earned
- Award 1 sun per point allocated (not per item - 18 total allocations)
- Update CreditsDisplay to show ☀️ 0/18 and increment live as user allocates
- Track total sun credits awarded

**Files**: `v3/index.html` (Day6SmallBranchesScreen component)

**Note**: This is preparation for the Growth interrupt in Step 3.2

**Approval Checkpoint**: User allocates points in 2.1.4 and sees sun credits increment

---

### Step 3.2: Create GrowthPurchaseModal Component
**What**: Modal that appears when user has 5 sun + 2 water credits

**Implementation**:
- Create `GrowthPurchaseModal` component
- Display current credit totals
- Show cost: 5☀️ + 2💧 = 1🌳
- Two buttons: "Purchase Growth & Customize" and "Continue Later"
- On purchase: deduct 5 sun + 2 water, award 1 growth
- On "Continue Later": dismiss modal, allow user to finish allocations

**Files**: `v3/index.html` (new component before Day6SmallBranchesScreen)

**Approval Checkpoint**: User reviews modal UI/UX (test with fake trigger button)

---

### Step 3.3: Add Growth Interrupt Logic to 2.1.4
**What**: Trigger GrowthPurchaseModal when user reaches 5 sun credits

**Implementation**:
- In `Day6SmallBranchesScreen`, check if user has 5+ sun and 2+ water
- Show modal after 5th point allocation
- If user purchases: navigate to customization screen (existing 2.1.7)
- If user declines: allow them to continue allocating points
- After slot machine, if they have enough credits, show modal again

**Files**: `v3/index.html` (Day6SmallBranchesScreen component)

**Playwright Test**:
```javascript
test('Growth modal appears after 5 sun credits in 2.1.4', async ({ page }) => {
  // Navigate to 2.1.4 with 2 water credits already earned
  await navigateToScreen(page, '2.1.4');

  // Allocate 5 points
  for (let i = 0; i < 5; i++) {
    await page.click('button[data-action="allocate"][data-index="0"]');
  }

  // Verify modal appears
  const modal = await page.locator('.growth-purchase-modal');
  await expect(modal).toBeVisible();
  await expect(modal).toContainText('Growth Opportunity!');
  await expect(modal).toContainText('Cost: 5☀️ + 2💧');
});

test('Growth purchase deducts credits and navigates to customization', async ({ page }) => {
  // Setup: Get to modal state
  await triggerGrowthModal(page);

  // Click Purchase Growth
  await page.click('button:has-text("Purchase Growth & Customize")');

  // Verify navigation to 2.1.7 (customize screen)
  await expect(page.locator('h2')).toContainText('Customize Wants');
});
```

**Approval Checkpoint**: User goes through full 2.1.4 → Growth purchase → 2.1.7 flow

---

## PHASE 4: Harvest Screen Updates

### Step 4.1: Add Total Credits Display to HarvestScreen
**What**: Show accumulated credit totals at each harvest

**Implementation**:
- Update `HarvestScreen` component to display total credits
- Show: ☀️ Sun, 💧 Water, 🌱 Soil, 🌳 Growth
- Display prominently at top of harvest screen

**Files**: `v3/index.html` (HarvestScreen component)

**Approval Checkpoint**: User completes Level 1 and sees total credits at 2.1.7 harvest

---

### Step 4.2: Add Harvest Unlock Logic
**What**: Show different unlocks based on harvest number (1st, 2nd, 3rd)

**Implementation**:
- Track `cycleCount` (already exists in state)
- 1st Harvest (Level 1): Show "Unlocked: Referrals" + "Customization (2nd round)"
- 2nd Harvest (Level 2): Show "Unlocked: Partnerable Memberships" + "Book/Journal Discount"
- 3rd Harvest (Level 3): Show graduation message (see Phase 5)

**Files**: `v3/index.html` (HarvestScreen component)

**Playwright Test**:
```javascript
test('First harvest shows referral unlock', async ({ page }) => {
  await completeLevel1(page);

  const unlocks = await page.locator('.harvest-unlocks');
  await expect(unlocks).toContainText('Referrals');
  await expect(unlocks).toContainText('Customization');
});

test('Second harvest shows membership unlock', async ({ page }) => {
  await completeLevel1(page);
  await completeLevel2(page);

  const unlocks = await page.locator('.harvest-unlocks');
  await expect(unlocks).toContainText('Partnerable Memberships');
});
```

**Approval Checkpoint**: User completes Level 1, then Level 2, verifying different unlocks

---

## PHASE 5: Graduation Flow (3rd Harvest)

### Step 5.1: Create GraduationModal Component
**What**: Special modal that appears on 3rd harvest completion

**Implementation**:
- Create `GraduationModal` component
- Show message: "You are now participating fully unprotected. Be careful with each other."
- Include full graduation text from GAMIFICATION_REDESIGN.md
- On dismiss: remove gamification UI elements (credits display, badges)

**Files**: `v3/index.html` (new component)

**Approval Checkpoint**: User reviews graduation modal UI

---

### Step 5.2: Integrate Graduation into 3rd Harvest
**What**: Trigger graduation modal on Level 3 harvest completion

**Implementation**:
- In `Level3HarvestScreen`, check if `cycleCount === 3`
- Show `GraduationModal` instead of regular harvest unlocks
- Set flag in state: `hasGraduated: true`
- Hide CreditsDisplay on all future screens if graduated
- Continue normal flow but without gamification UI

**Files**: `v3/index.html` (Level3HarvestScreen + state management)

**Playwright Test**:
```javascript
test('Third harvest shows graduation modal', async ({ page }) => {
  await completeLevel1(page);
  await completeLevel2(page);
  await completeLevel3(page);

  const modal = await page.locator('.graduation-modal');
  await expect(modal).toBeVisible();
  await expect(modal).toContainText('participating fully unprotected');
  await expect(modal).toContainText('Be careful with each other');
});

test('After graduation, credit display is hidden', async ({ page }) => {
  await completeAllLevels(page);
  await page.click('button:has-text("Continue")'); // Dismiss graduation

  // Navigate to a screen that would normally show credits
  await navigateToScreen(page, '3.1'); // Dashboard

  const creditsDisplay = await page.locator('.credits-display');
  await expect(creditsDisplay).not.toBeVisible();
});
```

**Approval Checkpoint**: User completes all 3 levels and verifies graduation experience

---

## PHASE 6: Playwright Test Suite Setup

### Step 6.1: Install Playwright
```bash
cd /Users/skooz/AI/willingtree-wireframes/v3
npm init -y
npm install -D @playwright/test
npx playwright install
```

### Step 6.2: Create Test Structure
```
v3/
  tests/
    gamification.spec.js      (all gamification tests)
    navigation.spec.js        (basic screen navigation)
    helpers.js                (helper functions for common tasks)
  playwright.config.js
```

### Step 6.3: Create Helper Functions
```javascript
// helpers.js
export async function navigateToScreen(page, screenCode) {
  // Logic to navigate to specific screen
}

export async function completeLevel1(page) {
  // Complete all Level 1 screens
}

export async function fillProfile(page, name, email, gender) {
  // Fill profile form
}

export async function allocatePoints(page, allocations) {
  // Allocate points in 2.1.4
}
```

**Approval Checkpoint**: User reviews test structure and helper functions

---

## PHASE 7: Full End-to-End Test

### Step 7.1: Complete Journey Test
**What**: Single test that runs through entire user journey

**Playwright Test**:
```javascript
test('Complete gamification journey', async ({ page }) => {
  // 1. Profile completion → 1 water
  await page.goto('http://localhost:8080/index.html');
  await fillProfile(page, 'Test User', 'test@example.com', 'male');
  await expectCredits(page, { water: 1 });

  // 2. Screen 2.1.1 → 3 soil
  await completeScreen_2_1_1(page);
  await expectCredits(page, { water: 1, soil: 3 });

  // 3. Screen 2.1.2 → 5 sun + 1 water
  await completeScreen_2_1_2(page);
  await expectCredits(page, { water: 2, soil: 3, sun: 5 });

  // 4. Screen 2.1.3 → 2 water
  await completeScreen_2_1_3(page);
  await expectCredits(page, { water: 4, soil: 3, sun: 5 });

  // 5. Screen 2.1.4 → Growth interrupt
  await startScreen_2_1_4(page);
  await allocatePoints(page, 5);
  await expect(page.locator('.growth-purchase-modal')).toBeVisible();

  // 6. Purchase growth and customize
  await page.click('button:has-text("Purchase Growth")');
  await expectCredits(page, { water: 2, soil: 3, sun: 0, growth: 1 });

  // 7. Complete customization
  await customizeWants(page, 3);

  // 8. Complete Level 1 harvest
  await completeLevel1Harvest(page);
  await expect(page.locator('.harvest-unlocks')).toContainText('Referrals');

  // ... continue for Levels 2 and 3 ...

  // 9. Verify graduation
  await completeLevel3Harvest(page);
  await expect(page.locator('.graduation-modal')).toBeVisible();
});
```

**Approval Checkpoint**: User runs full E2E test and verifies all steps pass

---

## SUMMARY OF APPROVAL CHECKPOINTS

| Phase | Checkpoint | Test Type |
|-------|-----------|-----------|
| 1.1 | Profile water credit | Manual + Playwright |
| 2.1 | 2.1.3 water credits | Manual + Playwright |
| 3.1 | 2.1.4 sun tracking | Manual |
| 3.2 | Growth modal UI | Manual review |
| 3.3 | Growth interrupt flow | Manual + Playwright |
| 4.1 | Harvest totals display | Manual |
| 4.2 | Harvest unlock logic | Manual + Playwright |
| 5.1 | Graduation modal UI | Manual review |
| 5.2 | Graduation integration | Manual + Playwright |
| 6.3 | Test structure setup | Code review |
| 7.1 | Full E2E journey | Playwright |

---

## RECOMMENDED ORDER

1. **Phase 1**: Profile water credit (easiest, builds confidence)
2. **Phase 2**: Screen 2.1.3 water credits (medium complexity)
3. **Phase 3**: Screen 2.1.4 + Growth (most complex, broken into 3 steps)
4. **Phase 6**: Set up Playwright (parallel with Phase 3)
5. **Phase 4**: Harvest screens (depends on Phase 1-3 being done)
6. **Phase 5**: Graduation (final feature)
7. **Phase 7**: Full E2E test (validation)

---

## ESTIMATED TIME

- Phase 1: 30 minutes
- Phase 2: 30 minutes
- Phase 3: 2-3 hours (most complex)
- Phase 4: 1 hour
- Phase 5: 1 hour
- Phase 6: 1 hour (test setup)
- Phase 7: 30 minutes

**Total**: ~6-7 hours of implementation + testing

---

## RISK AREAS

1. **Growth interrupt timing**: When exactly should modal appear? After 5th allocation or after clicking a button?
2. **Credit persistence**: Need to ensure credits survive page refreshes (localStorage)
3. **Paired mode credits**: Do both partners earn credits independently?
4. **Growth customization**: Does purchasing growth immediately navigate to 2.1.7 or show inline customization?

**Questions to resolve before starting Phase 3**.
