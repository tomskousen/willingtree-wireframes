# Immediate Fixes Required

## 1. External Link Return Navigation (2.1.1)

**Problem**: When clicking external info links (Gottman, Getting the Love You Want), user should return to 2.1.1 with credit awarded.

**Current Behavior**: Links go to external pages with no return mechanism.

**Solution**:
- Add return link on external pages that navigates back to referring screen
- Store current screen in localStorage before navigation
- Award credit when returning from external link

**Files to modify**:
- `v3/index.html` - Day1BondingScreen component (link handling)
- `v3/four-horsemen.html` - Add return link
- `v3/getting-the-love-you-want.html` - Add return link

---

## 2. Scrolling Issue (2.1.3 and 5.1.3)

**Problem**: Cannot scroll down to see all 20 items in the list.

**Current Behavior**: List is cut off, items at bottom are not visible.

**Solution**:
- Ensure `.screen-content` has proper flex and overflow properties
- Verify button container doesn't push content out of view
- Test with 20 items visible and scrollable

**Files to modify**:
- `v3/index.html` - Level1BuddingPollinateScreen (verify structure)
- Possibly CSS for `.screen-content`

---

## 3. Track Names in Header Structure

**Problem**: Need to add track names to all screens across all 3 levels.

**7 Track Names** (same for all levels):
1. **Prepare the Mind**
2. **Appreciate**
3. **Boundaries**
4. **Curating Wants**
5. **Intention for Attention**
6. **Service**
7. **Renew**

**Screen to Track Mapping**:

### Level 1 (2.1.x)
- 2.1.1: Track 1 - Prepare the Mind
- 2.1.2: Track 2 - Appreciate
- 2.1.3: Track 3 - Boundaries
- 2.1.4: Track 4 - Curating Wants
- 2.1.5: Track 5 - Intention for Attention
- 2.1.6: Track 6 - Service
- 2.1.7: Track 7 - Renew

### Level 2 (2.2.x)
- 2.2.1: Track 1 - Prepare the Mind
- 2.2.2: Track 2 - Appreciate
- 2.2.3: Track 3 - Boundaries
- 2.2.4: Track 4 - Curating Wants
- 2.2.5: Track 5 - Intention for Attention
- 2.2.6: Track 6 - Service
- 2.2.7: Track 7 - Renew

### Level 3 (2.3.x)
- 2.3.1: Track 1 - Prepare the Mind
- 2.3.2: Track 2 - Appreciate
- 2.3.3: Track 3 - Boundaries
- 2.3.4: Track 4 - Curating Wants
- 2.3.5: Track 5 - Intention for Attention
- 2.3.6: Track 6 - Service
- 2.3.7: Track 7 - Renew

### Paired Mode (5.x.x) - Same pattern
- 5.1.1-5.1.7: Same tracks as Level 1
- 5.2.1-5.2.7: Same tracks as Level 2
- 5.3.1-5.3.7: Same tracks as Level 3

---

## 4. Header Layout Restructure

**Current Layout**:
```
┌─────────────────────────────────────┐
│ [Lvl X - Y]                         │
│ Screen Title                        │
│                         [Credits]   │
└─────────────────────────────────────┘
```

**New Layout**:
```
┌─────────────────────────────────────┐
│ Track Name (centered, top)          │
│ Screen Title      [Credits display] │
│ (left)                  (right)     │
└─────────────────────────────────────┘
```

**Implementation**:
- Remove `day-badge` div (Lvl X - Y)
- Add `track-name` div at top (centered)
- Move screen title and credits to same line
- Screen title on left, credits on right

**CSS Changes**:
```css
.track-name {
    background: #4CAF50;
    color: white;
    padding: 8px 16px;
    text-align: center;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;
    border-bottom: 1px solid #e0e0e0;
}

.header-row h2 {
    margin: 0;
    font-size: 18px;
}
```

**Component Changes**:
- Update `createHeader` function to accept track name
- Update all screen components to pass track name
- Update CreditsDisplay to render inline with title

---

## Implementation Order

1. **Fix scrolling issue** (2.1.3, 5.1.3) - Most urgent
2. **Add track names** to header structure
3. **Restructure header layout** (track name top, title/credits on same line)
4. **Fix external link navigation** (2.1.1)
5. **Test all changes** across all screens
6. **Commit and push**

---

## Track Name Helper Function

Add this to the app:

```javascript
function getTrackName(screenCode) {
    const tracks = {
        1: 'Prepare the Mind',
        2: 'Appreciate',
        3: 'Boundaries',
        4: 'Curating Wants',
        5: 'Intention for Attention',
        6: 'Service',
        7: 'Renew'
    };

    // Extract track number from screen code (2.1.3 → 3, 5.2.5 → 5)
    const parts = screenCode.split('.');
    if (parts.length >= 3) {
        const trackNum = parseInt(parts[2]);
        return tracks[trackNum] || '';
    }
    return '';
}
```
