# WillingTree Data Flow Testing Guide

## Overview
This guide helps you test the progression of Want/Need lists through the application to ensure data flows correctly from the pre-approved popular list → customized list → willing list.

## The Four List Stages

### 1. **Pre-Approved Popular Big Branch Want List**
- **Where**: Starts in the application as the default `defaultWantList`
- **When**: Used in screens 2.1.4 (Fertilize) and 5.1.4 (Fertilize - Paired)
- **What**: User allocates 18 points across these popular items
- **Test**: Open browser console and check for "Fertilize allocations saved"

### 2. **Big Branch Want/Needs List**
- **Where**: Generated from fertilize allocations (top 6 weighted items)
- **When**: Screen 2.1.4 slot machine selects top 6 items based on point allocation
- **Storage**: Saved to `myData.fertilizeAllocations`
- **Test**: After pulling slot machine lever, check console for "🎰 JACKPOT! The slot machine has selected 6 items"

### 3. **Customized Big Branch Wants/Needs List**
- **Where**: Screen 2.1.7 (Customize Wants) and 5.1.7 (Customize Wants - Paired)
- **When**: User spends 5 sun credits per customization to replace default items with personal ones
- **Storage**: Saved to `customizedWants` state
- **Test**: Customize at least 3 items, then check that they appear in later screens

### 4. **Small Branch Willing List**
- **Where**: Screens 2.2.3 (Binary Willing) and beyond
- **When**: Partner responds Yes/No to each Want/Need
- **Storage**: Yes responses saved to `myData.yesResponses`, No responses to `myData.noResponses`
- **Test**: These should be the customized items (if you customized any) or original top 6

## Step-by-Step Testing for Individual Path (Step 2)

### Screen 2.1.4 - Fertilize (Slot Machine)
1. Allocate 18 points across the Want list items
2. Click "🎰 Pull the Lever"
3. **Open browser console (F12)** and look for:
   ```
   Fertilize allocations saved to myData
   🎰 JACKPOT! The slot machine has selected 6 items...
   ```
4. Note which 6 items were selected (top weighted)

### Screen 2.1.7 - Customize Wants
1. Check that you have at least 15 sun credits (you should have 31-36 by this point)
2. Select items to replace from the default list
3. Enter custom Want text
4. Click "Customize This Want"
5. **In console**, check that `customizedWants` is being updated
6. Repeat for at least 3 customizations to test thoroughly

### Screen 2.2.3 - Binary Willing
1. **Verify**: The items shown should be your partner's customized items (if they customized) or their top 6 from fertilize
2. **In console**, type: `console.log(myData)` and check the structure
3. Look for `customizedWants` array with your custom items

### Screen 2.3.2 - Non-Attached Giving
1. **Verify**: The top 3 behaviors shown should come from YOUR customized wants
2. **In console**, check that `custom1`, `custom2`, `custom3` are being saved to myData

## Step-by-Step Testing for Paired Path (Step 5)

### Screens 5.1.1 - 5.1.7
Should function identically to 2.1.1 - 2.1.7, but:
- Data is saved to BOTH `myData` and `partnerData`
- Each person has their own `customizedWants`
- Use ViewToggle to switch between your view and partner view

### Key Differences in Paired Mode:
1. **5.1.4 (Fertilize)**: Both partners allocate points independently
2. **5.1.7 (Customize)**: Each partner can customize their own list
3. **Later screens**: Partner sees YOUR customized list, you see THEIRS

## Console Testing Commands

Open browser console (F12) and try these commands at different stages:

```javascript
// After 2.1.4/5.1.4 - Check fertilize allocations
console.log('My fertilize allocations:', myData?.fertilizeAllocations);

// After 2.1.7/5.1.7 - Check customized wants
console.log('My customized wants:', customizedWants);

// After 2.2.3 - Check willing/unwilling responses
console.log('My yes responses:', myData?.yesResponses);
console.log('My no responses:', myData?.noResponses);

// In paired mode - Check partner data
console.log('Partner data:', partnerData);
console.log('Partner customized wants:', partnerData?.customizedWants);
```

## Expected Data Flow Diagram

```
┌─────────────────────────────────┐
│ Default Want List (15+ items)   │
│ (hardcoded in app)              │
└────────────┬────────────────────┘
             │
             │ 2.1.4/5.1.4: Allocate 18 points
             ↓
┌─────────────────────────────────┐
│ Fertilize Allocations           │
│ (stored: myData.fertilizeAllocations) │
│ Slot machine selects top 6      │
└────────────┬────────────────────┘
             │
             │ 2.1.7/5.1.7: Spend sun credits (5 each)
             ↓
┌─────────────────────────────────┐
│ Customized Wants List (6 items) │
│ (stored: customizedWants)       │
│ Mix of original + custom items  │
└────────────┬────────────────────┘
             │
             │ 2.2.3: Partner responds Yes/No
             ↓
┌─────────────────────────────────┐
│ Willing List (Yes responses)    │
│ (stored: myData.yesResponses)   │
│ Small Branch Commitments        │
└─────────────────────────────────┘
```

## Common Issues to Check

### Issue: Customized items not appearing in later screens
- **Check**: Is `customizedWants` being passed to the right components?
- **Fix**: Verify props in routing (screens 2.2.x and 5.2.x should receive `customizedWants`)

### Issue: Partner seeing wrong list in paired mode
- **Check**: Are you using `myData` vs `partnerData` correctly?
- **Fix**: Partner should see YOUR customized wants, not their own

### Issue: Only seeing 3 items instead of 6
- **Check**: This is expected for screen 2.3.2 (top 3 for Non-Attached Giving)
- **Verify**: Those 3 should come from your customized list

## Success Criteria

✅ Screen 2.1.4: Top 6 items selected based on point allocation
✅ Screen 2.1.7: Can customize items, credits deducted correctly
✅ Screen 2.2.3: Partner sees customized items (if customized) or top 6
✅ Screen 2.3.2: Top 3 behaviors pulled from customized wants
✅ Paired mode: Both partners maintain separate customized lists
✅ Console shows correct data structure at each stage

## Quick Test Scenario

1. **Individual Path**:
   - Go through 2.1.1 - 2.1.3
   - At 2.1.4: Allocate all 18 points to just 3 items (makes it easy to track)
   - Pull lever, note which 6 are selected
   - At 2.1.7: Customize 3 of those items with obvious text like "CUSTOM1", "CUSTOM2", "CUSTOM3"
   - Continue to 2.2.3 and verify those custom items appear
   - At 2.3.2: Verify CUSTOM1, CUSTOM2, CUSTOM3 appear as top 3 behaviors

2. **Paired Path**:
   - Same as above but do it for both partners
   - Verify each partner sees the OTHER's customized list in willing screens
