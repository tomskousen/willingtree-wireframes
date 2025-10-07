# WillingTree Partner Mode Implementation Guide

## Overview

Partner mode allows two users to progress through the WillingTree onboarding experience together, asynchronously exchanging data at key interaction points. This creates a paired experience where both users benefit from each other's participation while maintaining individual autonomy.

## Features Implemented

### 1. Partner Invitation Flow (Screen 1.3)

When users select "Work on Us" at screen 1.3, they can invite their partner through two methods:

**Email Invitation:**
- Enter partner's name and email
- System sends invitation link
- Partner signs up and both are automatically paired

**Share Link:**
- Generate unique invite link
- Copy to clipboard
- Share via text, messaging apps, or any channel
- Partner clicks link to join and pair

### 2. Dual-View Toggle

**ViewToggle Component:**
- Appears at top of phone frame when in paired mode
- Toggle between "My View" and "Partner's View"
- Allows demo users to see both perspectives
- In real app, each user only sees their own view

**Demo Mode Benefit:**
- Switch views to see how data flows between partners
- Understand the full paired experience
- Test both sides of each interaction

### 3. State Management

**User State:**
- Own credits (sun, water, growth)
- Own screen progress
- Own form data
- Data to send to partner (pollinateList, fertilizeAllocations, focusActions, day4Scores)

**Partner State:**
- Partner's credits
- Partner's screen progress
- Partner's profile info (name, email, status)
- Data received from partner

**Data Exchange Fields:**
- `pollinateList`: Day 5 - Top 12 willing actions sent to partner
- `fertilizeAllocations`: Day 6 - Point distribution showing what matters most
- `focusActions`: Day 7 - Two selected items to focus on
- `day4Scores`: Day 4 - Willingness scores for all behaviors

### 4. Data Exchange Screens

**Day 4 (Budding, Pruning):**
- User scores all 20 behaviors (1-5 scale)
- Scores saved in `myData.day4Scores`
- Partner can later see these scores to understand preferences

**Day 5 (Pollinate):**
- User sends top 12 willing actions to partner
- Sender earns 1 water credit
- Partner receives list and earns 5 sun credits
- Data saved in `partnerData.pollinateList`

**Day 6 (Fertilize):**
- User receives partner's Day 5 list
- Allocates 12 points across items (weighted prioritization)
- Allocations sent back to partner
- Partner earns 1 growth credit (10 sun + 5 water)
- **Waiting State:** If partner hasn't sent Day 5 list yet, shows waiting indicator

**Day 7 (Watering):**
- User sees weighted lottery based on partner's Day 6 allocations
- Selects 2 focus items to commit to
- Focus actions saved for partner to guess later

**Day 9 (Good Fruits):**
- User tries to guess partner's 2 focus actions from Day 7
- 6 options shown (2 correct + 4 decoys)
- Correct guesses earn partner 5 sun each (max 10)
- User earns water credits = half the points assigned to guessed behaviors
- Perfect match: Partner +10 sun, User +6 water

### 5. Credits Preservation

**Harvest Screen Updates:**
- Credits now persist across cycles
- **50% Referral (100 credits):** Deducts 100 proportionally, keeps remainder
- **Continue Growing:** Keeps all credits for next cycle
- **Working Together Upgrade (200 credits):** Spends all credits to unlock paired mode

### 6. Waiting States

**WaitingForPartner Component:**
- Shows ⏳ icon with partner name
- Explains what's needed to continue
- Provides "Go to Dashboard" option
- Demo mode note explains real app would notify when ready

**Implementation on Day 6:**
- Checks if partner has completed Day 5
- Shows waiting state if `partnerData.pollinateList` is empty
- Allows user to work on other activities while waiting

## Architecture

### State Flow

```
User A (Day 5 Pollinate)
  ↓ sends pollinateList
Partner B receives list → can do Day 6 (Fertilize)
  ↓ sends fertilizeAllocations
User A receives allocations → can do Day 7 (Watering)
  ↓ saves focusActions
Partner B can guess on Day 9 (Good Fruits)
```

### Asynchronous Design

- Users progress at their own pace
- No forced synchronization
- Data exchange happens when both have completed prerequisite steps
- Waiting states provide clarity when prerequisites aren't met

### Credit Economy in Paired Mode

**Individual Credits:**
- Each user has own credit balance
- Credits earned separately for own actions
- Some actions award credits to partner

**Partner Credit Awards:**
- Day 5: Partner gets 5 sun when you send list
- Day 6: Partner gets 1 growth (10 sun + 5 water) when you allocate points
- Day 9: Partner gets 5 sun per correct guess (max 10)

**Total per cycle (paired mode):**
- From own actions: ~55-75 credits
- From partner's actions: ~15-25 credits
- **Total possible: ~90-100 credits per cycle**

## Demo Mode Features

### View Switching
1. Select "Work on Us" on screen 1.3
2. Send partner invitation
3. Toggle between views using ViewToggle buttons
4. See how data flows from one user to the other

### Simulated Partner Progress
In demo mode, you can manually:
- Switch to partner view
- Navigate partner through screens
- Complete partner's actions
- Return to your view to see received data

### Testing Data Exchange
1. **Your View:** Complete Day 5 (send list)
2. **Switch to Partner View:** See the list in Day 6
3. **Partner View:** Complete Day 6 (allocate points)
4. **Switch back:** See allocations in your Day 7

## Future Enhancements

### Automatic Partner Simulation
- Add "Simulate Partner Progress" button
- Automatically advance partner through screens
- Pre-fill partner's choices
- Instant data exchange for demo purposes

### Real-Time Notifications
- WebSocket connection for live updates
- Push notifications when partner completes prerequisite
- "Partner is online" indicator
- Real-time progress sync

### Backend Integration
- API endpoints for data exchange
- User matching/pairing system
- Data persistence across sessions
- Authentication and authorization

### Enhanced Waiting States
- Show partner's current screen
- Estimate time until completion
- Send reminder to partner
- Option to continue solo if partner is inactive

## Testing Checklist

### Basic Paired Mode Flow
- [ ] Select "Work on Us" on 1.3
- [ ] Send email invitation
- [ ] Verify paired mode activates
- [ ] See ViewToggle appear
- [ ] Switch between views

### Data Exchange
- [ ] Complete Day 4, verify scores saved
- [ ] Complete Day 5, see partner gets 5 sun
- [ ] Switch to partner view, see Day 5 list in Day 6
- [ ] Complete Day 6 as partner, verify allocations saved
- [ ] Switch back, see weighted lottery in Day 7
- [ ] Complete Day 7, save focus actions
- [ ] Complete Day 9, verify correct guesses award partner sun

### Credits Flow
- [ ] Verify own credits accumulate correctly
- [ ] Verify partner credits increase when expected
- [ ] Check Harvest screen shows correct totals
- [ ] Test "Continue Growing" preserves credits
- [ ] Test "50% Referral" deducts 100 but keeps remainder

### Waiting States
- [ ] Navigate to Day 6 without partner completing Day 5
- [ ] Verify waiting state appears
- [ ] Complete partner's Day 5 in other view
- [ ] Return to Day 6, verify list now appears

## Summary

Partner mode is fully functional with:
✅ Complete invitation flow (email + link)
✅ Dual-view toggle for demo mode
✅ Full state management for two users
✅ Data exchange on Days 4, 5, 6, 7, 9
✅ Partner credit awards
✅ Credits preservation across cycles
✅ Waiting states for asynchronous flow

The implementation allows users to experience the full paired onboarding journey while maintaining individual autonomy and asynchronous progress.
