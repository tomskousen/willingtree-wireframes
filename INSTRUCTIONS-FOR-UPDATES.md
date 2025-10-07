# Instructions for Updating WillingTree Demos

## Quick Start Prompt for Claude Code

Copy and paste this prompt into Claude Code, filling in the [CHANGES NEEDED] section:

---

**Prompt Template:**

```
I need you to update the WillingTree interactive demo and record a new video.

REPOSITORY: willingtree-wireframes

CURRENT VERSION: v2 (recommended version with step/substep naming)

CHANGES NEEDED:
[Describe what you want changed, for example:]
- Update screen 2.5 (Day 5 - Benchmarks) to include a dropdown for frequency selection
- Change the button text on screen 1.3 from "Continue" to "Get Started"
- Add a new screen 2.11 for bonus content after Day 10
- Adjust the color scheme to use darker green (#2E7D32 instead of #4CAF50)

STEPS TO COMPLETE:
1. Navigate to the v2/ directory
2. Read v2/index.html to understand the current implementation
3. Make the requested changes to v2/index.html
4. Update v2/recorder.js if new screens were added or navigation changed
5. Test the changes by opening v2/index.html in a browser
6. Record a new demo video using: node v2/recorder.js
7. Save the new video to videos/ with descriptive filename
8. Update v2/README.md to document what changed
9. Show me a summary of all changes made

IMPORTANT:
- Preserve the step/substep naming convention (1.1, 2.5, etc.)
- Keep all content within 667px viewport height (no scrolling)
- Maintain the ruthless reduction design principle
- Test that all interactive elements still work
```

---

## Example Prompts for Common Updates

### Example 1: Add a New Screen

```
I need you to update the WillingTree interactive demo and record a new video.

REPOSITORY: willingtree-wireframes
CURRENT VERSION: v2

CHANGES NEEDED:
Add a new screen 2.11 called "Day 11: Partner Invitation" that:
- Shows after Day 10 completion
- Has a form to enter partner's email
- Includes a "Send Invitation" button
- Has a "Skip for Now" option that goes to dashboard (3.1)

Complete all 9 steps including recording a new video.
```

### Example 2: Update Existing Content

```
I need you to update the WillingTree interactive demo and record a new video.

REPOSITORY: willingtree-wireframes
CURRENT VERSION: v2

CHANGES NEEDED:
Update screen 2.1 (Day 1 - Bonding Styles):
- Add a 5th bonding style: "Sun" with emoji ☀️ and trait "Energizing"
- Update the grid from 2x2 to 3x2 layout
- Add description: "You bring warmth and positive energy to relationships"

Complete all 9 steps including recording a new video.
```

### Example 3: Visual/Style Updates

```
I need you to update the WillingTree interactive demo and record a new video.

REPOSITORY: willingtree-wireframes
CURRENT VERSION: v2

CHANGES NEEDED:
Update the color scheme across all screens:
- Primary green: Change from #4CAF50 to #2E7D32 (darker)
- Headers: Add subtle gradient from #2E7D32 to #1B5E20
- Selected cards: Use #C8E6C9 background instead of #E8F5E9
- Update all hover states to match new color scheme

Complete all 9 steps including recording a new video.
```

### Example 4: Content Reduction

```
I need you to update the WillingTree interactive demo and record a new video.

REPOSITORY: willingtree-wireframes
CURRENT VERSION: v2

CHANGES NEEDED:
Simplify screen 2.2 (Day 2 - Tree Metaphor) to fit better:
- Reduce the 4 metaphor explanations to just emoji + title + 1 sentence each
- Remove the "I understand" checkbox (not needed)
- Add more whitespace between items
- Ensure everything fits within 600px content height

Complete all 9 steps including recording a new video.
```

## Advanced: Multi-Screen Updates

For complex changes affecting multiple screens:

```
I need you to update the WillingTree interactive demo and record a new video.

REPOSITORY: willingtree-wireframes
CURRENT VERSION: v2

CHANGES NEEDED:
Reorganize the onboarding to be 7 days instead of 10:
- Combine Days 1-2 into single screen 2.1 (Bonding + Tree Metaphor)
- Combine Days 7-8 into single screen 2.6 (Commitment + Practice)
- Remove Day 3 (Commitment) - merge into Day 2
- Update all "Day X of 10" badges to "Day X of 7"
- Update navigation labels in sidebar
- Adjust recorder.js to match new flow

Complete all 9 steps including recording a new video.
```

## Tips for Best Results

1. **Be Specific**: Describe exactly what you want changed, including:
   - Which screen (use step/substep numbers like 2.5)
   - What elements to add/remove/modify
   - Exact text, colors, or layout changes

2. **Reference Existing Patterns**: Mention similar screens as examples:
   - "Make it look like screen 2.1 but for X instead"
   - "Use the same card layout as screen 1.3"

3. **State Constraints**:
   - "Must fit within viewport height without scrolling"
   - "Keep form validation pattern (text + checkbox)"
   - "Maintain current navigation structure"

4. **Test First**: Always ask Claude to test the changes before recording:
   - "Open in browser and verify all buttons work"
   - "Check that navigation flows correctly"

5. **Document Changes**: Request updates to README:
   - "Update v2/README.md with what changed"
   - "Add version note: v2.1 - Added partner invitation"

## Troubleshooting

If the video recording fails:
```
The video recording failed. Please:
1. Check that Playwright is installed (npm install -D playwright)
2. Check that Chromium is installed (npx playwright install chromium)
3. Verify the file path in recorder.js is correct
4. Try running manually: cd v2 && node recorder.js
5. Check the console output for specific errors
```

If changes don't show in browser:
```
The changes aren't showing. Please:
1. Hard refresh the browser (Cmd+Shift+R on Mac)
2. Clear browser cache
3. Verify the file was actually saved
4. Check for JavaScript errors in browser console
```

## File Locations Quick Reference

- **V2 Demo**: `v2/index.html`
- **V2 Recorder**: `v2/recorder.js`
- **Videos**: `videos/`
- **Documentation**: `v2/README.md`
- **Main README**: `README.md`

## After Updates

Remember to:
1. ✅ Test the demo in browser
2. ✅ Record new video
3. ✅ Update documentation
4. ✅ Commit changes to git
5. ✅ Push to GitHub if sharing with team
