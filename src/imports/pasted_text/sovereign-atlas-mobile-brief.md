We are beginning the mobile adaptation of Sovereign Atlas.

Before making any design or architectural changes, read the attached:

sovereign-atlas-mobile-design-contract.md

Treat this document as the binding constraint layer for all mobile work.

Then inspect these repositories before designing:

DESIGN SOURCE OF TRUTH
@GitHub Use the latest main branch of:
wchiu111/sovereign-design-system

Use this as the visual, interaction, and design-reasoning source of truth.

IMPLEMENTATION REFERENCE
@GitHub Use the latest main branch of:
wchiu111/sovereign-ux-atlas

Use this to understand the established implementation architecture, components, content structure, routing, and existing behavior patterns.

CURRENT PRODUCT REALITY
@GitHub Use the latest staging branch of:
wchiu111/sovereign-ux-atlas-staging

Use this as the most current source of truth for the actual Atlas experience, including the latest UI, content, interactions, and behavior.

If sovereign-ux-atlas/main and sovereign-ux-atlas-staging/staging conflict in current UI, content, or behavior, the latest staging implementation wins.

IMPORTANT:
Do not begin by generically “making the website responsive.”

First understand how the current Atlas landing experience works and identify which desktop assumptions break at a 390 × 844 portrait viewport.

The objective is:

Preserve the system.
Adapt the interaction.

We are NOT designing a separate mobile product.

We are NOT redesigning the information architecture.

We are NOT converting Atlas into a conventional mobile portfolio.

We are establishing how the existing Sovereign Atlas spatial system changes form on a small touch-first viewport without changing its identity.

PHASE 1 — ATLAS LANDING ONLY

Create a new mobile exploration section in this cloned Figma file.

Do not modify, move, delete, resize, or restructure any existing desktop frames or components.

Create one primary mobile frame:

390 × 844 px

Adapt ONLY the current Atlas landing experience.

The mobile landing must preserve:

• Sovereign Atlas identity
• central Atlas nexus
• Case Studies
• Experiments
• Frameworks
• relationships between those systems and the nexus
• existing stellar colors
• starfield / atmospheric depth
• established typography and visual language
• Search
• Observatory entry
• existing content hierarchy

You MAY adapt:

• constellation geometry
• orbit radius
• system positioning
• node spacing
• label positioning
• visual density
• decorative particle density
• typography sizing where readability requires it
• touch target dimensions
• portrait framing

Do not mechanically scale the desktop constellation down until it fits.

Instead, recompose the existing spatial relationships for a portrait viewport.

Relationships and hierarchy are more important than preserving exact desktop coordinates.

TOUCH BEHAVIOR

The desktop experience relies on mouse hover and click.

Mobile cannot depend on hover.

For this first exploration, establish a touch-capable node state that can support:

Tap
→ node awakens / becomes selected
→ contextual information becomes available
→ user can intentionally enter the system

Do not invent a completely new navigation system to solve this.

Important interactive targets should have approximately 44 × 44 px minimum touch areas even when the visible stellar node remains visually small.

Do not make the constellation visually oversized simply to achieve touch accessibility. Invisible hit areas may surround nodes.

DO NOT INTRODUCE:

• bottom navigation
• Home tab
• Explore tab
• Discover
• Feed
• Library
• mobile dashboard
• card-based replacement for the Atlas
• list-based replacement for the constellation
• new destinations
• new information architecture
• rewritten project content
• new visual language
• arbitrary mobile conventions that do not exist conceptually in Atlas

Do not design System Focus yet.

Do not design project selection yet.

Do not design Focused Overview yet.

Do not design Reading Mode yet.

Do not redesign Observatory yet.

Do not design tablet or landscape layouts yet.

This phase exists to answer one question:

How does the existing Sovereign Atlas landing experience inhabit a 390 × 844 touch-first portrait viewport while still unmistakably feeling like Sovereign Atlas?

Use the desktop Atlas as the baseline for identity, hierarchy, relationships, content, and behavior intent — not as a coordinate template.

Before finalizing the frame, evaluate:

1. Are Case Studies, Experiments, and Frameworks immediately understandable?

2. Does the central nexus still feel like the organizing center of the Atlas?

3. Are the relationships between systems preserved?

4. Are labels readable without overwhelming the constellation?

5. Are primary nodes comfortably touchable?

6. Does the composition feel intentionally designed for portrait rather than scaled down from desktop?

7. Does it still unmistakably feel like the existing Sovereign Atlas?

If solving a mobile constraint would require changing the conceptual model or information architecture, do not make that change. Flag it for review instead.

STOP CONDITION:

Complete only the 390 × 844 Atlas landing exploration.

Do not continue into deeper Atlas states.

Do not propagate the design across the rest of the file.

Stop after the landing screen so we can review and establish the mobile spatial grammar before proceeding.