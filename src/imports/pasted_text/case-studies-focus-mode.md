We are moving forward with mobile architecture exploration.

Do NOT spend this pass refining or polishing States A–D.

The existing states are sufficient as architectural prototypes.

We now want to explore the next layer:

CASE STUDIES OVERVIEW
→ EXPLORE
→ CASE STUDIES FOCUS MODE
→ PROJECT SELECTION
→ PROJECT OVERVIEW
→ EVIDENCE

This is an architecture exploration, not a production implementation.

Continue using:

1. sovereign-atlas-mobile-design-contract.md
   Governing constraints.

2. Current mobile prototype
   Source of truth for the mobile visual/spatial language.

3. Existing desktop Atlas implementation/content
   Source of truth for hierarchy, project relationships, Overview content, Focus Mode behavior, and Evidence.

4. Mobile Experience Moodboard
   Behavioral reference, especially:
   - Focus Mode (Overview)
   - Reading Experience
   - Pattern Library
   - Evidence Viewer

Do not invent new information architecture or content.


PHASE 2 GOAL

Determine what mobile Focus Mode looks like after the user taps:

EXPLORE →

from the Case Studies Overview.

We specifically need to understand:

1. how the user returns from reading into spatial exploration
2. how the four Case Studies projects become navigable
3. how selecting a project works on touch
4. how project Overview appears
5. how Evidence is accessed and viewed on mobile


STATE E — CASE STUDIES FOCUS MODE

EXPLORE → from the Case Studies Overview should transition into spatial Focus Mode.

This is NOT another reading page.

Return spatial navigation to prominence.

CASE STUDIES becomes the current parent context.

The four existing Case Studies projects become the primary constellation:

- Agentic Insurance
- Globality
- Oracle
- Sovereign Atlas

Use the existing desktop Case Studies constellation relationships as the structural reference.

Adapt the composition for 390 × 844 portrait.

Do not mechanically shrink desktop geometry.

Recompose it for portrait while preserving relationships.

The screen should communicate:

“I am inside Case Studies and can now explore its projects.”

Case Studies should remain identifiable as the parent.

Sovereign Design / top-level Atlas may remain as extremely quiet ancestry if useful, but should not compete with the project constellation.


NAVIGATION / ORIENTATION

Introduce only the minimum orientation UI necessary.

Explore a restrained mobile top bar such as:

‹ Overview          CASE STUDIES

or an equivalent treatment in the existing Atlas visual language.

Do not introduce conventional bottom navigation.

The user must have an obvious way to return to Case Studies Overview.

Preserve Search only if it does not compete with Focus Mode.


PROJECT CONSTELLATION

All four projects should remain spatial objects, not cards or list rows.

Their existing system colors / stellar treatment should be preserved.

Default Focus Mode:

- all four project nodes visible
- project names legible
- constellation relationships visible
- no project Overview open
- touch targets at least 44 × 44 without visually enlarging the stellar nodes unnecessarily


STATE F — PROJECT ACTIVATED

Prototype the user tapping:

AGENTIC INSURANCE

The selected project should become the spatial focus.

Use the same interaction grammar we established at the system level:

Tap
→ spatial activation
→ selected node becomes dominant
→ sibling projects recede

Agentic Insurance should move toward an appropriate mobile focus position rather than simply glowing in place.

Globality, Oracle, and Sovereign Atlas should fade but may remain as spatial context.

The user should understand:

“I have selected Agentic Insurance.”

Do not open the full reading experience immediately.


STATE G — AGENTIC INSURANCE OVERVIEW · INITIAL

After project activation, introduce the mobile Project Overview.

Use the EXISTING Agentic Insurance Overview content and information architecture.

Do not invent or rewrite case-study content.

The mobile relationship should follow the same principle established at the system level:

focused spatial object above
+
bottom-origin Overview surface below

The initial Project Overview should orient the user quickly.

Use the existing project identity/content fields where appropriate.

The current desktop project Overview is the structural source of truth.

The Overview should support the constellation, not replace it immediately.


PROJECT OVERVIEW ARCHITECTURE

The existing case-study sections remain:

CONTEXT
PROBLEM
APPROACH
DECISIONS
OUTCOMES
LESSONS

Do not redesign this information architecture.

We need to see how this structure adapts to mobile.

