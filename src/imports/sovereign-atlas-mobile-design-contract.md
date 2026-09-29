---
title: "Sovereign Atlas Mobile Design Contract"
version: "v1.0"
status: "Pre-implementation design specification"
primary_viewport: "390 × 844 px"
scope: "Mobile adaptation of Sovereign Atlas"
---

# Sovereign Atlas — Mobile Design Contract v1

## Purpose

This document defines the binding design constraints for adapting Sovereign Atlas to mobile and small-screen environments.

The goal is **not** to create a separate mobile product, simplified portfolio, or conventional mobile application.

The goal is to preserve the same Atlas system, information architecture, content, relationships, and identity while adapting presentation and interaction to smaller viewports and touch input.

> **Preserve the system. Adapt the interaction.**

---

# 1. Source Hierarchy

Use these sources in the following order.

## 1.1 Mobile Design Contract — highest constraint layer

This document governs:

- what may change
- what must remain invariant
- mobile interaction rules
- prototype scope
- stop conditions
- acceptance criteria

If another source conflicts with this contract regarding mobile adaptation, this contract wins.

## 1.2 Design System

Repository:

`wchiu111/sovereign-design-system`

Branch:

`main` — use latest

Use as the source of truth for:

- visual language
- interaction patterns
- design reasoning
- established principles
- component behavior intent
- typography and color logic
- motion philosophy
- density and hierarchy decisions

## 1.3 Production Implementation Reference

Repository:

`wchiu111/sovereign-ux-atlas`

Branch:

`main` — use latest

Use as the implementation reference for:

- architecture
- component structure
- routing
- content organization
- established implementation patterns
- behavior intent

## 1.4 Current Staging Reality

Repository:

`wchiu111/sovereign-ux-atlas-staging`

Branch:

`staging` — use latest

Use as the most current source for:

- latest Atlas behavior
- latest content
- latest UI changes
- latest interaction updates
- current staging implementation state

### Conflict rule

If `sovereign-ux-atlas/main` and `sovereign-ux-atlas-staging/staging` differ in current UI, content, or behavior:

> **Latest staging wins for current product reality.**

The production repo remains useful for understanding established architecture and implementation patterns.

---

# 2. Core Principle

Sovereign Atlas mobile is **not a separate product**.

It is the same Atlas expressed through a different viewport and interaction environment.

Mobile may change:

- layout
- geometry
- density
- sequencing
- panel direction
- interaction mechanics
- touch behavior
- overlay behavior

Mobile must not change:

- conceptual model
- information architecture
- project categorization
- system hierarchy
- content meaning
- route meaning
- Atlas identity

The governing rule is:

> **Change the interaction model when the device requires it. Do not change the conceptual model.**

---

# 3. Product Invariants

These are non-negotiable.

## 3.1 Atlas remains spatial

The constellation is not decorative.

It communicates:

- hierarchy
- relationships
- categorization
- depth
- context
- location within the larger body of work

### MUST

- preserve the spatial metaphor
- preserve constellation relationships
- preserve system identity
- preserve meaningful node relationships

### MUST NOT

- replace Atlas with a conventional card grid
- replace Atlas with a project list
- replace Atlas with tab navigation
- replace Atlas with a carousel
- replace Atlas with a generic mobile homepage

---

## 3.2 The three primary systems remain

The top-level Atlas architecture remains:

- Case Studies
- Experiments
- Frameworks

### MUST NOT

- rename these systems
- introduce a different primary navigation structure
- move projects between systems unless explicitly instructed

---

## 3.3 Existing content hierarchy remains unchanged

A project that belongs to Case Studies on desktop belongs to Case Studies on mobile.

A Framework remains a Framework.

An Experiment remains an Experiment.

Focused content retains the same section hierarchy and sequence.

---

## 3.4 Mobile does not introduce new destinations

### MUST NOT invent

- Home
- Discover
- Feed
- Library
- Explore tab
- dashboard
- conventional bottom-tab app navigation
- new mobile-only content categories

unless explicitly approved.

---

## 3.5 Conceptual journey remains unchanged

Example:

