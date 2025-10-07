# WillingTree Gamification Implementation Plan

## ✅ COMPLETED (Part C)

### 1. Credits Display Banner
- **Status**: ✅ Done
- **Location**: Top of every screen in phone frame
- **Shows**: ☀️ Sun, 💧 Water, 🌱 Growth credits

### 2. Harvest Screen (2.10)
- **Status**: ✅ Done
- **Features**:
  - Shows total credits breakdown
  - **Option 1**: 50% Friend Referral (100 credits) → Restart at 2.2
  - **Option 2**: Upgrade to Working Together paired mode (200 credits) → Go to 3.1
  - **Option 3**: Continue Growing (if < 100 credits) → Restart at 2.2

---

## 🔄 REMAINING WORK

### Phase 1: Credit Awards System (Next Step)

Each screen needs to award credits when the user completes it and clicks "Continue". Here's the breakdown:

#### Sun Credits (☀️ - Things Seen/Awareness)
| Screen | Activity | Credits |
|--------|----------|---------|
| 2.1 | Tree Choice - Learn bond type | 5 ☀️ |
| 2.9 | Identify Good Fruits | 2-10 ☀️ (already done!) |

#### Water Credits (💧 - Things Done/Actions)
| Screen | Activity | Credits |
|--------|----------|---------|
| 2.2 | Preparing Good Soil - List partner actions | 5 💧 |
| 2.3 | Hope - List your actions | 5 💧 |
| 2.4 | Budding, Pruning - Score behaviors | 5 💧 |
| 2.5 | Pollinate - Send list to partner | 5 💧 |
| 2.7 | Willing List, Watering - Commit to 2 actions | 10 💧 |
| 2.8 | Small Branch Grows - Practice actions | 10 💧 |

#### Growth Credits (🌱 - Big Iterations)
| Screen | Activity | Credits |
|--------|----------|---------|
| 2.6 | Fertilize - Partner allocates points | 10 🌱 |

#### Cycle Completion Bonus
- When reaching 2.10 for the first time each cycle: **+25 🌱**

**Total per cycle**: ~55 💧 + 15 ☀️ + 35 🌱 = **~105 credits**

### Implementation Steps for Credit Awards:

1. **Update each Day screen function signature**:
   ```javascript
   function Day1BondingScreen({ setScreen, awardCredits }) {
   ```

2. **Award credits in the "Continue" button handler**:
   ```javascript
   const handleContinue = () => {
       awardCredits('sun', 5); // Award appropriate type and amount
       setScreen('2.2'); // Move to next screen
   };
   ```

3. **Update switch statement** in WillingTreeApp to pass `awardCredits`:
   ```javascript
   case 'day-1':
       return <Day1BondingScreen setScreen={setCurrentScreen} awardCredits={awardCredits} />;
   ```

---

### Phase 2: Timer System for Turnarounds

Screens where partner interaction happens and we need timers:

#### 2.5 → 2.6 Turnaround
- **2.5 Pollinate**: User sends top 12 items to partner
- **Waiting state**: "Waiting for partner to fertilize..."
- **2.6 Fertilize**: Partner allocates 12 points among items
- **Timer**: 3 days max (in demo: show countdown or "partner pending")

#### 2.8 → 2.9 Turnaround
- **2.8 Small Branch**: User practices 2 chosen actions
- **Waiting state**: "Partner is practicing their actions..."
- **2.9 Identify Fruits**: Partner guesses which actions you focused on
- **Timer**: 3 days for practice period

**Implementation needs**:
- Add `partnerStatus` state tracking
- Add visual "waiting for partner" screens
- Add countdown timer component
- In demo: simulate partner completion or allow manual progression

---

### Phase 3: Working Together (Paired Mode)

After user spends 200 credits on "Upgrade to Working Together", they enter paired mode where:

#### Key Differences in Paired Mode:
1. **Both users progress simultaneously** (but asynchronously)
2. **Real partner data exchange**:
   - 2.5: Each creates their own list → sends to partner
   - 2.6: Each receives partner's list → allocates points
   - 2.7: Each sees weighted items from their partner's allocation
   - 2.8: Each practices their 2 chosen items
   - 2.9: Each tries to guess partner's 2 items

#### Implementation Architecture:

##### Option A: Simulated Paired Mode (Demo)
- Create "User A" and "User B" tabs/views
- State syncs between them locally
- Shows the flow working for both people

##### Option B: Real Backend Integration
- WebSocket or polling for real-time sync
- Backend API to exchange lists, allocations, guesses
- User matching/pairing system
- Notification system for "your partner completed X"

**For V3 Demo**: Recommend Option A (simulated) to show the UX flow

---

## 📊 Credits Economy Summary

| Cycle Count | Total Credits | Can Afford |
|-------------|---------------|------------|
| 1 cycle | ~105 | 50% Referral ✓ |
| 2 cycles | ~210 | Working Together ✓ |
| 3+ cycles | 315+ | Both + surplus |

**Design Goal**:
- ✅ 1 cycle = referral code (encourage virality)
- ✅ 2 cycles = paired upgrade (encourage commitment)
- ✅ Surplus credits carry over (no waste, always progressing)

---

## 🎯 Next Immediate Steps

1. **Award credits on screens 2.1-2.8** (30 minutes)
   - Update function signatures
   - Add awardCredits calls in Continue buttons
   - Update switch statement to pass awardCredits

2. **Test full cycle 2.1 → 2.10** (15 minutes)
   - Verify credits accumulate correctly
   - Verify Harvest screen shows right totals
   - Verify restart/upgrade flows work

3. **Document paired mode spec** (30 minutes)
   - Design the UX for "User A" and "User B" views
   - Plan state management for paired data
   - Create mockup of partner waiting screens

4. **Implement paired mode** (2-3 hours)
   - Build dual-user simulation
   - Add partner data exchange
   - Add waiting/notification states

---

## 💡 Design Notes

### Why These Numbers?
- **100 for referral**: Achievable in 1 cycle, encourages sharing
- **200 for paired**: Requires 2 cycles, shows commitment before unlocking
- **Credits persist**: No penalty for continuing to grow

### Credit Type Philosophy
- **☀️ Sun (Awareness)**: Seeing, noticing, learning
- **💧 Water (Action)**: Doing, practicing, committing
- **🌱 Growth (Milestones)**: Big iterations, partner sync, completion

### User Psychology
- Early wins keep engagement (5 credits per step)
- Bigger rewards for harder actions (10 credits for commitment)
- Massive bonus for partner alignment (20 credits for perfect guess)
- Always show progress (banner always visible)

---

**Status**: Credits banner ✅ | Harvest screen ✅ | Credit awards ⏳ | Timers ⏳ | Paired mode ⏳
