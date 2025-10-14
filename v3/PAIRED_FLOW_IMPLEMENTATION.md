# Paired Flow Implementation Plan (5.1.4-5.1.6)

## Current Status
- ✅ 5.1.1 Fixed (added createHeaderWithTrack)
- ⏳ 5.1.4-5.1.6 Need complex data flow

## Required Implementation

### 5.1.4 (Fertilize - Big Branch)

**Current Behavior**: Both partners see fertilize screen simultaneously

**Needed Behavior**:
1. Both partners allocate 12 points across their own popular want lists
2. When one finishes, show "Waiting for partner..." message
3. When BOTH finish, each sees their PARTNER'S Big Branch list:
   - Partner's items sorted by points allocated
   - Bottom 5 items removed
   - Top items become "Big Branch" (curated list)

**Data Structure Needed**:
```javascript
myData: {
  fertilizeAllocations: {item1: 3, item2: 5, ...},
  bigBranchList: ['item1', 'item2', ...], // top items, bottom 5 removed
  fertilizeComplete: true
}

partnerData: {
  fertilizeAllocations: {...},
  bigBranchList: [...],
  fertilizeComplete: true
}
```

**Implementation Steps**:
1. Modify Day6SmallBranchesScreen to:
   - Save `fertilizeComplete: true` when user finishes
   - Check if `partnerData.fertilizeComplete === true`
   - If both complete, calculate Big Branch (remove bottom 5)
   - Show partner's Big Branch list (read-only view)

### 5.1.5 (Lottery/Watering Branch)

**Current Behavior**: User works on their own list

**Needed Behavior**:
1. Show PARTNER'S lottery 6 items (from their Big Branch)
2. User selects 2 "service items" from partner's list
3. Save these 2 choices as "Willing List" (Small Branch)
4. Partner does NOT see what was chosen yet

**Data Structure**:
```javascript
myData: {
  lottery6: ['item1', 'item2', ...], // from partner's Big Branch
  chosen2Services: ['item1', 'item2'] // what I chose from partner's list
}

partnerData: {
  lottery6: [...],
  chosen2Services: [...] // what they chose from MY list
}
```

**Implementation Steps**:
1. Level1WateringBranchScreen needs to:
   - Display partnerData.lottery6 (not my list)
   - Allow selection of 2 items
   - Save to myData.chosen2Services
   - Do NOT reveal to partner

### 5.1.6 (Good Fruits/Guessing)

**Current Behavior**: Partner guesses

**Needed Behavior**:
1. Show YOUR ORIGINAL 6 lottery items (not partner's)
2. Guess which 2 items your partner chose from YOUR list
3. Submit guesses
4. Show comparison:
   - What partner actually chose: `partnerData.chosen2Services`
   - What you guessed they chose: `myData.guesses`
   - Highlight matches and mismatches

**Data Structure**:
```javascript
myData: {
  lottery6: [...], // MY original 6
  guesses: ['item1', 'item2'], // what I think partner chose from my list
  revealResults: true
}

partnerData: {
  chosen2Services: [...] // what they actually chose from my list
}
```

**Implementation Steps**:
1. Day9GuessRevealScreen needs to:
   - Display myData.lottery6 (MY items, not partner's)
   - Allow guessing 2 items
   - Save to myData.guesses
   - Show comparison with partnerData.chosen2Services
   - Highlight correct/incorrect guesses

## Technical Challenges

### Challenge 1: Synchronization
**Problem**: How do we know when BOTH partners have finished 5.1.4?
**Solution**: Check `myData.fertilizeComplete && partnerData.fertilizeComplete`

### Challenge 2: Data Flow
**Problem**: Each person needs to see their partner's data, not their own
**Solution**: Swap data references:
- In 5.1.4: Show `partnerData.bigBranchList`
- In 5.1.5: Show `partnerData.lottery6`
- In 5.1.6: Show `myData.lottery6` but compare with `partnerData.chosen2Services`

### Challenge 3: Component Modifications
**Problem**: Components currently assume user works on their own data
**Solution**: Pass `showPartnerData={true}` prop to flip the data source

## Estimated Implementation Time
- 5.1.4 modifications: 45 minutes
- 5.1.5 modifications: 30 minutes
- 5.1.6 modifications: 45 minutes
- Testing: 30 minutes
**Total**: ~2.5 hours

## Recommendation
This is complex and requires careful data flow management. Suggest:
1. Implement 5.1.4 first and test thoroughly
2. Then implement 5.1.5 and test
3. Finally implement 5.1.6
4. Test the complete flow

Should I proceed with full implementation, or would you like to review/adjust this plan first?
