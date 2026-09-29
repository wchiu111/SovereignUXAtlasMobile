We are refining the mobile interaction architecture based on the approved Phase 1 exploration.

IMPORTANT CONCEPTUAL CORRECTION:

The previous “Case Studies Preview” should no longer be treated as a temporary preview before entering Overview.

Once Case Studies has been activated and brought into focus, the user is already inside the Case Studies Overview.

The bottom-origin surface is the mobile version of the Overview experience.

Desktop:
right-side Overview drawer

Mobile:
bottom-origin Overview surface that can expand / scroll vertically

Therefore the mobile sequence is now:

A — ATLAS ARRIVAL
→ B — CASE STUDIES ACTIVATED
→ C — CASE STUDIES OVERVIEW · INITIAL
→ D — CASE STUDIES OVERVIEW · SCROLLED
→ E — FOCUS MODE

For this pass, build only A, B, C, and D.

DO NOT build E yet.


SOURCE HIERARCHY

Continue using:

1. sovereign-atlas-mobile-design-contract.md
   Governing constraint layer.

2. Current approved mobile State A and State B
   Visual/compositional source of truth.

3. The Mobile Experience Moodboard
   Behavioral/mechanics reference.

4. Existing desktop Atlas Overview behavior/content
   Structural reference for what Overview contains.

Do not redesign the information architecture.


STATE A — ATLAS ARRIVAL

KEEP AS-IS.

Do not modify.


STATE B — CASE STUDIES ACTIVATED

KEEP the current spatial focus mechanic:

• Case Studies becomes the dominant centered constellation
• project nodes become visible/legible
• Experiments fades
• Frameworks fades
• Sovereign Design remains quiet ancestry/context

Do not add Overview content yet.

This remains the spatial transition state.


STATE C — CASE STUDIES OVERVIEW · INITIAL

Replace the idea of “preview” with the initial Overview state.

Case Studies remains centered and dominant in the upper portion of the viewport.

The other systems and Sovereign Design remain faded as background ancestry.

Introduce the bottom-origin Overview surface.

This surface is NOT a temporary card.

It is the beginning of the actual Case Studies Overview.

The initial visible content should include:

CASE STUDIES
4 PROJECTS

Real-world product work, decisions, and outcomes.

EXPLORE →

The Overview surface should begin low enough that the focused constellation remains visibly present above it.

The composition should communicate:

“I am now inside Case Studies, and this is its Overview.”

Do not make it look like a modal confirmation step.

Do not require another “enter Case Studies” action.

The user is already there.


EXPLORE CTA — NEW MEANING

EXPLORE → does NOT mean “enter Case Studies.”

The user is already inside the Case Studies Overview.

EXPLORE → means:

Enter Case Studies Focus Mode

Do not build Focus Mode yet.

Only preserve this meaning in the design.


STATE D — CASE STUDIES OVERVIEW · SCROLLED

Create one additional 390 × 844 prototype state showing what happens when the user scrolls downward inside the Overview.

This state exists to define the mobile relationship between:

• spatial constellation context
• Overview reading content
• scrolling behavior
• Explore CTA
• the transition from spatial navigation into reading

Use the existing desktop Case Studies Overview content structure as the reference.

The scrolled mobile Overview should reveal the existing Overview information progressively.

Include the same conceptual information currently used in Overview, such as:

WHAT
WHY
RESEARCH FOCUS
KEY DISCOVERY

Use the real existing Case Studies Overview content where available.

Do not invent new project copy.


SCROLL BEHAVIOR HYPOTHESIS

Prototype the following behavior:

At the top of Overview:

• focused Case Studies constellation remains substantially visible
• Overview begins from the bottom of the viewport

As the user scrolls downward:

• Overview content becomes the primary surface
• the constellation may move upward, crop, reduce in prominence, or become atmospheric
• spatial ancestry may gradually fade
• content becomes easier to read
• the user should still understand that this content belongs to Case Studies

Do NOT abruptly replace the constellation with a completely unrelated page.

The transition should feel continuous.


IMPORTANT DESIGN QUESTION

We are testing:

How does Atlas transition from spatial navigation into reading on a small screen without feeling like the user has left the Atlas?

Design State D specifically to answer this.


OVERVIEW SURFACE

The Overview surface may use:

• dark translucent / near-opaque Atlas surface
• existing typography
• existing system colors
• restrained dividers
• established Overview labels
• vertical rhythm suited to reading

It should NOT feel like:

• a generic bottom sheet component
• a modal
• a mobile app card
• a completely separate webpage


SHEET / SURFACE HEIGHT

Refine the current surface so the initial State C does not reserve excessive empty space.

The amount visible initially should be driven by content.

Avoid a large fixed-height panel with empty vertical space.

It may visually begin as a shallow Overview surface and become naturally taller through scrolling.


HANDLE

The handle is optional.

If the Overview is intended to behave as a scrolling content surface rather than a draggable multi-state sheet, remove the handle.

Choose whichever treatment communicates the behavior more clearly.


EXPLORE PLACEMENT

Explore should remain discoverable.

Test whether it works best:

• in the initial Overview block
• as a persistent but restrained CTA
• or as a clear action near the top of the Overview content

Do not make it dominate the reading experience.

Do not move it into conventional mobile bottom navigation.


PROTOTYPE STORYBOARD

Show these four 390 × 844 states:

A — ATLAS ARRIVAL
Full top-level Atlas.

B — CASE STUDIES ACTIVATED
Case Studies spatially moves into focus.

C — CASE STUDIES OVERVIEW · INITIAL
Overview begins from bottom while constellation remains visible.

D — CASE STUDIES OVERVIEW · SCROLLED
Overview content becomes primary as the user scrolls while spatial context recedes gracefully.

Do not build:

E — Focus Mode

yet.


DO NOT:

• redesign State A
• redesign the Case Studies constellation
• introduce new navigation destinations
• add bottom navigation
• convert Overview into cards
• build individual project navigation
• build project Focus Mode
• build project reading mode
• modify desktop Atlas
• implement production responsive architecture


STOP CONDITION

Stop when A, B, C, and D are visually complete and reviewable.

We will review how the Overview behaves before defining what EXPLORE → does visually when it enters Focus Mode.