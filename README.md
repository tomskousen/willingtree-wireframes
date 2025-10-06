# WillingTree Wireframes & Interactive Demos

Interactive prototypes and wireframes for the WillingTree relationship growth application.

## 📁 Repository Structure

```
willingtree-wireframes/
├── index.html          # Static wireframes (original)
├── v1/                 # Interactive Demo V1
│   ├── index.html      # Full React demo (original naming)
│   ├── recorder.js     # Playwright automation script
│   └── README.md       # V1 documentation
├── v2/                 # Interactive Demo V2 (recommended)
│   ├── index.html      # Full React demo (step/substep naming)
│   ├── recorder.js     # Playwright automation script
│   └── README.md       # V2 changes and improvements
└── videos/             # Demo recordings
    ├── v1-demo.webm    # V1 walkthrough (6.2MB)
    └── v2-demo.webm    # V2 walkthrough (5.9MB)
```

## 🚀 Quick Start

### View Static Wireframes
```bash
open index.html
```

### View Interactive Demo (V2 - Recommended)
```bash
open v2/index.html
```

### Record Demo Video
```bash
# Install dependencies (one time)
npm install -D playwright
npx playwright install chromium

# Record V2 demo
cd v2
node recorder.js
```

## 📊 Versions

### V1 - Original Interactive Demo
- **Naming**: 1A, 1B, 1B2, 2A-2J, 3A-5E
- **Features**: Complete onboarding flow, all 10 days implemented
- **Status**: Functional but confusing navigation

### V2 - Step/Substep Organization (Current)
- **Naming**: Clear step/substep format (1.1, 2.5, 3.1, etc.)
- **Features**: Same functionality as V1 with improved UX
- **Improvements**:
  - ✅ Clear hierarchical naming (Step 1.1, Step 2.5, etc.)
  - ✅ No scrolling within phone frame (optimized for 667px height)
  - ✅ Better visual grouping in navigation
  - ✅ Easier to understand overall flow

## 🎯 Screen Map (V2)

### Step 1: Welcome & Setup
- **1.1** - Welcome Screen
- **1.2** - Profile Setup (name, birthdate, gender)
- **1.3** - Pairing Choice (solo vs partnered)

### Step 2: 10-Day Onboarding Tutorial
- **2.1** - Day 1: Bonding Styles (Stone/Soil/Shovel/Stakes)
- **2.2** - Day 2: Tree Metaphor (Understanding branches/leaves/fruits)
- **2.3** - Day 3: Commitment Level
- **2.4** - Day 4: Willingness Values
- **2.5** - Day 5: Benchmarks & First Asks
- **2.6** - Day 6: Small Branches (3 willing actions)
- **2.7** - Day 7: Willing Commitment
- **2.8** - Day 8: Practice Session
- **2.9** - Day 9: Guessing Game
- **2.10** - Day 10: Completion & Launch

### Step 3: Daily Activities
- **3.1** - Dashboard
- **3.2** - Daily Appreciation
- **3.3** - Weekly Gift
- **3.4** - Manage Tree

### Step 4: Branch Building
- **4.1** - Build Big Branch
- **4.2** - Big Branch Details
- **4.3** - Small Branches

### Step 5: Partner Interaction
- **5.1** - Partner's Big Branch
- **5.2** - Prioritize Small Branches
- **5.3** - Guessing Game
- **5.4** - Credits Earned
- **5.5** - Visibility Window

## 🎬 Demo Videos

Demo videos showcase the complete user flow from welcome to dashboard:

- **v1-demo.webm** (6.2MB) - Original version walkthrough
- **v2-demo.webm** (5.9MB) - V2 with improved navigation

View videos in the `videos/` folder or regenerate them using the recorder scripts.

## 🛠 Technology Stack

- **React 18** - UI framework
- **Babel Standalone** - JSX transformation (no build step required)
- **Playwright** - Automated video recording
- **Single File Architecture** - Everything in one HTML file for easy sharing

## 📝 Design Principles Applied

### Ruthless Reduction (Jony Ive-inspired)
- Removed all non-essential UI elements
- Underline-only input fields (no borders)
- Increased whitespace (80px top margins, 40px gaps)
- Lighter typography (font-weight: 400)

### Progressive Commitment
- Each onboarding day builds on the previous
- Dual validation (text input + checkbox confirmation)
- Users practice before committing real data

### No-Scroll Optimization
- All content fits within 667px viewport height
- Compact headers (50px vs 80px)
- Reduced padding and margins
- Optimized for demo viewing experience

## 🔗 Related Repositories

- **Production App**: [willing-tree-qc](https://github.com/johnpackercoaching/willing-tree-qc)
- **Original Wireframes**: Static HTML/CSS prototypes

## 📄 License

MIT

---

**Last Updated**: October 6, 2025
**Current Version**: V2 (Step/Substep Organization)
