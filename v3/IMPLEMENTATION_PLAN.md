# Gamification Redesign - Implementation Plan

## COMPLETED ✓
- [x] Added `soil` to credits state
- [x] Updated CreditsDisplay component to show fractions (earned/max)
- [x] Mapped screens to credit types in CreditsDisplay

## IN PROGRESS
- [ ] Update profile screen (1.2) to award 1 water credit

## NEXT STEPS

### Phase 1: Update Screen Credit Awards

1. **Screen 2.1.1 - Preparing the Dirt** (3 soil credits)
   - Change title from "Gardening Basics" to "Preparing the Dirt"
   - Track link clicks: +1 soil for Gottman link, +1 soil for Getting the Love You Want link
   - +1 soil for making selections
   - Pass `earnedThisScreen` state to CreditsDisplay

2. **Screen 2.1.2 - A Little Sunshine** (5 sun + 1 water)
   - Change title from "Preparing Good Soil" to "A Little Sunshine"
   - Award 1 sun per filled item (max 5)
   - Award 1 water for choosing Me/Us path (this happens on same screen)
   - Update CreditsDisplay to show sun credits

3. **Screen 2.1.3 - Budding/Pollinate** (2 water)
   - Keep title
   - Award 2 water for completing willingness scoring
   - Update CreditsDisplay

4. **Screen 2.1.4 - Fertilize** (up to 20 sun)
   - Keep title
   - Award 1 sun per item rated (20 items total)
   - **INTERRUPT at 5 ratings**: Check if user has 5 sun + 2 water
   - Show Growth purchase modal
   - Allow customization purchase, then continue with remaining ratings

### Phase 2: Growth Purchase Modal

Create modal component that shows:
```
🌳 Growth Opportunity!

You've earned enough credits to grow!

Cost: 5☀️ + 2💧 = 1🌳

Your Credits:
☀️ Sun: 5
💧 Water: 3
🌱 Soil: 3

This Growth unlocks customization:
Replace 3 actions from the Want list with
your own personalized actions.

[Purchase Growth & Customize] [Continue Rating]
```

### Phase 3: Customization Flow

When "Purchase Growth & Customize" clicked:
1. Deduct 5 sun + 2 water
2. Award 1 growth
3. Show customization interface (3 swaps)
4. After customization, return to 2.1.4 to finish remaining ratings

### Phase 4: Harvest Screen Updates

Update harvest screens to:
- Show TOTAL credits earned
- Show unlocks based on harvest number:
  - 1st: Referrals + Customization (2nd round)
  - 2nd: Partnerable memberships
  - 3rd: Graduation message

### Phase 5: Graduation Flow

On 3rd harvest completion:
- Remove gamification UI
- Show message: "You are now participating fully unprotected. Be careful with each other."
- Continue without credit tracking

## Files to Update

1. `/v3/index.html` (main file)
   - CreditsDisplay component ✓
   - ProfileScreen - add awardCredits
   - Day1BondingScreen (2.1.1) - title, soil credits, link tracking
   - Day2TreeMetaphorScreen (2.1.2) - title, sun/water credits
   - Level1BuddingPollinateScreen (2.1.3) - water credits
   - Day6SmallBranchesScreen (2.1.4) - sun per rating, Growth interrupt
   - HarvestScreen - totals display, unlocks
   - Add GrowthPurchaseModal component
   - Add GraduationModal component

## Testing Checklist

- [ ] Profile completion awards 1 water
- [ ] 2.1.1 awards 3 soil (1 selection + 2 links)
- [ ] 2.1.2 awards 5 sun + 1 water
- [ ] 2.1.3 awards 2 water
- [ ] 2.1.4 awards 1 sun per rating
- [ ] Growth modal appears after 5 ratings in 2.1.4
- [ ] Customization works after Growth purchase
- [ ] Harvest screens show totals
- [ ] 1st harvest unlocks referrals
- [ ] 2nd harvest unlocks memberships
- [ ] 3rd harvest shows graduation

## Current Status

**Completed**: Credit state structure, CreditsDisplay component
**Next**: Update ProfileScreen to award water credit on completion
