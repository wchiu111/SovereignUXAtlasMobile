Atlas V2 — Focus Mode Architecture Refresh (Production Pass)
Objective

Refine the existing Focus Mode experience into a production-ready portfolio reading experience optimized for recruiters, hiring managers, and design leaders.

This is not a redesign.

The visual language, cinematic atmosphere, motion system, typography, and overall layout have already been established and should remain intact.

This pass focuses on improving readability, navigation, shareability, and long-form case study consumption without changing the core experience.

Existing Foundation (Do Not Change)

The following systems are considered complete and should remain unchanged unless required to support the improvements below.

Keep:

Left section navigation
Right evidence rail
Expandable evidence viewer
Focus Mode layout
Existing spacing system
Existing typography
Motion language
Atlas visual identity
Dark cinematic atmosphere

The goal is refinement—not reinvention.

Design Goals

Optimize Focus Mode for:

Editorial readability
Recruiter scanning behavior
Long-form reading
Direct sharing
Professional presentation

The experience should feel less like navigating presentation slides and more like reading a premium digital publication.

Success is measured by clarity rather than visual novelty.

1. Improve Readability

The current interface is visually strong but requires additional contrast for extended reading.

Increase legibility while preserving the existing dark aesthetic.

Adjust only contrast—not typography.

Improve:

Body copy
Metadata
Captions
Supporting text
Divider visibility
Card elevation
Evidence descriptions

Guidelines:

Primary text approximately 15–20% brighter
Secondary text remains visually subordinate
Preserve existing font sizes
Preserve spacing rhythm
Preserve premium editorial appearance
2. Simplify Navigation

Remove interface elements that duplicate existing navigation.

Delete completely:

Previous button
Next button
Carousel pagination dots

Navigation should rely on:

Left navigation
Browser history
Direct URLs
3. Section-Based Routing

Each section should become a unique URL.

Example:

/case-studies/agentic-insurance/context

/case-studies/agentic-insurance/problem

/case-studies/agentic-insurance/approach

/case-studies/agentic-insurance/key-decisions

/case-studies/agentic-insurance/outcomes

/case-studies/agentic-insurance/lessons

Requirements:

URL updates when sections change
Refresh preserves current section
Direct links open immediately into that section
Browser Back/Forward behaves naturally
4. Deep Linking to Evidence

Every evidence artifact should support direct linking.

Example:

/case-studies/agentic-insurance/problem#driver-adjuster-trust-needs

/case-studies/agentic-insurance/key-decisions#decision-why-how

/case-studies/agentic-insurance/outcomes#operational-trust-metrics

Opening a deep link should automatically:

Navigate to the correct section
Open the Evidence Viewer
Focus the requested artifact
Scroll into position if necessary

No additional interaction should be required.

5. Built-In Shareability

Add a subtle Share action to the upper-right header.

Behavior:

When viewing a section:

Copy the current section URL.

When viewing an evidence artifact:

Copy the deep-linked artifact URL.

This should make sharing during interviews frictionless.

Keep the control visually understated.

6. Evidence Rail Refresh

Shift the Evidence panel from a technical asset browser toward a museum-style catalog.

Each artifact should present:

Number
Title
Artifact type
One-sentence narrative description

Example:

03

Decision → Why → How

Interaction Pattern

The recommendation became a doorway into reasoning rather than a final answer.

Reduce emphasis on filenames or implementation metadata.

Increase emphasis on story.

7. Evidence Viewer

Increase the prominence of the artifact itself.

Reduce surrounding whitespace.

Increase usable viewing area.

The artifact—not the surrounding interface—should become the visual focal point.

Maintain existing animation behavior.

8. Reading Orientation

Replace numeric progress indicators.

Instead of:

01 / 06

Display:

Case Study

01 Context

of 06

This should continuously reinforce orientation throughout the reading experience.

9. Reading Time

Display estimated reading time near the beginning of every section.

Example:

Estimated reading time

4 min

This gives recruiters a sense of investment before beginning each section.

10. Preserve Motion Language

Maintain all existing interaction quality.

Do not simplify animations.

Preserve:

Focus transitions
Drawer animations
Evidence expansion
Hover states
Existing cinematic pacing

Motion remains part of the Atlas identity.

11. Information Architecture

Treat each case study as a true document rather than a sequence of slides.

Navigation should communicate:

Case Study

├── Context
├── Problem
├── Approach
├── Key Decisions
├── Outcomes
└── Lessons

Evidence should exist beneath each section as reference material rather than separate pages.

Implementation Constraints

Prioritize removing friction over adding functionality.

Do not introduce additional navigation patterns.

Do not add visual decoration.

Do not increase interface density.

Every change should support one of four goals:

Better readability
Better orientation
Better sharing
Better storytelling
Success Criteria

A recruiter should be able to:

Open any case study directly from a shared URL.
Jump directly to a specific evidence artifact.
Read comfortably for 10–15 minutes without visual fatigue.
Understand where they are at all times.
Share any section or artifact in a single click.
Experience the same premium Atlas aesthetic while feeling like they are reading a polished digital publication rather than navigating a slide deck.