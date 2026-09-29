We are transitioning the Sovereign Atlas mobile work from an
EXPLORATION ENVIRONMENT into a CLEAN INTERACTIVE MOBILE PROTOTYPE.

This is a structural consolidation pass.

Do NOT redesign the mobile experience.
Do NOT refine visual styling.
Do NOT modify the desktop Atlas.

The purpose of this pass is to preserve the mobile architecture we have
already discovered while converting the A–N exploration states into a
coherent prototype architecture that we can continue building and later
hand to Codex as an implementation reference.


==================================================
GOVERNING SOURCES
==================================================

Continue using:

1. sovereign-atlas-mobile-design-contract.md
   Governing mobile constraints.

2. Existing desktop Atlas
   Source of truth for content, hierarchy, relationships, and existing
   product behavior.

3. Existing mobile States A–N
   Source of truth for the mobile architecture and compositions we have
   already explored.

4. Existing mobile moodboard
   Behavioral/design reference.

IMPORTANT:

The existing desktop Atlas is protected.

Do not move, rename, refactor, rewrite, delete, or modify existing
desktop Atlas components as part of this cleanup.


==================================================
PRIMARY GOAL
==================================================

Create a clean, isolated Mobile Atlas prototype architecture inside the
existing project.

The mobile prototype should no longer behave primarily as a collection
of lettered design states.

A–N were exploration scaffolding.

The product architecture should now be expressed semantically through
actual experience states and transitions.


==================================================
1. PRESERVE THE EXISTING MOBILE WORK
==================================================

Before restructuring anything, inspect the complete existing
MobileAtlasLandingExploration implementation.

Preserve the visual compositions and behaviors represented by States
A–N.

Do not recreate these states from scratch.

Do not visually reinterpret them.

Do not change:

- constellation compositions
- node positions unless technically required by extraction
- typography
- colors
- atmospheric treatment
- content
- evidence assets
- overview layouts
- reading layouts
- existing interaction concepts

This pass is architecture cleanup, not design iteration.


==================================================
2. REMOVE LETTER STATES FROM PRODUCT LOGIC
==================================================

A, B, C, D, E, F, G, H, I, J, K, L, M, N are prototype-review labels.

They are NOT product concepts.

Replace letter-based product state logic with semantic state names.

Conceptually map the existing exploration approximately as:

A
→ atlas-landing

B
→ system-awakened

C / D
→ system-overview

E
→ case-studies-focus

F
→ project-awakened

G
→ project-overview

H
→ project-reading

I
→ evidence-viewer

J
→ frameworks-focus

K
→ framework-awakened

L
→ framework-overview

M
→ framework-reading

N
→ framework-evidence

Use naming appropriate to the existing codebase, but the resulting
architecture must describe PRODUCT STATES rather than prototype letters.


==================================================
3. CREATE A MOBILE PROTOTYPE SHELL
==================================================

Create a clear top-level mobile prototype entry point.

For example:

src/app/atlas/mobile/
  MobileAtlas.tsx

or an equivalent structure appropriate to the current project.

MobileAtlas should become the orchestrator for the isolated mobile
experience.

It should own or coordinate:

- current mobile experience state
- selected system
- selected project/framework
- active reading section
- active evidence/artifact
- back navigation
- transitions between mobile states

Do not introduce a heavy routing framework if one is not necessary.

This is still an isolated prototype.


==================================================
4. DECOMPOSE THE LARGE EXPLORATION COMPONENT
==================================================

The existing MobileAtlasLandingExploration component has grown into a
large multi-state prototype file.

Do not continue adding all mobile architecture into that single file.

Extract coherent mobile components.

Use the existing codebase conventions where possible.

A reasonable conceptual organization might be:

mobile/
  MobileAtlas.tsx

  navigation/
    MobileLanding
    MobileSystemAwakened
    MobileSystemOverview

  focus/
    MobileCaseStudiesFocus
    MobileProjectAwakened
    MobileProjectOverview

  reading/
    MobileReadingMode
    MobileSectionNavigation

  frameworks/
    MobileFrameworksFocus
    MobileFrameworkAwakened
    MobileFrameworkOverview
    MobileFrameworkReading

  evidence/
    MobileEvidenceViewer
    MobileFrameworkEvidenceViewer

  components/
    shared mobile-only constellation primitives
    mobile top bar
    mobile overview surface
    mobile spatial context
    other genuinely reusable mobile prototype primitives

This is conceptual guidance, not a mandatory exact directory structure.

Choose the smallest sensible component architecture.

Avoid over-engineering.

Do not create abstraction merely for abstraction's sake.


==================================================
5. CREATE ONE CONTINUOUS INTERACTIVE EXPERIENCE
==================================================

The primary mobile prototype should now be navigable through actual
interactions rather than the A–N selector.

The experience should support the architecture already established.

CASE STUDIES PATH:

Atlas Landing
→ tap Case Studies
→ Case Studies awakened
→ Case Studies Overview
→ EXPLORE
→ Case Studies Focus Mode
→ tap Agentic Insurance
→ Agentic Insurance awakened
→ Agentic Insurance Overview
→ EXPLORE
→ Agentic Insurance Reading
→ tap Evidence
→ Evidence Viewer
→ close
→ return to same reading context


FRAMEWORKS PATH:

Atlas Landing
→ tap Frameworks
→ Frameworks awakened
→ Frameworks Overview
→ EXPLORE
→ Frameworks Focus Mode
→ tap Behavioral Architecture / existing corresponding framework node
→ framework awakened
→ framework Overview
→ EXPLORE
→ framework deeper view
→ tap interactive evidence/artifact
→ framework evidence viewer
→ close
→ return to same framework context


Do not build additional systems in this pass.

Experiments does not need its complete deep path yet.


==================================================
6. PRESERVE BACK NAVIGATION
==================================================

Back navigation must respect the depth hierarchy.

Examples:

Evidence
→ returns to exact reading position

Project Reading
→ Project Overview

Project Overview
→ Case Studies Focus

Case Studies Focus
→ Case Studies Overview

Case Studies Overview
→ Atlas Landing

Framework Evidence
→ exact framework layer/context

Framework Reading
→ Framework Overview

Framework Overview
→ Frameworks Focus

Frameworks Focus
→ Frameworks Overview

Frameworks Overview
→ Atlas Landing


Do not flatten navigation into generic browser-like screen replacement.

Preserve the conceptual depth of Atlas.


==================================================
7. PRESERVE CONTEXT
==================================================

Do not reset context unnecessarily.

When closing Evidence:

return to the same section and approximate reading position.

When backing out of a project:

preserve the Case Studies Focus context.

When backing out of a framework layer:

preserve the selected framework context.

The prototype should begin establishing the principle:

ENTER DEEPER
→ inspect/read
→ RETURN
→ recover previous context


==================================================
8. DEVELOPMENT-ONLY STATE NAVIGATION
==================================================

The A–N selector is no longer part of the mobile product experience.

However, direct state access is still useful while designing.

Preserve or rebuild a SMALL DEVELOPMENT-ONLY state switcher outside the
mobile viewport.

It may allow direct access to semantic states such as:

Landing
System Overview
Case Studies Focus
Project Overview
Reading
Evidence
Frameworks Focus
Framework Overview
Framework Reading
Framework Evidence

This control must:

- remain outside the 390 × 844 product viewport
- be clearly identified as prototype/development tooling
- not appear inside the actual mobile experience
- not affect the mobile design
- not be treated as production navigation

Letter labels A–N may remain in this development control temporarily
only if useful for comparison.

They must not remain inside product state logic.


==================================================
9. KEEP DESKTOP COMPLETELY PROTECTED
==================================================

Do not refactor desktop into a desktop/ directory merely for symmetry.

Do not reorganize existing desktop files during this pass.

Do not attempt to create the final production responsive architecture.

Do not add breakpoint-driven switching between desktop and mobile.

