# Chassis Figma — Homepage Copy Review

> Audience: Technical PMs, developers, CTOs
> Stage: Pre-launch, v0.1.0, no customers
> Tone: Technical, honest, capability-first

---

## Critical Issues

### 1. Component count is wrong everywhere

The copy says "100+ production-ready components" in three places (Hero subtitle, IntroSection card 1, FeaturesSection card 1). The actual library contains **~30 UI components** with 4 asset categories and guide components. Inflating this will erode trust with technical evaluators who will open the Figma file and count.

**Appears in:** HeroSection, IntroSection, FeaturesSection

### 2. "Why Leading Teams Choose" — no teams use it yet

Pre-launch product with zero customers cannot claim adoption. Technical PMs will read this as unearned social proof.

**Appears in:** IntroSection header

### 3. Unverifiable performance claims

- "eliminating months of setup work" (IntroSection)
- "Build consistent interfaces faster" (HeroSection)
- "effortlessly" (IntroSection card 2)
- "instantly" (FeaturesSection card 5)

These cannot be proven pre-launch and read as marketing filler to technical audiences.

### 4. "Production-Ready" in title — v0.1.0 contradicts this

The version number is visible on the same page. Calling v0.1.0 "production-ready" without qualification will concern CTOs evaluating stability.

### 5. Hero subtitle is generic

"Complete UI component library with design tokens, variables, and documentation" describes every Figma design system. Doesn't differentiate Chassis.

### 6. Features section describes WHAT, not HOW

Every card body says what the feature is but not how it actually works in Chassis. Technical evaluators want mechanism, not description.

---

## Section-by-Section Rewrites

### Page Title

**Current:**
```
Chassis Figma - Production-Ready Design System Components
```

**Issue:** "Production-Ready" at v0.1.0 is a stretch.

**Proposed:**
```
Chassis Figma - Tokenized Figma Component System
```

---

### HeroSection

**Current h1:**
```
Production-Ready Figma Components for
Modern Design Systems
```

**Issue:** Generic. Every Figma library claims this.

**Proposed h1:**
```
Tokenized Figma Components with
Built-In Documentation
```

**Current subtitle:**
```
Complete UI component library with design tokens, variables, and documentation.
Build consistent interfaces faster with Chassis components, assets, and theming system.
```

**Issue:** "Complete" and "faster" are unverifiable. Doesn't explain what makes Chassis different.

**Proposed subtitle:**
```
30+ UI components, swappable asset layers, and documentation templates—all driven
by Figma Variables that sync directly with production tokens via Tokens Studio.
```

---

### IntroSection — Header

**Current title:**
```
Why Leading Teams Choose
Chassis Figma
```

**Issue:** No teams use it. Implies adoption that doesn't exist.

**Proposed title:**
```
What Ships in the Box
```

**Current subtitle:**
```
Chassis Figma gives your team a complete design system foundation with production-ready
components, flexible theming, and comprehensive documentation—eliminating months of setup work.
```

**Issue:** "complete", "production-ready", "eliminating months" — all unverifiable.

**Proposed subtitle:**
```
A Figma library system with tokenized components, swappable content assets,
and documentation guides—structured for multi-brand theming from day one.
```

---

### IntroSection — 3 Cards

#### Card 1

**Current:**
- Title: `Start Building Immediately`
- Body: `Skip the tedious component setup. Get 100+ production-ready components with variants, states, and responsive behavior built-in.`

**Issues:** "100+" is factually wrong (~30 components). "Tedious" is subjective filler.

**Proposed:**
- Title: `30+ Components with Variants`
- Body: `Buttons, forms, navigation, modals, tables, and mobile patterns. Each component ships with documented variants, interactive states, and auto-layout for responsive behavior.`

#### Card 2

**Current:**
- Title: `Design System Foundation`
- Body: `Built on design tokens and variables for consistent theming. Switch between light/dark modes and create custom brand themes effortlessly.`

**Issues:** "effortlessly" is marketing filler. Doesn't explain the mechanism.

**Proposed:**
- Title: `Token-Driven Theming`
- Body: `All visual properties reference Figma Variables organized into brand, theme, and app layers. Switch color modes or create new brand themes by editing variable collections—no component changes needed.`

#### Card 3

**Current:**
- Title: `Developer-Friendly Handoff`
- Body: `Named properties, documented behaviors, and token-based styling ensure smooth design-to-development workflows with minimal confusion.`

**Issues:** "smooth" and "minimal confusion" are subjective. Doesn't mention the actual mechanism (Tokens Studio sync, CSS token mapping).

**Proposed:**
- Title: `Design-to-Code Token Parity`
- Body: `Component tokens map 1:1 to Chassis CSS and Chassis Tokens output. Named properties and specs tabs give developers exact values, states, and responsive breakpoints.`

---

### FeaturesSection — Header

**Current title:**
```
Complete Design System
in Figma
```

**Issue:** "Complete" is an unverifiable claim.

**Proposed title:**
```
Components, Assets, and Guides
in One Library System
```

**Current subtitle:**
```
Everything you need to design and document modern interfaces—components, patterns,
tokens, and guidelines—all built with best practices and easy to customize.
```

**Issue:** "Everything you need" and "easy to customize" are filler.

**Proposed subtitle:**
```
Chassis Figma ships three library types that work together: component libraries
for UI, asset libraries for content, and guide libraries for documentation and specs.
```

---

### FeaturesSection — 6 Cards

#### Card 1

**Current:**
- Title: `100+ UI Components`
- Body: `Complete library of buttons, forms, navigation, modals, tables, and complex components. Every component includes variants, states, and responsive behavior.`

**Issues:** Count is wrong. "Complete" is unverifiable.