```text
Atlas
  ↓
Case Studies
  ↓
Globality
  ↓
Focused Overview
  ↓
Context
  ↓
Problem
  ↓
Approach
  ↓
Decisions
  ↓
Outcomes
  ↓
Lessons
```

The presentation may change.

The journey does not.

---

# 4. Adaptation Model

Responsive Atlas should eventually operate through three conceptual modes.

## Spatial

Approximate use case:

- large desktop
- wide viewport
- mouse / trackpad
- hover available

Characteristics:

- full constellation
- hover states
- wheel zoom
- side drawers
- persistent navigation
- high simultaneous information density

## Compact

Approximate use case:

- tablet
- small laptop
- constrained width
- mixed pointer/touch input

Characteristics:

- Atlas remains spatial
- panels may become overlays
- geometry contracts
- some chrome reduces
- both pointer and touch may be supported

## Mobile

Approximate use case:

- small portrait viewport
- touch-first
- no hover

Characteristics:

- progressive disclosure
- portrait composition
- overlays / sheets
- lower simultaneous density
- touch-native activation

### Important

Do not design arbitrary breakpoint variants yet.

First establish the mobile grammar using:

`390 × 844 px`

---

# 5. Mobile Design Philosophy

Desktop Atlas can expose multiple relationships simultaneously.

Mobile Atlas should expose the same relationships **progressively**.

```text
DESKTOP

Context + constellation + navigation + content
can coexist.


MOBILE

Context
   ↓
Selection
   ↓
Detail
   ↓
Content
```

This is not simplification.

It is sequencing.

---

# 6. Atlas Landing

## MUST preserve

- The Sovereign Atlas identity
- central nexus
- Case Studies
- Experiments
- Frameworks
- system colors
- spatial relationships
- starfield
- atmospheric depth
- Search
- Observatory entry
- established visual language

## MAY adapt

- orbit radius
- constellation scale
- node position
- label position
- decorative particle density
- spacing
- visual density
- portrait framing

Relationships matter more than exact desktop coordinates.

## Touch interaction hypothesis

Desktop:

```text
Hover → Preview
Click → Enter
```

Mobile should explore:

```text
Tap → Focus / awaken
Second action → Enter
```

or:

```text
Tap → Focus + contextual preview
Explore → Enter
```

Do not lock the exact behavior until prototyped.

### MUST NOT

- require hover on touch devices
- immediately replace the constellation with a list
- invent new primary navigation

---

# 7. System Focus

When a user selects a system such as Case Studies, the experience should feel like moving deeper into the existing Atlas.

## MUST preserve

- active system identity
- child project nodes
- stellar colors
- spatial relationships
- sense of depth
- parent/child relationship

## MAY adapt

- move active system toward center
- expand system geometry
- redistribute child nodes
- dim unrelated systems
- temporarily hide unrelated systems
- increase label prominence
- reduce decorative context

### MUST NOT

- convert the system into a conventional project list
- sever spatial relationship to the parent Atlas

---

# 8. Node Interaction

All important interactive nodes must support touch.

Target touch area:

`minimum approximately 44 × 44 px`

The visible star may remain much smaller.

Transparent hit regions may surround the visual node.

## Desktop behavior

```text
Pointer approaches
       ↓
Node awakens
       ↓
Label / halo strengthens
       ↓
Preview appears
```

## Mobile equivalent

```text
Tap
 ↓
Node awakens
 ↓
Context appears
 ↓
User decides whether to enter
```

### MUST

- translate important hover behavior into touch
- preserve state clarity
- provide explicit activation where needed

### MUST NOT

- make critical information hover-only
- make tiny visual nodes the only touch target

---

# 9. Hover Translation Rule

Every desktop hover behavior must be classified.

## Decorative hover

May disappear on mobile.

## Informational hover

Must translate to tap, focus, or another accessible touch state.

## Navigational hover

Must translate to an explicit touch action.

No important content may exist only on hover.

---

# 10. Focused Overview

Desktop may show:

```text
CONSTELLATION | OVERVIEW DRAWER
```

Mobile must not squeeze this horizontal relationship into portrait width.