Prototype enough of the Project Overview to establish:

- project identity
- initial Overview
- transition into reading
- section navigation
- Evidence access


STATE H — PROJECT READING MODE

Create one 390 × 844 state showing the user deeper inside Agentic Insurance content.

This should test the mobile Reading Experience shown conceptually in the moodboard.

Reading becomes primary.

Explore a restrained top bar:

‹ Overview        AGENTIC INSURANCE

or equivalent.

The content should use a clean single-column reading layout.

Use one real existing section such as APPROACH or DECISIONS.

Do not invent copy.

SECTION NAVIGATION

We need a mobile replacement for persistent desktop section navigation.

Explore the moodboard's Section Picker concept.

The user should be able to access:

01 Context
02 Problem
03 Approach
04 Decisions
05 Outcomes
06 Lessons

without permanently consuming a large portion of the viewport.

A tap-triggered section picker / compact overlay is acceptable.

Do not use conventional bottom navigation.


EVIDENCE ARCHITECTURE

Evidence is critical to this exploration.

Use the existing Agentic Insurance Evidence content/assets as the source of truth.

Do not invent evidence.

Within the reading section, Evidence should appear contextually where it belongs.

Prototype an Evidence entry point inside the content.

The entry point may be:

- evidence thumbnail
- evidence preview
- labeled evidence block

but it must feel integrated with the reading experience.


STATE I — EVIDENCE VIEWER

Create one mobile Evidence Viewer state.

Tapping Evidence should open a focused viewing experience optimized for a small screen.

The evidence artifact itself becomes primary.

Explore:

- near/full-screen presentation
- dark Atlas background
- minimal top controls
- clear close/back action
- evidence title/context
- pinch/zoom or pan affordance if the artifact requires inspection
- portrait-safe image scaling

Do not force a desktop evidence image into an unreadably small viewport.

If the evidence is a large UI screenshot or canvas, allow the viewer to support inspection rather than shrinking everything to fit.

Preserve the actual evidence asset.

Do not recreate or simplify the evidence content.


EVIDENCE → READING

Closing Evidence must return the user to the same place in the project reading experience.

Evidence is an inspection layer.

It is NOT a new navigation destination.


ARCHITECTURAL STORYBOARD

Create these new 390 × 844 prototype states:

E — CASE STUDIES FOCUS MODE
Four project constellation.

F — AGENTIC INSURANCE ACTIVATED
Selected project spatially focused.

G — AGENTIC INSURANCE OVERVIEW · INITIAL
Project Overview begins from bottom.

H — AGENTIC INSURANCE READING MODE
Single-column case-study reading + section navigation + Evidence entry point.

I — EVIDENCE VIEWER
Focused inspection of one real Agentic Insurance evidence artifact.


The resulting architecture should communicate:

ATLAS
↓
CASE STUDIES OVERVIEW
↓ Explore
CASE STUDIES FOCUS MODE
↓ tap project
PROJECT ACTIVATED
↓
PROJECT OVERVIEW
↓ scroll / choose section
PROJECT READING
↓ tap evidence
EVIDENCE VIEWER
↓ close
RETURN TO SAME READING POSITION


IMPORTANT PRINCIPLE

Preserve the alternation between:

SPATIAL EXPLORATION
and
FOCUSED READING.

Do not progressively turn Atlas into a conventional mobile website as the user goes deeper.

Spatial navigation establishes context.

Reading surfaces provide depth.

Evidence temporarily becomes the focus for inspection.

Then the user returns to reading.


DO NOT:

- polish States A–D
- redesign desktop
- modify production responsive architecture
- invent new case-study content
- replace constellations with lists/cards
- add bottom navigation
- redesign Search
- redesign Observatory
- build Frameworks or Experiments yet
- solve every mobile breakpoint
- optimize animation timing yet


PROTOTYPE PRESENTATION

Add E, F, G, H, and I to the existing prototype state selector / exploration environment so we can inspect each architectural state independently.

If interaction wiring is inexpensive within the isolated prototype, connect the obvious transitions.

Visual states are more important than production-quality interaction code.


STOP CONDITION

Stop when E–I are visually complete and reviewable.

Do not proceed beyond the Evidence Viewer.

We will use these states to decide whether the full Case Studies mobile architecture is viable before propagating the grammar to Frameworks and Experiments.