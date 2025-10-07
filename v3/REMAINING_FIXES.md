# Remaining Fixes for Credits System

## ✅ Completed So Far:
1. Credit system logic: Water credits auto-add 2× to growth
2. CreditsDisplay component shows one credit type per screen in header
3. Screen 2.1: Fixed (awards 1 growth = 10 sun + 5 water)
4. Screen 2.2: Completely redesigned (5 text boxes, 1 sun each)

## 🔧 Still Need to Fix:

### Screen 2.3 - Hope (3 water credits)
- Remove "I understand" checkbox
- Change to 3 separate text boxes
- Award 1 water credit per filled box (3 total)
- Add CreditsDisplay to header

### Screen 2.4 - Budding/Pruning (1 growth credit)
- Keep current UI (scoring 1-5)
- Fix award: 1 growth = 10 sun + 5 water
- Add CreditsDisplay to header

### Screen 2.5 - Pollinate (sender: 1 water, partner: 5 sun)
- Sender gets 1 water credit
- Partner gets 5 sun credits
- Add CreditsDisplay to header

### Screen 2.6 - Fertilize (partner: 1 growth)
- **FIX UI**: Currently auto-assigns all points to one item
- Should allow distributing 12 points across items (e.g., 3+3+2+2+1+1)
- Award partner 1 growth = 10 sun + 5 water
- Add CreditsDisplay to header

### Screen 2.7 - Watering (2 water credits)
- Award 2 water credits (not 10)
- Add CreditsDisplay to header

### Screen 2.8 - Small Branch (2 water credits)
- Award 2 water credits (not 10)
- Add CreditsDisplay to header

### Screen 2.9 - Good Fruits (partner: 5 sun per correct, user: water = 1/2 points)
- **FIX UI**: Checkboxes should show as checked when selected
- Partner gets 5 sun per correct guess
- User gets water credits = 1/2 the points assigned to guessed behaviors
- Add CreditsDisplay to header

### Screen 2.10 - Harvest
- Update total calculation to match new credit economy
- Adjust thresholds if needed

## Credit Summary Per Cycle (Corrected):

| Screen | Type | Amount | Notes |
|--------|------|--------|-------|
| 2.1 | Growth | 1 | =10 sun +5 water |
| 2.2 | Sun | 1-5 | 1 per text box |
| 2.3 | Water | 1-3 | 1 per text box |
| 2.4 | Growth | 1 | =10 sun +5 water |
| 2.5 | Water/Sun | 1+5 | Sender:1 water, Partner:5 sun |
| 2.6 | Growth | 1 | Partner gets =10 sun +5 water |
| 2.7 | Water | 2 | Commitment |
| 2.8 | Water | 2 | Practice |
| 2.9 | Sun/Water | Var | Partner:5 sun×correct, User:water=½points |

**Estimated per cycle:**
- Sun: 5-10 (from 2.2, 2.5, 2.9)
- Water: 5-8 (from 2.3, 2.5, 2.7, 2.8, 2.9)
- Growth: 2-3 (from 2.1, 2.4, 2.6) = ~60-90 points

Note: Growth auto-accumulates as water×2 is earned throughout
