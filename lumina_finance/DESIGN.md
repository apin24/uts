---
name: Lumina Finance
colors:
  surface: '#FFFFFF'
  surface-dim: '#d9d9e2'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3fc'
  surface-container: '#ededf6'
  surface-container-high: '#e7e7f1'
  surface-container-highest: '#e1e2eb'
  on-surface: '#191b22'
  on-surface-variant: '#434653'
  inverse-surface: '#2e3037'
  inverse-on-surface: '#f0f0f9'
  outline: '#737784'
  outline-variant: '#c3c6d5'
  surface-tint: '#1d59c1'
  primary: '#003c90'
  on-primary: '#ffffff'
  primary-container: '#0f52ba'
  on-primary-container: '#bcceff'
  inverse-primary: '#b0c6ff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#732900'
  on-tertiary: '#ffffff'
  tertiary-container: '#993900'
  on-tertiary-container: '#ffc0a7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d9e2ff'
  primary-fixed-dim: '#b0c6ff'
  on-primary-fixed: '#001945'
  on-primary-fixed-variant: '#00419c'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb596'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#7d2d00'
  background: '#faf8ff'
  on-background: '#191b22'
  surface-variant: '#e1e2eb'
  warning: '#F59E0B'
  danger: '#EF4444'
  bg-subtle: '#F8FAFC'
  border-light: '#E2E8F0'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 60px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 32px
---

## Brand & Style

The design system is engineered for efficiency, clarity, and authority. It serves as a command center for finance and inventory management, where data density must be balanced with legibility to prevent cognitive overload.

The aesthetic follows a **Corporate / Modern** movement, leaning into a "SaaS-Plus" look. This means a clean, white-label feel but with refined touches: generous whitespace, subtle depth, and a high-fidelity finish that inspires trust in financial data.

- **Primary Personality:** Dependable, Precise, and Analytical.
- **Visual Strategy:** Use "containers" to group related data points, ensuring a clear information hierarchy.
- **Emotional Response:** Users should feel in control and confident that the data presented is accurate and actionable.

## Colors

The palette is anchored by a professional **Primary Blue** to denote stability and trust. 

- **Primary:** Used for actionable elements, sidebar selection states, and brand highlights.
- **Secondary (Success):** Specifically reserved for positive financial growth, revenue indicators, and completed statuses.
- **Semantic Colors:** Warning (Orange/Yellow) signals pending tasks or high expenses, while Danger (Red) is strictly for deletions, failures, or critical budget alerts.
- **Neutral System:** A soft "Slate" gray palette is used for the background to reduce glare, while pure white is used for cards and data containers to make information "pop."

## Typography

This design system utilizes **Inter** for its exceptional legibility in data-heavy environments and its neutral, systematic character.

- **Scale:** A strict typographic hierarchy is used to differentiate between administrative navigation (labels) and financial figures (headlines).
- **Numbers:** Tabular lining should be used for all financial tables to ensure decimals align vertically.
- **Weight:** Bold weights are used sparingly for section headers; Medium is preferred for interactive labels to maintain a clean look.

## Layout & Spacing

The system uses a **12-column Fluid Grid** for desktop, transitioning to a vertical stack for mobile. 

- **Spacing Rhythm:** Based on a 4px baseline, but defaults to 16px (md) and 24px (lg) for most component spacing.
- **Gaps:** Use a 24px gutter between dashboard cards to create clear separation and "breathability."
- **Sidebar:** The navigation sidebar is fixed at 260px on desktop, collapsing to a hamburger menu icon on mobile devices.
- **Alignment:** All data in tables should be left-aligned for text and right-aligned for currency values to facilitate quick scanning.

## Elevation & Depth

Visual hierarchy is achieved through **Tonal Layering** combined with soft, ambient shadows.

- **The Base:** The page background uses a subtle gray (`#F8FAFC`).
- **Surface Level:** All primary content sits on white cards (`#FFFFFF`).
- **Shadow Profile:** Use a single, very soft shadow for cards (Blur: 12px, Y: 4px, Opacity: 4% Black) to lift them slightly off the background without creating a heavy, cluttered feel.
- **Interactive Depth:** On hover, buttons and cards may increase shadow spread slightly to indicate interactivity.

## Shapes

The design system employs a **Rounded** shape language to soften the "industrial" feel of financial data. 

- **Primary Radius:** 0.5rem (8px) for buttons and standard input fields.
- **Container Radius:** 1rem (16px) for main dashboard cards and modals.
- **Icon Buttons:** Circular or slightly rounded squares are used for utility actions within tables.
- **Consistency:** Avoid sharp 90-degree corners to maintain the modern, approachable brand aesthetic.

## Components

### Buttons
- **Primary:** Solid Blue with white text. High contrast.
- **Secondary:** Light blue tint with Blue text for "ghost" or "outline" variations.
- **Danger:** Solid Red only for destructive actions like "Delete User."

### Dashboard Cards
- Pure white background with 16px padding.
- Include a small icon in the top-right corner themed to the metric (e.g., a "Trend Up" icon for revenue).

### Data Tables
- Header row with a light gray background and bold labels.
- Subtle horizontal dividers (`#E2E8F0`). No vertical lines.
- Hover states on rows for better row-tracking in dense datasets.

### Status Badges (Chips)
- Rounded-pill shape. 
- Low-saturation background with high-saturation text (e.g., Light Green bg with Dark Green text for "Active").

### Product Grids
- Aspect ratio of 1:1 for product images.
- Title and Price stacked vertically underneath, with the Price using `headline-sm` in Primary Blue.

### Input Fields
- 8px border-radius.
- Focus state uses a 2px blue ring with 20% opacity.
- Placeholder text in a light slate gray.