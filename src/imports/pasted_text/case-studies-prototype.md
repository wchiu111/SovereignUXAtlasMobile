We have reviewed the Phase 1 mobile prototype.

STATE A — DEFAULT / ARRIVAL is approved as the current visual direction.

Do not redesign State A.

The portrait composition, mosaic-like constellation layout, atmosphere, central Sovereign Design nexus, three-system arrangement, Search placement, and Observatory placement should remain intact for now.

We now need to correct the interaction sequence after the user taps Case Studies.

REFERENCE HIERARCHY

Continue treating:
1. sovereign-atlas-mobile-design-contract.md as the governing constraint layer.
2. The current approved State A as the visual/compositional source of truth for mobile.
3. The supplied Mobile Experience Moodboard as the behavioral/mechanics reference.

Do not copy the moodboard literally. Use it to understand the intended interaction sequence.

The mobile interaction model is:

ARRIVAL
→ ACTIVATE
→ PREVIEW
→ ENTER

For this pass, build only ARRIVAL, ACTIVATE, and PREVIEW.

Do not build ENTER yet.


STATE A — ARRIVAL

KEEP AS-IS.

This is the approved default landing state.

Do not reposition the three systems.
Do not redesign the nexus.
Do not change Search.
Do not change Observatory.
Do not change the overall portrait constellation composition.


STATE B — CASE STUDIES ACTIVATED

Replace the current State B behavior.

The existing State B is incorrect because Case Studies remains in the upper-left while explanatory content appears beside it.

Instead, tapping Case Studies should trigger a spatial focus transition.

The selected system becomes the center of attention.

Recompose the scene so:

• Case Studies moves from its upper-left landing position toward the primary focus position near the center of the mobile viewport.
• Case Studies becomes the dominant constellation.
• Its existing child project nodes remain spatially arranged around it and become more visible.
• Relevant child labels may become more legible.
• Experiments fades substantially.
• Frameworks fades substantially.
• Sovereign Design remains visible only as quiet spatial ancestry/context.
• Background atmosphere remains present.
• Orbital relationships may shift/recompose with the transition.
• The user should visually understand “I am now focused on Case Studies” without needing explanatory copy.

IMPORTANT:

Do not display a preview sheet yet.

Do not place explanatory paragraph copy beside Case Studies.

Do not display Explore yet.

State B is purely the spatial activation/focus state.

The movement and hierarchy should communicate the change in context.


STATE C — CASE STUDIES PREVIEW

Create a third prototype state based on the completed State B composition.

Case Studies remains centered and dominant.

Experiments, Frameworks, and Sovereign Design remain faded as contextual ancestry.

Now introduce a restrained bottom preview sheet.

The sheet should feel native to Sovereign Atlas rather than like a generic mobile app card.

It should contain only enough information to orient the user before entering:

CASE STUDIES
4 projects

Real-world product work, decisions, and outcomes.

Explore →

Keep the copy concise.

The focused Case Studies constellation must remain visible above the sheet.

The sheet should support the constellation, not replace it.

Use the existing Atlas visual language:
• dark translucent surface
• restrained borders
• existing typography
• stellar/system color where appropriate
• subtle handle or spatial transition cue if useful

Do not introduce conventional bottom navigation.


INTERACTION STORYBOARD

The three frames should clearly communicate:

A — ARRIVAL

Full Atlas visible.
User sees the universe and chooses a system.

        ↓ tap Case Studies

B — ACTIVATE

Case Studies physically becomes the center of attention.
Its constellation awakens.
Other systems recede.

        ↓ context settles

C — PREVIEW

Case Studies remains spatially focused.
A bottom preview surface appears.
User now has an explicit Explore action.

        ↓ Explore

D — ENTER

DO NOT BUILD D YET.
This will become Phase 2.


DESIGN PRINCIPLE

The interaction should feel like:

“Touch something and the Atlas reorganizes around your attention.”

Do not make this feel like selecting a navigation button and opening a card.

Spatial movement is part of the navigation language.


PROTOTYPE PRESENTATION

Show the three 390 × 844 states side-by-side in the exploration environment:

A — Arrival
B — Case Studies Activated
C — Case Studies Preview

If practical within this isolated prototype, allow the state selector to switch among A, B, and C.

Do not wire this into production Atlas architecture.

Do not modify existing production Atlas components.

Do not begin responsive implementation.

Do not design System Focus beyond this Case Studies preview.

Do not design individual project selection.

Do not design Focused Overview.

Do not design Reading Mode.

Do not redesign Observatory.


STOP CONDITION

Stop when A, B, and C are visually complete and reviewable.

We will review the spatial transition and preview mechanics before defining what happens when the user presses Explore.