Both surfaces should remain part of the experience, but their composition may change.

## Preferred concept to prototype

```text
┌─────────────────────┐
│                     │
│    CONSTELLATION    │
│                     │
│         ✦           │
│                     │
│      PROJECT        │
│                     │
├─────────────────────┤
│ ━━━━━━━━━━━━━━━━    │
│ OVERVIEW        ASK │
│                     │
│ What                │
│ ...                 │
│                     │
│ Why                 │
│ ...                 │
└─────────────────────┘
```

The desktop right-side drawer becomes a candidate bottom sheet.

This is a prototype hypothesis, not a final implementation requirement.

---

# 11. Focused Overview Sheet States

Prototype three states.

## Collapsed

Purpose:

- identify project
- maximize constellation visibility

Example:

```text
┌─────────────────────┐
│                     │
│    CONSTELLATION    │
│                     │
├─────────────────────┤
│ ━                   │
│ GLOBALITY           │
│ Case Study          │
└─────────────────────┘
```

## Intermediate

Purpose:

- reveal Overview content
- retain some spatial context

## Expanded

Purpose:

- deeper Overview reading
- Ask interaction
- project intelligence

### MUST

- make state changes intentional
- preserve orientation

### MUST NOT

- unexpectedly auto-expand without reason

---

# 12. Reading Mode

Reading should prioritize content over persistent interface chrome.

Desktop side navigation should not simply shrink.

## Preferred mobile composition

```text
┌─────────────────────┐
│ ‹ OVERVIEW       •••│
├─────────────────────┤
│                     │
│ GLOBALITY           │
│                     │
│ 03 / 06             │
│ APPROACH            │
│                     │
│ Heading             │
│                     │
│ Reading content...  │
│                     │
│ [ Evidence ]        │
│                     │
│ Reading content...  │
│                     │
└─────────────────────┘
```

Navigation becomes available on demand.

---

# 13. Section Navigation

Case study sequence remains:

- Context
- Problem
- Approach
- Decisions
- Outcomes
- Lessons

A compact indicator may show:

`03 / 06 · Approach`

Activating it may open a section picker.

Example:

```text
SECTIONS

01  Context
02  Problem
03  Approach       ●
04  Decisions
05  Outcomes
06  Lessons
```

### MUST NOT

- place six tiny section labels in a cramped horizontal tab row

---

# 14. Evidence

Evidence remains first-class.

## MUST

- keep evidence legible
- support intentional opening
- support clear close/back behavior
- preserve captions
- prevent accidental horizontal overflow

## MAY

- open evidence in a near-fullscreen viewer
- support pinch zoom where useful
- increase thumbnail prominence on mobile

### MUST NOT

- reduce important evidence to unreadable desktop thumbnails

---

# 15. Ask Atlas

Ask remains part of focused experiences.

## MUST account for

- software keyboard
- dynamic viewport height
- input visibility
- answer scrolling
- source visibility
- project context
- reliable close/back behavior

### MUST NOT

- permanently reserve large screen areas for Ask while inactive
- allow keyboard to cover the active input

---

# 16. Search

Search remains globally accessible.

## MAY

- become a focused overlay
- become a full-screen mobile surface

## MUST preserve

- concise results
- contextual hierarchy
- clear destination
- calm density
- existing Atlas search philosophy

### MUST NOT

- turn Search into a separate feed or browser architecture

---

# 17. Observatory

Observatory must preserve the concept of an environment.

It must not become a generic About page.

## MUST preserve

- spatial/environmental metaphor
- existing conceptual destinations
- sense of exploration
- focused environmental interaction

## MAY explore

- portrait reframing
- touch hotspots
- progressive focus
- spatial labels
- controlled panning if needed

### MUST NOT automatically convert to

```text
About Me
Resume
Philosophy
Contact
```

as conventional stacked cards.

---

# 18. Motion

Motion should continue to communicate:

- depth
- focus
- relationship
- transition
- awakening

## MAY

- shorten motion
- reduce simultaneous animation
- reduce particle density
- reduce blur complexity
- simplify transitions

## MUST

