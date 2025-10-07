# WillingTree Demo V3 - Sketched SVG Icons

## What's New in V3

### 1. Sketched SVG Icons Replace Emojis

**Problem with V2:**
- Used emoji icons (🪨, 🌱, 🚿, 🌳) for metaphors
- Emojis render differently across devices/platforms
- No control over styling or visual consistency
- Doesn't match the hand-sketched wireframe aesthetic

**V3 Solution:**
- **Custom SVG Icons**: Replaced all metaphor emojis with actual SVG files
- **Consistent Design**: All icons have matching sketched/hand-drawn style
- **Subtle Backgrounds**: Each icon has an off-white background (#f5f5f0) with rounded corners
- **Better Branding**: Creates a cohesive visual identity for WillingTree

### 2. Icon Component

Added a reusable React `Icon` component that:
- Loads SVG files from `../images/` folder
- Accepts `type` and `size` props
- Maintains consistent styling across all screens
- Makes it easy to update icons in the future

### 3. Icon Mapping

| Metaphor | Old Emoji | New SVG Icon | File |
|----------|-----------|--------------|------|
| **Stone** (Steady) | 🪨 | Rock/stone sketch | `stone.svg` |
| **Soil** (Nurturing) | 🌱 | Seedling/plant growing | `seedling.svg` |
| **Shovel** (Action) | 🚿 | Hand-drawn shovel | `shovel.svg` |
| **Stakes** (Guiding) | 🌳 | Young tree with support | `young-tree.svg` |
| **Logo** | 🌳 | Tree with roots | `logo.svg` |

### 4. Where Icons Appear

**Updated Screens:**
- **1.1 Welcome**: Logo icon (tree with roots)
- **2.1 Day 1 Bonding Styles**: All 4 metaphor icons in selection grid
- **2.2 Day 2 Tree Metaphor**: Big Branch (young-tree), Small Branches (seedling)
- **3.1 Dashboard**: Big Branch card, Small Branches card

**Preserved Emojis:**
- Kept decorative emojis (💚, 🎁, 🎯, 🎉, ☀️, 🍃, 🍎) since they're not core metaphors

## Files

- `index.html` - Interactive demo with SVG icon support
- `recorder.js` - Playwright script updated for v3
- `README.md` - This file documenting V3 changes

## Running the Demo

### View in Browser
```bash
open index.html
```

### Record Demo Video
```bash
# Install dependencies (one time, from project root)
npm install -D playwright
npx playwright install chromium

# Record V3 demo (from v3 folder)
cd v3
node recorder.js
```

The video will be saved to `../videos/v3-demo.webm`

## Technical Implementation

### Icon Component Code
```javascript
function Icon({ type, size = 64 }) {
    const iconPath = `../images/${type}.svg`;
    return (
        <img
            src={iconPath}
            alt={type}
            style={{
                width: `${size}px`,
                height: `${size}px`,
                display: 'inline-block',
                verticalAlign: 'middle'
            }}
        />
    );
}
```

### Usage Examples
```jsx
// Welcome screen logo
<Icon type="logo" size={80} />

// Bonding style icons
<Icon type={style.icon} size={48} />
// where style.icon is 'stone', 'seedling', 'shovel', or 'young-tree'

// Dashboard cards
<Icon type="young-tree" size={20} />
<Icon type="seedling" size={20} />
```

## Design Rationale

### Jonathan Ivie-Inspired Selection

Following Jonathan Ivie's design philosophy of "ruthless reduction," each icon was selected for:

1. **Stone** - Simple, clear representation of obstacles
2. **Seedling** - Shows emergence and potential growth
3. **Shovel** - Hand-drawn tool conveys effort and work
4. **Young Tree** - Small tree on ground represents early stages
5. **Logo** - Tree with visible roots symbolizes foundation

All icons maintain a consistent hand-drawn aesthetic that aligns with the wireframe style.

### Visual Consistency

- All SVG icons include a subtle `#f5f5f0` background
- Rounded corners (`rx="10"`) create softer appearance
- Black line art on light background for clarity
- Icons scale perfectly at any size without pixelation

## Backward Compatibility

V3 maintains 100% feature parity with V2:
- ✅ Same screen flow (Step 1.1 through 5.5)
- ✅ Same step/substep naming convention
- ✅ Same no-scroll optimization (667px height)
- ✅ Same interactive functionality
- ✅ Only visual change: emojis → SVG icons

## Migration from V2

To update from V2 to V3:

1. **Copy icon files** to your project:
   ```bash
   cp -r images/ your-project/
   ```

2. **Add Icon component** (lines 408-423 in v3/index.html)

3. **Update bonding styles array** to use `icon` instead of `emoji`:
   ```javascript
   { icon: 'stone', name: 'Stone', ... }
   ```

4. **Replace emoji renders** with Icon component:
   ```jsx
   <Icon type="stone" size={48} />
   ```

## Next Steps

- ✅ All core metaphor icons converted to SVG
- 🎯 Consider adding SVG versions of remaining emojis (💚, 🎁, 🎯, etc.)
- 🎯 Add animation/transitions to icon appearances
- 🎯 Create alternate icon themes (color variants, minimal vs detailed)

---

**Created**: October 6, 2025
**Version**: 3.0
**Based on**: V2 (Step/Substep Organization)
**Key Change**: Emoji icons → Sketched SVG icons