**Proposed:**
- Title: `30+ UI Components`
- Body: `Each component ships as a single Figma file (cx.comp.*) with variants, interactive states, and auto-layout. Props, specs, tokens, and variant tabs are documented inline.`

#### Card 2

**Current:**
- Title: `Design Token System`
- Body: `Colors, typography, spacing, shadows, and more defined as variables. Create custom themes by swapping token values—no component rebuilding required.`

**Issue:** Doesn't explain the 3-layer variable architecture that's the actual differentiator.

**Proposed:**
- Title: `3-Layer Variable Architecture`
- Body: `Brand variables define identity (colors, type, radii). Theme variables control modes (light/dark). App variables style components. Change any layer without touching the others.`

#### Card 3

**Current:**
- Title: `Asset Components`
- Body: `Text, icons, backgrounds, skeletons, and switches as swappable assets. Modify content without detaching from the main component library.`

**Issue:** Technically accurate but doesn't explain the WHY—swap mechanism.

**Proposed:**
- Title: `Swappable Asset Layers`
- Body: `Text blocks, icons, backgrounds, and skeleton loaders are separate asset instances inside components. Swap content by replacing the asset—the component stays connected to the library.`

#### Card 4

**Current:**
- Title: `Documentation Templates`
- Body: `Pre-built components for specs, grids, token tables, and style guides. Create professional documentation directly in Figma with consistent structure.`

**Issue:** "Professional" is filler. Doesn't mention the specific doc components.

**Proposed:**
- Title: `Guide Library for Documentation`
- Body: `Document covers, grid overlays, spacing scales, sitemap builders, user flow diagrams, and spec annotation tools. Build design documentation inside Figma using structured guide components.`

#### Card 5

**Current:**
- Title: `Light & Dark Modes`
- Body: `Full theming support with semantic color tokens. Switch between modes instantly, preview components in both themes, and create custom color schemes.`

**Issue:** "Instantly" is filler. Doesn't explain the multi-mode mechanism.

**Proposed:**
- Title: `Multi-Mode Color Tokens`
- Body: `Theme variables define light and dark palettes as separate modes in the same variable collection. Switch modes per frame or per page—components update without manual recoloring.`

#### Card 6

**Current:**
- Title: `Responsive Components`
- Body: `Auto-layout configured for responsive behavior. Components adapt to content and container sizes with mobile, tablet, and desktop variants included.`

**Issue:** Accurate but generic. Every modern Figma library uses auto-layout.

**Proposed:**
- Title: `Auto-Layout with Breakpoint Variants`
- Body: `Components use auto-layout for fluid sizing. Mobile navigation (bottom nav, top nav), responsive tables, and layout sections include device-specific variants you can toggle via properties.`

---

### HowSection — Header

**Current title:**
```
How to
Get Started
```

**Current subtitle:**
```
Three simple steps from installation to building interfaces
```

**Issue:** "Simple" is relative. Actual setup requires a 3-pass publish process.

**Proposed title:**
```
From Figma Community
to First Component
```

**Proposed subtitle:**
```
Duplicate from Figma Community, publish libraries to your team, and start inserting components.
```

---

### HowSection — 3 Cards

#### Card 1

**Current:**
- Title: `Enable Libraries`
- Body: `Get the Chassis UI libraries from Figma Community. Enable the Component, Asset, and Guide libraries in your Figma file to access all components and templates.`
- Code: Shows `cx.component.lib / cx.asset.lib / cx.guide.lib`

**Issue:** The actual file names are `cx.comp.*`, `cx.asset.*`, `cx.guide.*`, `cx.tokens.*`, `cx.template.*`. The code example uses wrong names.

**Proposed:**
- Title: `Duplicate & Publish Libraries`
- Body: `Duplicate the Chassis library files from Figma Community. Publish them to your team workspace so all members can enable the component, asset, and guide libraries.`
- Code:
```
Chassis Library Files
├── cx.tokens.*    → Variable collections
├── cx.comp.*      → UI components
├── cx.asset.*     → Content assets
├── cx.guide.*     → Documentation
└── cx.template.*  → Page templates
```

#### Card 2

**Current:**
- Title: `Configure Theme`
- Body: `Apply the Chassis variable collection to your file. Choose between light and dark modes, or create custom themes by editing token values to match your brand.`
- Code: Shows generic variable panel tree

**Issue:** Doesn't mention Tokens Studio or the actual variable layers.

**Proposed:**
- Title: `Configure Variables`
- Body: `The token library includes brand, theme, and app variable collections. Select a color mode, adjust brand values, or connect Tokens Studio for bidirectional sync with your codebase.`
- Code:
```
cx.tokens.* Variables
├── Brand       → Colors, type, radii
├── Theme       → Light / Dark modes
├── App         → Component-level tokens
└── Sync
    ├── Tokens Studio ↔ Git
    └── Figma Variables (native)
```

#### Card 3

**Current:**
- Title: `Build Interfaces`
- Body: `Insert components from the library, customize properties and content through the right panel, and swap asset instances for advanced customizations. Everything updates automatically.`
- Code: Shows generic properties tree

**Issue:** "Everything updates automatically" is vague. Accurate but not specific.

**Proposed:**
- Title: `Insert & Customize`
- Body: `Drag components from the assets panel. Override text, toggle boolean properties, select variants, and swap asset instances. Library updates propagate to all instances across files.`
- Code:
```
Component Instance
├── Variant       → Size, style, state
├── Properties    → Show/hide, labels
├── Asset Swaps   → Icon, background, text
└── Tokens        → Inherited from variables
    └── Override per-instance if needed
```

---

## Structural Note

**RolesSection** is imported but not rendered in the current `index.astro`. If it will be added back, the three role columns (Product Managers, Designers, Developers) need the same treatment: replace vague benefits with specific Chassis capabilities in each bullet.