Do not merge desktop and mobile components.

Do not attempt to determine which production components will eventually
be shared.

That reconciliation will happen later in Codex.

For now:

DESKTOP
= existing implementation, untouched

MOBILE
= isolated interactive architecture prototype


==================================================
10. MOBILE ENTRY POINT
==================================================

Keep the current prototype access mechanism if necessary so the mobile
prototype remains independently viewable.

If the existing URL/query gate is currently used to access the mobile
prototype, preserve it unless a very small cleanup is required.

Do not introduce viewport detection yet.

Do not automatically replace desktop based on screen width.

We are NOT implementing production responsive behavior in this pass.


==================================================
11. SHARED CONTENT
==================================================

Do not duplicate or rewrite content unnecessarily.

Where practical, reference existing Atlas data/content rather than
creating mobile-specific copies.

However:

Do NOT perform a broad production content refactor simply to accomplish
this.

If safely sharing existing content would require modifying desktop
architecture, preserve the current prototype data approach for now.

Desktop stability takes priority.


==================================================
12. VISUAL FREEZE
==================================================

Treat the currently approved mobile architecture as visually frozen for
this pass.

Do not:

- adjust typography
- change spacing for aesthetic reasons
- reposition nodes for aesthetic reasons
- alter colors
- change constellation density
- rewrite copy
- redesign Overview surfaces
- redesign Evidence
- redesign Framework reading
- add animations for polish
- introduce new navigation patterns
- introduce new UI chrome

Only make visual changes that are strictly necessary to preserve the
existing appearance after component extraction.


==================================================
13. CLEAN UP EXPLORATION-ONLY CODE
==================================================

After the semantic prototype architecture is working:

Identify code that existed only to present A–N as static review frames.

Remove exploration-only duplication where it is safe.

Do not aggressively delete anything if its purpose is uncertain.

Prefer preservation over destructive cleanup.

Do not remove the development state switcher described above.


==================================================
14. VERIFY THE PROTOTYPE
==================================================

After restructuring, verify:

1. Desktop Atlas still loads exactly as before.

2. Mobile Atlas prototype loads independently.

3. Mobile Landing works.

4. Case Studies can be awakened.

5. Case Studies Overview can be entered.

6. EXPLORE enters Case Studies Focus.

7. Agentic Insurance can be selected.

8. Agentic Insurance Overview can be entered.

9. EXPLORE enters Reading.

10. Evidence opens.

11. Evidence closes back to Reading.

12. Frameworks can be entered from Landing.

13. Frameworks Focus works.

14. Behavioral Architecture can be selected.

15. Framework Overview works.

16. Framework deeper view works.

17. Framework evidence/artifact opens.

18. Closing it returns to the previous context.

19. Development state switching still allows us to inspect individual
mobile states.

20. No existing desktop behavior has changed.


==================================================
15. ERROR HANDLING
==================================================

Because this prototype has previously encountered stale state/runtime
issues:

Use explicit semantic state validation.

If a development state value is invalid or obsolete, fall back safely
to the mobile Landing state.

Do not allow an obsolete prototype state to produce a blank preview.

Do not hide runtime errors with optional chaining when the underlying
state is invalid.


==================================================
STOP CONDITION
==================================================

Stop when:

- the existing A–N exploration has been consolidated into semantic
  mobile prototype architecture
- the Case Studies path is interactively traversable
- the Frameworks path is interactively traversable
- Evidence/artifact return behavior works
- desktop remains untouched
- a development-only state switcher remains available
- the mobile prototype is clean enough to continue building without
  returning to the giant exploration component

Do NOT begin production responsive implementation.

Do NOT add Observatory architecture yet.

Do NOT add new mobile states beyond what already exists.

Do NOT spend this pass on visual refinement.

At completion, report:

1. files created
2. files modified
3. components extracted
4. semantic state model
5. transitions wired
6. temporary prototype scaffolding that remains
7. anything intentionally deferred
8. confirmation that desktop Atlas was not modified