# WillingTree Gamification Redesign

## Credit Philosophy

### Three Credit Types

1. **☀️ Sun Credits** (Receiving)
   - Earned when: Making observations, giving appreciations, receiving from partner
   - Represents: Awareness, noticing, gratitude
   - Example: "I noticed you did X" or "I appreciate Y"

2. **💧 Water Credits** (Sending/Action)
   - Earned when: Taking actions, rendering services, doing willing behaviors
   - Represents: Active giving, serving, commitment
   - Example: Completing profile, choosing path, declaring willingness

3. **🌱 Soil Credits** (Insights/Perspective)
   - Earned when: Gaining insights, learning perspectives, clicking research links
   - Represents: Growth in understanding, wisdom, context
   - Example: Selecting attachment style, reading research articles

### Growth Mechanic

**1 Growth Unit = 5 Sun + 2 Water**
- First purchase opportunity: Midway through screen 2.1.4
- Purpose: Unlock ability to customize 3 Want-Actions from 2.1.3 list
- Growth represents: Converting learning into relationship transformation

## Screen-by-Screen Credit Awards

### Level 1 - Individual Journey

| Screen | Title | Credit Type | Amount | How Earned | Display in Banner |
|--------|-------|-------------|--------|------------|-------------------|
| 1.2 | Complete Profile | 💧 Water | 1 | Completing profile form | 💧 0/1 |
| 2.1.1 | Preparing the Dirt | 🌱 Soil | 3 | 1 for selection + 1 per research link (Gottman, Getting the Love You Want) | 🌱 0/3 |
| 2.1.2 | A Little Sunshine | ☀️ Sun | 5 | 1 per item listed (up to 5) | ☀️ 0/5 |
| 2.1.3 | Choice Point | 💧 Water | 1 | Choosing Me vs Us path | 💧 0/1 |
| 2.1.4 | (same) | 💧 Water | 2 | Being willing (declaring 18 point allocation) | 💧 0/2 |
| 2.1.4 | **Growth Purchase** | -5☀️ -2💧 | +1🌱 | **INTERRUPT midway** to offer customization | Growth Available! |
| 2.1.5 | (title?) | ☀️ Sun | ? | ? | ☀️ 0/? |
| 2.1.6 | (title?) | 💧 Water | ? | ? | 💧 0/? |
| 2.1.7 | Customize Wants | 💧 Water | ? | Customizing actions | 💧 0/? |

### Harvest Screens

**Show TOTALS only at harvest screens**

| Harvest | Unlocks | Requirements |
|---------|---------|-------------|
| 1st Harvest | • Referrals<br>• Customization (2nd round) | Complete Level 1 |
| 2nd Harvest | • Memberships in Partnerable<br>• Discount on book/journal/app | Complete Level 2 |
| 3rd Harvest | • **Graduation**<br>• Remove gamification<br>• Highlight: "Be careful with each other" | Complete Level 3 |

## Credit Display Rules

### In-Screen Display (Banner Upper Right)
- Show ONLY the credit type earned on that screen
- Display as fraction: `💧 0/2` (earned/available)
- As user earns, update: `💧 1/2` → `💧 2/2`

### Total Credits Display
- **HIDE** running totals during gameplay
- **SHOW** only at:
  - Harvest screens
  - Growth purchase opportunities

### Harvest Screen Display
```
Total Credits Earned:
☀️ Sun: 45
💧 Water: 23
🌱 Soil: 12
🌳 Growth: 3

[Unlock: Referrals] [Unlock: Customization]
```

## Growth Purchase Flow

### Midway Interrupt on 2.1.4

When user has allocated ~9 points (halfway through 18):

```
┌────────────────────────────────────┐
│ 🌳 Growth Opportunity!             │
├────────────────────────────────────┤
│ You've earned enough credits to    │
│ purchase your first Growth unit!   │
│                                    │
│ Cost: 5☀️ + 2💧 = 1🌳              │
│                                    │
│ Your Credits:                      │
│ ☀️ Sun: 5                          │
│ 💧 Water: 3                        │
│                                    │
│ This Growth unlocks the ability to │
│ customize 3 actions from your      │
│ partner's Want list to make them   │
│ more personal and meaningful.      │
│                                    │
│ [Purchase Growth] [Continue Later] │
└────────────────────────────────────┘
```

## Graduation Message (3rd Harvest)

```
┌────────────────────────────────────┐
│ 🎓 Congratulations!                │
├────────────────────────────────────┤
│ You've completed three full cycles │
│ and graduated from WillingTree.    │
│                                    │
│ From this point forward, you are   │
│ participating fully unprotected.   │
│                                    │
│ The training wheels are off.       │
│                                    │
│ ⚠️  Please be careful with each     │
│    other. Real vulnerability       │
│    requires real care.             │
│                                    │
│ Your relationship is now in your   │
│ hands, nurtured by the practices   │
│ you've learned.                    │
└────────────────────────────────────┘
```

## Implementation Checklist

- [ ] Update credit types and meanings
- [ ] Create new CreditsDisplay component that shows per-screen fraction
- [ ] Hide total credits except at harvest
- [ ] Update 2.1.1 title to "Preparing the Dirt" + 3 soil credits
- [ ] Update 2.1.2 title to "A Little Sunshine" + 5 sun credits
- [ ] Add water credit to profile completion (1.2)
- [ ] Add water credit to path selection (2.1.3)
- [ ] Update 2.1.4 to award 2 water credits for willingness
- [ ] Implement Growth purchase interrupt midway through 2.1.4
- [ ] Update harvest screen unlock logic (1st, 2nd, 3rd)
- [ ] Create graduation message for 3rd harvest
- [ ] Update all screen titles per new system
- [ ] Audit all credit awards across all screens

## Questions to Resolve

1. What are the titles and credit awards for screens 2.1.5 and 2.1.6?
2. How many credits for 2.1.7 (Customize Wants)?
3. Should Level 2 screens follow same credit type pattern?
4. What about paired mode (Step 5) - same credit system?
5. When does the interrupt happen exactly - at 9 points allocated, or when clicking Continue?
