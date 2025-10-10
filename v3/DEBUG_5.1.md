# Debugging 5.1.2 and 5.1.3 Issues

## Issue 1: 5.1.2 not moving to 5.1.3
**Status**: FIXED
- Updated `Day2TreeMetaphorScreen` to call `goToNext('1.3')` instead of `goToNext()`
- This now correctly routes: 5.1.2 → 5.1.3

## Issue 2: 5.1.3 not loading the whole list

### What Should Happen:
1. Screen loads with title "Budding, Pruning"
2. Shows either "What Women Want" or "What Men Want" based on user gender
3. Displays **20 items** with scoring buttons (1-5) for each
4. Button "Continue to Pollinate" is disabled until all 20 items are scored
5. After scoring all items, clicking button moves to Step 2 (Pollinate review)
6. Step 2 shows top 12 items and "Send to Partner" button
7. Clicking "Send to Partner" navigates to 5.1.4

### Possible Causes:

#### Cause 1: Gender not set in formData
**Test**: Open browser console and type:
```javascript
console.log('My gender:', formData?.gender);
console.log('Partner gender:', partnerData?.gender);
```

**Expected**: Should show 'male' or 'female'
**If shows undefined**: Gender was not captured during profile setup

#### Cause 2: Screen content overflow
**Test**: In the screen, try scrolling down within the screen content area
**If can't scroll**: CSS issue with fixed height

#### Cause 3: List not rendering
**Test**: Open browser console and type:
```javascript
// Check if the list is being generated
const listToShow = formData?.gender === 'male' ? womenWantList : menWantList;
console.log('List length:', listToShow?.length);
console.log('List items:', listToShow);
```

### Quick Fixes to Try:

1. **Check browser console for errors**
   - Press F12
   - Look for red error messages
   - Share any errors you see

2. **Try scrolling**
   - The list might be there but cut off
   - Try scrolling within the white content area

3. **Check current screen value**
   ```javascript
   console.log('Current screen:', currentScreen);
   ```
   Should show: `5.1.3` or `paired-level1-screen3`

4. **Force reload**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Clear browser cache

### What to Check in the UI:

- [ ] Do you see "Lvl 1 - 3" badge at top?
- [ ] Do you see "Budding, Pruning" header?
- [ ] Do you see "Score each item 1-5..." text?
- [ ] Do you see "What Women Want" or "What Men Want" in bold?
- [ ] How many items do you see (count the gray boxes)?
- [ ] Do you see scoring buttons 1 2 3 4 5 next to each item?
- [ ] Is the "Continue to Pollinate" button visible at bottom?

### Expected Screen Layout:
```
┌────────────────────────────────────┐
│ Lvl 1 - 3                          │
│ Budding, Pruning                   │
│ Credits: ☀️ X 💧 Y 🌱 Z            │
├────────────────────────────────────┤
│ Score each item 1-5, where 5       │
│ means you're most willing...       │
│                                    │
│ What Women Want (or Men Want)      │
│                                    │
│ ┌──────────────────────────────┐  │
│ │ Listen actively without...   │  │
│ │                    [1][2][3] │  │ ← Should have 5 buttons
│ │                       [4][5] │  │
│ └──────────────────────────────┘  │
│ ┌──────────────────────────────┐  │
│ │ Plan thoughtful dates...     │  │
│ │                    [1][2][3] │  │
│ │                       [4][5] │  │
│ └──────────────────────────────┘  │
│                                    │
│ ... (18 more items) ...            │ ← Should be scrollable
│                                    │
│ [Continue to Pollinate] (disabled) │
├────────────────────────────────────┤
│ Budding means growing what works...│
└────────────────────────────────────┘
```

### If Still Not Working:

Please provide:
1. Screenshot of what you see on 5.1.3
2. Any error messages from browser console (F12)
3. Output from these console commands:
   ```javascript
   console.log('formData:', formData);
   console.log('partnerData:', partnerData);
   console.log('currentScreen:', currentScreen);
   ```