- respect reduced-motion preferences

### MUST NOT

- recreate desktop motion mechanically if it harms mobile usability
- add excessive scroll-linked parallax

---

# 19. Typography

Do not proportionally shrink all desktop typography.

## MUST prioritize

- readability
- hierarchy
- touch clarity
- label legibility

Small metadata may require selective enlargement on mobile.

Hierarchy matters more than proportional scaling.

---

# 20. Density

Mobile should reduce simultaneous density, not information quantity.

Bad approach:

> Remove information because there is less space.

Preferred approach:

> Reveal the same information in stages.

```text
Desktop
────────
See many things simultaneously


Mobile
──────
See fewer things at one moment

while retaining access
to the same system
```

---

# 21. Orientation and Viewports

Initial design target:

`390 × 844 px`

Secondary QA targets later:

- 375 × 667
- 393 × 852
- 430 × 932
- 768 × 1024

Do not solve mobile landscape in the first pass.

---

# 22. Touch and Gesture Rules

Potential mappings:

| Desktop | Mobile |
|---|---|
| Hover | Tap / focus |
| Click | Tap / explicit action |
| Wheel zoom | Tap navigation / optional pinch |
| Drag canvas | Touch drag where necessary |
| Side drawer | Bottom sheet / overlay |
| Persistent sidebar | On-demand navigation |
| Keyboard shortcut | Visible touch control |
| Tooltip | Tap contextual surface |

### MUST NOT

- rely on undiscoverable gestures for critical navigation

---

# 23. Back Navigation

Every deeper level must have a predictable return path.

Example:

```text
Atlas
 ↓
Case Studies
 ↓
Globality
 ↓
Approach
```

Back should reverse conceptual depth:

```text
Approach
 ↓
Globality Overview
 ↓
Case Studies
 ↓
Atlas
```

Avoid ambiguous overlay/back behavior.

---

# 24. Safe Areas

Designs must account for:

- notch / Dynamic Island
- status bar
- browser chrome
- home indicator
- software keyboard

Critical controls must not occupy unsafe edges.

Implementation should eventually use:

- dynamic viewport units
- safe-area insets
- keyboard-aware positioning

---

# 25. Performance

Preserve atmosphere while reducing cost.

Candidates for optimization:

- background star count
- particle count
- glow complexity
- simultaneous animated nodes
- blur intensity
- offscreen animation
- large image loading

### MUST NOT

- remove the atmosphere wholesale

Optimize its cost instead.

---

# 26. Accessibility

Mobile adaptation must improve or preserve accessibility.

## MUST support

- adequate touch targets
- readable text
- sufficient contrast
- reduced motion
- semantic navigation
- visible focus where relevant
- screen-reader labels
- no hover-only information
- no gesture-only critical action

---

# 27. Figma AI — Allowed Changes

Figma AI MAY propose changes to:

- spatial positioning
- responsive geometry
- panel placement
- information sequencing
- touch target sizing
- typography sizing
- spacing
- density
- mobile overlays
- bottom sheets
- navigation presentation
- motion behavior
- decorative density

---

# 28. Figma AI — Prohibited Changes

Without explicit approval, Figma AI MUST NOT:

- rename systems
- rename projects
- change information architecture
- move projects between systems
- invent new navigation destinations
- add conventional bottom navigation
- replace Atlas with cards
- replace constellations with lists
- remove Observatory
- remove project sections
- rewrite project content
- invent new project content
- change semantic stellar colors
- change Atlas's fundamental visual identity
- alter desktop layouts
- alter desktop components
- modify the original Figma file

All work must occur only in the cloned mobile exploration file.

---

# 29. Desktop Is the Baseline, Not the Template

Desktop defines:

- identity
- hierarchy
- relationships
- content
- visual language
- behavior intent

Desktop does not dictate:

- coordinates
- dimensions
- panel direction
- simultaneous density
- exact interaction mechanics

Therefore:

> Do not mechanically scale the desktop interface.

Also:

> Do not redesign Atlas merely because common mobile conventions exist.

---

# 30. Decision Test

Whenever considering a mobile change, ask:

