# Sovereign Atlas — Mobile Phase 1: Landing Design Composition (Refined)

## Status: Approved hypothesis — ready to build exploration frames

---

## Implementation Audit (retained as reference, not acted on yet)

| Problem | Root Cause | Files |
|---|---|---|
| All 3 systems render off-screen | `orbitA` 276–354 SVG units > 195px half-viewport | `atlasSystemConfig.ts`, `atlasGeometry.ts` |
| Hover previews never fire | `onMouseEnter`/`onMouseLeave` — no touch equivalent | `AtlasSystem.tsx`, `AtlasPlanet.tsx`, `AtlasExplorer.tsx` |
| No visible search trigger | `Cmd+K` / `/` only | `AtlasCommandPalette.tsx`, `AtlasExplorer.tsx` |
| Observatory button clips iOS home bar | No `safe-area-inset-bottom` | `AtlasExplorer.tsx` |
| Pinch-to-zoom absent | Wheel event only | `AtlasExplorer.tsx` |

What already works: SVG `viewBox` matches window, nexus proportional, palette has `@media` width rule, `prefers-reduced-motion` respected.

**None of these files are touched for Phase 1. Phase 1 is a standalone exploration component only.**

---

## What Is Being Built

Two static-ish portrait frames as a self-contained React exploration component:

**A. Default landing state** — all three systems visible at rest, full child node constellations present but quiet, labels minimal
**B. Awakened state** — one system tapped, child constellation becomes prominent, contextual identity appears, explicit Explore action available

These frames live in a new file and do not modify any existing Atlas code.

---

## Refined Composition

### Portrait canvas: 390 × 844 px

---

### 1. Nexus

**Position: 195, 355** — horizontal center, approximately 42% from top.

The nexus is the strongest visual organizing point. It anchors the composition perceptually. All three system relationships radiate from it.

Slightly above true center gives room below for Frameworks and the Observatory entry. The exact y-coordinate can shift slightly in visual tuning — the perceptual center matters more than the mathematical center.

Visual treatment: same as desktop — nested atmospheric rings, breathing glow, core dot, gold color. No visual reduction on mobile. It is the nexus.

---

### 2. System Positions (Portrait Triangle)

Three sibling systems of equal conceptual rank. Screen positions are compositional only — no hierarchy implied.

| System | Position (x, y) | Approx distance from Nexus |
|---|---|---|
| Case Studies | 95, 178 | ~200px, upper-left |
| Experiments | 298, 178 | ~205px, upper-right |
| Frameworks | 195, 565 | ~210px, directly below |

```
390px
┌─────────────────────────┐
│                         │  ~40px top padding
│   ✦ CS        ✦ EX      │  y≈178  (system nodes, upper pair)
│                         │
│         ✦               │  y≈355  (nexus, visual center)
│      NEXUS              │
│                         │
│         ✦               │  y≈565  (Frameworks, lower)
│        FW               │
│                         │
│   [ ENTER OBSERVATORY ] │  y≈780  (with safe area)
└─────────────────────────┘
844px
```

**Angular distribution:** The upper pair (Case Studies + Experiments) are symmetrical across the vertical axis. Frameworks sits on the vertical axis below the nexus. This creates a stable, legible composition that reads as orbital — not as a list.

---

### 3. Orbital Paths

Orbit paths remain. They are recomposed for portrait — not a scaled version of the desktop ellipses.

Portrait orbital paths are **partial arcs** that clip at the viewport edges. The viewport acts as a window into a larger orbital space — the full ellipse exists conceptually beyond the frame.

Treatment:
- Thin, low-opacity dashed strokes — same atmospheric quality as desktop
- Portrait-specific arc geometry: tighter curves near the node, extending beyond the viewport at the extremes
- The partial clip reads as depth and suggests continuation beyond the frame
- They do not need to fit entirely within 390px

Upper pair (Case Studies, Experiments): arcs that curve through the upper region, clipping at the left and right edges respectively.

Frameworks: an arc below the nexus that clips at the bottom edge.

All three arcs pass through or near the nexus region, communicating orbital relationship.

---

### 4. Child Node Constellations

**Do not reduce to 2–3 nodes.** Preserve the sense that each system contains a constellation.

Default state:
- All child stellar nodes remain visible around each system
- Rendered at reduced visual weight — quieter glow, lower opacity cores
- **Labels suppressed or near-invisible** — only the system name itself is labeled at default
- The constellation reads as presence and depth, not as navigable objects
- Density reduction happens through opacity and weight, not through removal

The child nodes suggest richness. They communicate "there is a body of work inside this system" without demanding attention at the landing level.

Cluster geometry for portrait: child nodes arrange in a compact orbit around their system node. The orbit radius is authored specifically for portrait — not derived from the desktop `STAR_ORBIT_R`. A tighter radius (e.g., 35–45px from the system center) keeps the child cluster visible without extending beyond reasonable bounds at the portrait scale. Exact values are a tuning decision.

