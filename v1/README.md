# WillingTree Demo Video Recorder

This script automatically walks through your WillingTree demo and records it as a video.

## Quick Start

```bash
# 1. Install Playwright
npm install -D playwright

# 2. Install browser
npx playwright install chromium

# 3. Run the recorder
node willingtree-demo-recorder.js
```

## What It Does

The script will:
1. ✅ Open your demo in a browser (1400x900 viewport)
2. ✅ Walk through the complete onboarding flow
3. ✅ Fill in forms with realistic data
4. ✅ Click through all 10 days of onboarding
5. ✅ Add natural pauses for watchability
6. ✅ Save the video to `videos/` folder

## Recorded Flow

- **1A**: Welcome → Sign Up
- **1B**: Profile (Sarah Johnson, birthdate, gender)
- **1B2**: Pairing Choice → Solo Mode
- **2A**: Day 1 - Bonding Style (Stone)
- **2B**: Day 2 - Tree Metaphor
- **2C**: Day 3 - Commitment (Dedicated)
- **2D**: Day 4 - Willingness Values
- **2E**: Day 5 - Benchmarks
- **2F**: Day 6 - Small Branches
- **2G**: Day 7 - Willing Commitment
- **2H**: Day 8 - Practice Session
- **2I**: Day 9 - Guessing Game
- **2J**: Day 10 - Completion
- **1C**: Dashboard (final)

## Customization

### Change speed
Edit `slowMo` value (line 21):
```javascript
slowMo: 500 // milliseconds between actions
```

### Change viewport size
Edit `viewport` (line 23):
```javascript
viewport: { width: 1920, height: 1080 } // Full HD
```

### Run headless (background)
Edit `headless` (line 20):
```javascript
headless: true // No visible browser window
```

## Output

- **Format**: WebM video
- **Location**: `./videos/`
- **Quality**: Full resolution (matches viewport)

## Convert to MP4 (Optional)

If you need MP4 instead of WebM:

```bash
# Install ffmpeg
brew install ffmpeg

# Convert
ffmpeg -i videos/*.webm willingtree-demo.mp4
```

## Alternative: Manual Recording

If you prefer to record manually:

1. **macOS**: Use QuickTime Player → File → New Screen Recording
2. **Windows**: Use Xbox Game Bar (Win + G)
3. **Chrome Extension**: Use "Loom" or "Screencastify"

Then just click through the demo yourself!

## Tips

- The script adds `waitForTimeout()` calls to make the video watchable
- Adjust these values if you want slower/faster playback
- Video records at 25fps by default
- File size: ~5-10MB per minute

## Troubleshooting

**Video not saving?**
- Make sure the script completes (watch for "Done!" message)
- Video finalizes when browser closes

**Browser not opening?**
- Run `npx playwright install chromium` again
- Check that the HTML file path is correct

**Want a different flow?**
- Edit the script to click different options
- Remove sections you don't want to demo
- Add more pauses for specific screens

---

**Pro tip**: You can also use Playwright's built-in codegen to record custom flows:
```bash
npx playwright codegen file:///path/to/willingtree-full-demo.html
```

This opens a browser and records your clicks into code!