## Question 1

Is this change required because of:

- space
- touch
- readability
- accessibility
- performance
- orientation

If no, preserve the existing Atlas behavior/design.

## Question 2

Does this adaptation change how Atlas works conceptually?

If yes:

> Stop and request review.

---

# 31. First Prototype Scope

Do not mobile-adapt the entire application in one pass.

First build one vertical slice:

```text
01
ATLAS LANDING

      ↓

02
CASE STUDIES FOCUS

      ↓

03
GLOBALITY SELECTION

      ↓

04
GLOBALITY
FOCUSED OVERVIEW

      ↓

05
CONTEXT
READING MODE
```

This prototype exists to answer architectural questions.

It is not yet the production mobile system.

---

# 32. Prototype Questions

Before expanding mobile design, the prototype must answer:

## Landing

Can all three systems remain understandable in portrait without becoming miniature?

## Touch

Does one tap select and a second action enter, or is direct entry preferable?

## System Focus

How much surrounding Atlas context should remain visible?

## Focused Overview

Does the bottom-sheet model actually feel like Atlas?

## Reading

Can persistent sidebar navigation be removed without harming orientation?

## Back

Does moving between depth levels feel obvious?

## Density

How much constellation information can remain visible before mobile becomes noisy?

## Identity

Most important:

> **Does this still unmistakably feel like Sovereign Atlas?**

If not, the mobile architecture is wrong even if it is technically usable.

---

# 33. Figma Agent Execution Rules

When this contract is provided to Figma AI:

1. Read this contract first.
2. Inspect the referenced repositories according to the source hierarchy.
3. Establish the current Atlas behavior before making changes.
4. Work only in the cloned mobile exploration file.
5. Do not modify existing desktop frames.
6. Begin with one `390 × 844` Atlas landing frame.
7. Preserve the existing Atlas identity and hierarchy.
8. Adapt only what is required for portrait space, touch, readability, and accessibility.
9. Do not introduce new information architecture.
10. Stop after completing the requested phase.

---

# 34. Phase 1 Execution Prompt

Use this after the agent has read the contract and inspected the sources.

> Treat the attached Sovereign Atlas Mobile Design Contract as binding design constraints.
>
> Use the latest `main` branch of `wchiu111/sovereign-design-system` as the visual, interaction, and design-reasoning source of truth.
>
> Use the latest `main` branch of `wchiu111/sovereign-ux-atlas` as the implementation architecture reference.
>
> Use the latest `staging` branch of `wchiu111/sovereign-ux-atlas-staging` as the most current product reality. If the two implementation repositories conflict in current UI, content, or behavior, latest staging wins.
>
> Work only in the cloned mobile exploration file. Do not modify existing desktop frames or desktop architecture.
>
> Begin with a single `390 × 844` mobile frame representing the current Atlas landing experience.
>
> Use the existing desktop Atlas as the visual, structural, content, and interaction-intent source of truth.
>
> Do not redesign the information architecture. Do not introduce bottom navigation, new destinations, cards replacing the constellation, or conventional mobile-app patterns unless specifically requested.
>
> First adapt only what is necessary for portrait space, touch interaction, readability, and accessibility.
>
> Preserve the central Atlas nexus, Case Studies, Experiments, Frameworks, their relationships, stellar visual language, Search, and Observatory entry.
>
> Establish appropriate portrait constellation geometry and touch targets. Translate hover-dependent behavior into touch-capable states without yet building deeper screens.
>
> **Stop after completing the Atlas landing screen.**
>
> Do not proceed to System Focus, Focused Overview, Reading Mode, Observatory, or other screens until the landing design has been reviewed and approved.

---

# 35. Working Process

Use a supervised phase-by-phase process:

```text
Contract
   ↓
Landing
   ↓
Review
   ↓
Revise
   ↓
Lock
   ↓
System Focus
   ↓
Review
   ↓
Lock
   ↓
Focused Overview
   ↓
Review
   ↓
Lock
   ↓
Reading Mode
```

The responsive grammar should be established intentionally.

The agent executes the system.

The agent does not invent the system.