---

### 5. Touch Interaction Model

**Three interaction states (this phase):**

**Default**
- All three system nodes at rest
- Subtle orbital drift animation continues (slow, atmospheric)
- Child constellations quiet but visible
- System name labels visible
- Nexus breathing gently

**Awakened (Tap System)**
- Tapped system node transitions to selected state — atmosphere expands, halo brightens
- Child constellation becomes more prominent — nodes brighten, labels become visible
- System identity + description appears: a compact contextual surface near the awakened system
  - System name (larger)
  - Brief descriptor (e.g., "4 case studies")
  - **Explicit "EXPLORE →" action** — a tappable label/button that enters the system
- Unrelated systems and their child nodes dim gently — they remain spatially present, just quieter
- Nexus remains visible and centered
- Tapping elsewhere cancels the awakened state

**Enter (Tap "EXPLORE →")**
- Navigation fires — same destination as desktop click on system node
- Not implemented in Phase 1 exploration frames (the action is represented but not wired)

This maps conceptually to desktop:
```
Desktop:    Hover → Preview → Click → Enter
Mobile:     Tap   → Awaken  → EXPLORE → Enter
```

The EXPLORE action makes the distinction between selection and navigation explicit. The user selects something, sees what it is, then consciously chooses to enter.

The contextual surface appears near the awakened system without covering the nexus or other systems. Positioning: between the system node and the nearest canvas edge (outward from center), so it does not obscure the orbital field.

---

### 6. Search

**Position: upper-right header**

A compact SEARCH control in the header right — DM Mono label or magnifier glyph, consistent with Atlas visual language. Not a generic mobile search bar.

Minimum 44×44px touch region around it.

Tapping opens the existing command palette overlay. The trigger is just an entry point — the palette behavior is not redesigned in this phase.

Header layout:
```
[ The Sovereign Atlas      ] [ ⌕ SEARCH ]
```

Both elements in the header are the only persistent chrome at the top. Clean and minimal — does not compete with the constellation.

---

### 7. Observatory Entry

**Position: bottom-center, y ≈ 780–800**

Same visual treatment as desktop — the understated "ENTER OBSERVATORY" label. On touch devices it is persistently visible (no hover needed to reveal it).

Safe area: must clear the iOS home indicator (~34px) and mobile browser chrome. Use `padding-bottom: env(safe-area-inset-bottom)` or equivalent inset in implementation. In the exploration frame, position conservatively at y=780, leaving ~64px of clearance from the 844px bottom.

---

### 8. Atmosphere

Starfield background, nebula depth, particle field — all preserved. These establish the identity.

In the exploration component: render a simplified but authentic version of the starfield. A static or slowly animated particle field is sufficient for the exploration frames — the focus is on the spatial composition, not production-quality performance optimization.

Decorative ring radius that extends beyond viewport is acceptable — the viewport-as-window concept applies here too.

---

## What Changes from Desktop and Why

| Element | Desktop | Portrait | Reason |
|---|---|---|---|
| System positions | Elliptical orbit, wide horizontal spread | Portrait triangle (NW, NE, S) | Portrait favors vertical; horizontal spread clips |
| Orbit paths | Full ellipses visible | Partial arcs, viewport-clipped | Viewport acts as window; full fit is not required |
| Child node labels | Visible on hover/approach | Suppressed at rest, visible on awaken | Reduce simultaneous density — not information quantity |
| Hover → Preview | MouseEnter triggers preview | Tap → awakened state + contextual surface | No hover on touch |
| Click → Enter | Single click enters | Explicit EXPLORE action after awaken | Distinguish selection from navigation on touch |
| Search trigger | Cmd+K, `/` key | Persistent compact control in header | Keyboard shortcuts unavailable on touch |
| Orbit drift amplitude | Desktop orbit radii (276–354px) | Portrait-authored geometry | These are not scaled — they are recomposed |
| Observatory | Hover to reveal animation | Persistently visible | No hover on touch |
| Safe areas | n/a | Bottom insets | iOS home indicator |

---

## Build Plan

Create: `src/app/atlas/mobile/MobileAtlasLandingExploration.tsx`

This is a self-contained exploration component. It:
- Does not import from or modify any existing Atlas components
- Renders in a 390×844 frame (centered in the browser for desktop viewing)
- Uses the same design tokens (colors, fonts) from `theme.css`
- Contains its own simplified SVG/canvas rendering of the Atlas spatial composition
- Has a state toggle between **Default** and **Awakened (Case Studies selected)** states
- Is mounted from `App.tsx` temporarily for review, or accessible via a route

The exploration is the design artifact. It answers: does this portrait composition feel like Sovereign Atlas?

Once approved, implementation of the production responsive system begins from this confirmed composition.

---

## Stop Condition

Two frames only:
- A: Default landing state
- B: Case Studies awakened state

No System Focus. No Focused Overview. No Reading Mode. No deeper states.
