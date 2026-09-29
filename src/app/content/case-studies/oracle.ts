import { defineAtlasEntry } from "../defineAtlasEntry";

import wireframes from "../../../imports/case-studies/oracle/01-context/1-wireframes.png";
import micrositeOverview from "../../../imports/case-studies/oracle/01-context/2-microsite-overview.png";
import cardFailureOne from "../../../imports/case-studies/oracle/02-problem/1-card-failure.png";
import cardFailureTwo from "../../../imports/case-studies/oracle/02-problem/2-card-failure.png";
import heroExplorationOne from "../../../imports/case-studies/oracle/03-approach/1-hero-exploration.png";
import heroExplorationTwo from "../../../imports/case-studies/oracle/03-approach/2-hero-exploration.png";
import heroResult from "../../../imports/case-studies/oracle/03-approach/3-hero-result.png";
import choreographyMap from "../../../imports/case-studies/oracle/03-approach/4-choreography-map.png";
import productExplorerOne from "../../../imports/case-studies/oracle/04-decisions/1-product-explorer.png";
import productExplorerTwo from "../../../imports/case-studies/oracle/04-decisions/2-product-explorer.png";
import modularContentOne from "../../../imports/case-studies/oracle/04-decisions/3-modular-content.png";
import modularContentTwo from "../../../imports/case-studies/oracle/04-decisions/4-modular-content.png";
import responsiveFinalExperience from "../../../imports/case-studies/oracle/05-outcomes/3-responsive-final-experience.png";

const focus = {
  headline: "Oracle Higher Education",
  subheadline:
    "Translating a complex enterprise product ecosystem into a clearer, more adaptable customer experience.",
  sections: [
    {
      id: "context",
      label: "Context",
      accentStellarType: "relational",
      subtitle: "Designing a clearer entry point into a complex product portfolio",
      readingTime: 3,
      content: `Oracle offered a broad set of cloud products for higher education, including student systems, human capital management, enterprise resource planning, platform services, and infrastructure.

Each product had its own content, links, screenshots, and supporting resources. But visitors were not arriving with an understanding of Oracle’s internal product structure.

They were arriving with practical questions:

• Which products apply to my institution?
• How do these products work together?
• What does each product actually look like?
• Where should I begin?

The experience needed to translate Oracle’s portfolio into a story that made sense from the customer’s point of view.

I worked across wireframing, content structure, visual design, component exploration, responsive behavior, and final implementation review to help shape the Higher Education microsite.`,
      insight:
        "The challenge was not presenting more Oracle products. It was giving visitors a structure through which they could understand how those products related to their own goals.",
      evidence: [
        {
          id: "structuring-dense-product-story",
          image: wireframes,
          alt: "Early Oracle Higher Education microsite wireframes",
          imageFit: "contain",
          number: "01",
          title: "Structuring a Dense Product Story",
          type: "Wireframing",
          description:
            "Early page structures explored how product, solution, resource, and supporting content could unfold as one coherent journey rather than a collection of disconnected sections.",
          caption:
            "The wireframes established the hierarchy before visual styling, helping the team decide what needed emphasis and what could remain secondary.",
        },
        {
          id: "microsite-overview",
          image: micrositeOverview,
          alt: "Oracle Higher Education microsite overview",
          imageFit: "contain",
          number: "02",
          title: "Microsite Overview",
          type: "Experience Architecture",
          description:
            "A broader view of the experience showing how the hero, product exploration, customer proof, resources, and conversion points were organized into a single customer journey.",
          caption:
            "The page was designed as a sequence of questions and answers, moving from industry context toward specific products and next actions.",
        },
      ],
    },
    {
      id: "problem",
      label: "The Problem",
      accentStellarType: "risk",
      subtitle: "Creating consistency without pretending every product was the same",
      readingTime: 3,
      content: `The information was dense, technical, and uneven.

Some products had several supporting links. Others had fewer. Some needed interface previews. Others required more explanation. A single fixed component could not accommodate every product without creating awkward gaps, inconsistent page heights, or an incomplete experience.

At the same time, the page still needed to feel cohesive and remain aligned with Oracle’s broader design system.

The core problem became:

How do we create consistency without forcing every product into the same content model?

The initial card-based direction exposed the limitation. It assumed uniform content, but the real portfolio contained meaningful variation.`,
      insight:
        "A reusable component becomes a constraint when it requires the content to behave more consistently than the real system does.",
      evidence: [
        {
          id: "fixed-card-assumption",
          image: cardFailureOne,
          alt: "Initial fixed product card concept",
          imageFit: "contain",
          number: "01",
          title: "The Fixed-Card Assumption",
          type: "Component Exploration",
          description:
            "The first direction organized products into a uniform card system with fixed content areas and predictable link placement.",
          caption:
            "The structure looked consistent, but it depended on every product having the same amount and type of information.",
        },
        {
          id: "when-consistency-became-constraint",
          image: cardFailureTwo,
          alt: "Product card layout showing content limitations",
          imageFit: "contain",
          number: "02",
          title: "When Consistency Became a Constraint",
          type: "Design Finding",
          description:
            "The card model broke down when products required different numbers of links, supporting examples, and levels of explanation.",
          caption:
            "The failure clarified that the system needed to adapt to product variation rather than conceal it.",
        },
      ],
    },
    {
      id: "approach",
      label: "Approach",
      accentStellarType: "strategy",
      subtitle: "Treating the page as an information system",
      readingTime: 4,
      content: `I treated the page as an information system rather than a collection of marketing sections.

The work focused on three connected layers.

Narrative:
The page needed to move from the higher-education challenge into Oracle’s role, then into specific products, examples, proof, and next steps.

Visual explanation:
Icons, imagery, interface previews, and content groupings needed to explain relationships rather than decorate the page.

Component flexibility:
The system needed reusable patterns, but those patterns had to accommodate variation across products and content types.

This meant exploring multiple ways to introduce the platform, structure the product portfolio, and reveal supporting information without turning the page into a long, undifferentiated list.`,
      insight:
        "The page did not need to expose every detail at once. It needed to reveal the right information at the moment it became useful.",
      evidence: [
        {
          id: "hero-exploration-isolated",
          image: heroExplorationOne,
          alt: "Oracle hero exploration with isolated icons",
          imageFit: "contain",
          number: "01",
          title: "Hero Exploration: Isolated Products",
          type: "Visual Narrative",
          description:
            "An early hero direction used product icons as separate visual elements around the central image.",
          caption:
            "The composition introduced the product set, but the relationship between those products remained unclear.",
        },
        {
          id: "hero-exploration-connected",
          image: heroExplorationTwo,
          alt: "Oracle hero exploration with connected product icons",
          imageFit: "contain",
          number: "02",
          title: "Hero Exploration: Connected Platform",
          type: "Visual Narrative",
          description:
            "A second direction connected the icon system into a unified visual structure to communicate that the products belonged to one cloud platform.",
          caption:
            "The iconography shifted from decoration to explanation by making the platform relationship visible.",
        },
        {
          id: "final-platform-story",
          image: heroResult,
          alt: "Final Oracle Higher Education hero design",
          imageFit: "contain",
          number: "03",
          title: "Establishing the Platform Story",
          type: "Final Direction",
          description:
            "The final hero combined a human-centered image with a connected product system, introducing both the higher-education audience and Oracle’s role.",
          caption:
            "The opening needed to establish relevance before asking visitors to explore individual products.",
        },
        {
          id: "information-choreography",
          image: choreographyMap,
          alt: "Information choreography map showing the Oracle reading sequence",
          imageFit: "contain",
          number: "04",
          title: "Information Choreography",
          type: "Content Strategy",
          description:
            "A retrospective map showing how each section answered the question created by the section before it—from industry challenge to platform, product exploration, proof, and next steps.",
          caption:
            "Good design does not only organize content. It orchestrates the order in which understanding happens.",
        },
      ],
    },
    {
      id: "decisions",
      label: "Key Decisions",
      accentStellarType: "judgment",
      subtitle: "Changing the content model instead of restyling the cards",
      readingTime: 4,
      content: `The strongest decision was to replace the fixed product-card model with a flexible product explorer.

Product categories remained visible at a glance. Selecting a category revealed its related links and updated the adjacent interface preview. This created a stronger connection between the product name, its supporting content, and what the experience actually looked like.

The interaction also introduced progressive disclosure.

Not every product detail needed to appear simultaneously. Visitors could begin with the overall portfolio, then move deeper when a category became relevant to them.

Supporting content followed the same hierarchy. Customer stories, news, and resources remained available, but they were positioned as proof and deeper pathways rather than competing with the primary product journey.

The design system remained consistent, but the underlying content model became flexible enough to reflect real differences across the portfolio.`,
      insight:
        "The final direction did not merely restyle the original cards. It changed how product information was organized, connected, and revealed.",
      evidence: [
        {
          id: "product-explorer-student-cloud",
          image: productExplorerOne,
          alt: "Oracle product explorer showing Student Cloud",
          imageFit: "contain",
          number: "01",
          title: "Product Explorer: Student Cloud",
          type: "Interaction Design",
          description:
            "Selecting a product category revealed relevant links and updated the adjacent interface preview, connecting the product label to something tangible.",
          caption:
            "The component supported exploration without requiring every product detail to remain visible at once.",
        },
        {
          id: "product-explorer-hcm",
          image: productExplorerTwo,
          alt: "Oracle product explorer showing HCM",
          imageFit: "contain",
          number: "02",
          title: "Product Explorer: HCM",
          type: "Interaction State",
          description:
            "A second state demonstrated that the same interaction model could adapt to a different product category and a different set of supporting links.",
          caption:
            "Consistency came from the interaction pattern, not from forcing every product into identical content.",
        },
        {
          id: "supporting-content-system-one",
          image: modularContentOne,
          alt: "Oracle supporting content modules",
          imageFit: "contain",
          number: "03",
          title: "Supporting the Primary Journey",
          type: "Modular Content",
          description:
            "Customer proof, news, and additional resources were organized into secondary modules that supported the product story without competing with it.",
          caption:
            "The modules acted as deeper pathways and visual pauses after the main product exploration.",
        },
        {
          id: "supporting-content-system-two",
          image: modularContentTwo,
          alt: "Additional Oracle supporting content modules",
          imageFit: "contain",
          number: "04",
          title: "A Flexible Content System",
          type: "Modular Content",
          description:
            "Additional content patterns demonstrated how different kinds of proof and resources could remain visually coherent within the same experience.",
          caption:
            "The system preserved a shared hierarchy while allowing each content type to serve a different purpose.",
        },
      ],
    },
    {
      id: "outcomes",
      label: "Outcomes",
      accentStellarType: "agentic",
      subtitle: "A coherent experience that could support complexity without exposing it all at once",
      readingTime: 3,
      content: `The final experience brought a large product portfolio into a more coherent customer journey.

The page introduced Oracle’s higher-education platform through a clearer visual narrative, made several product categories easier to compare and explore, and supported variable product content within a consistent system.

It also reduced the need to show every detail simultaneously. Visitors could understand the overall portfolio first, then reveal specific products, supporting links, and interface examples as needed.

The experience remained usable across desktop, tablet, and mobile while aligning with Oracle’s broader visual and content standards.

I do not have reliable product-performance metrics for this specific experience, so I would not attach conversion or engagement claims to it.

The value of the work is visible in the system itself: the final design supports complexity without requiring the visitor to absorb all of that complexity at once.`,
      insight:
        "The outcome was not a simpler product portfolio. It was a clearer path through the complexity that already existed.",
      evidence: [
        {
          id: "responsive-final-experience",
          image: responsiveFinalExperience,
          alt: "Oracle Higher Education microsite across desktop, tablet, and mobile",
          imageFit: "contain",
          number: "01",
          title: "One Experience Across Screen Sizes",
          type: "Responsive Design",
          description:
            "The final microsite preserved the core narrative, product exploration, and conversion path across desktop, tablet, and mobile layouts.",
          caption:
            "Responsiveness was treated as preservation of hierarchy and purpose, not simply compression of the desktop layout.",
        },
      ],
    },
    {
      id: "lessons",
      label: "Lessons",
      accentStellarType: "purpose",
      subtitle: "What enterprise microsite work taught me about translation",
      readingTime: 3,
      content: `At the time, I saw much of this work as microsite and campaign design.

Looking back, the more important lesson was about translation.

The challenge was not making Oracle’s portfolio appear simpler than it was. The challenge was giving people a structure through which they could understand that complexity.

I learned that:

• consistency should not erase meaningful content differences
• reusable components need to accommodate variation
• visual design can explain system relationships
• progressive disclosure can reduce cognitive load without removing depth
• enterprise UX often begins with content structure before interface behavior

That lesson continued into my later work on enterprise workflows and AI systems.

People do not need every detail at once. They need the right detail at the moment it becomes useful.`,
      insight:
        "Oracle was where I began learning that product design is not only about arranging interfaces. It is about guiding the order in which understanding happens.",
      evidence: [],
    },
  ],
};

export default defineAtlasEntry({
  id: "oracle",
  category: "case-study",
  signatureStellarType: "relational",
  title: "ORACLE",
  subtitle:
    "Translating a complex enterprise cloud portfolio into a clearer, more adaptable customer experience.",
  tags: ["INFORMATION CHOREOGRAPHY", "JOURNEY"],
  overview: {
    what:
      "A Higher Education microsite that organized Oracle’s cloud products into a clearer narrative and interactive product experience.",
    why:
      "Visitors needed to understand how a broad and uneven product portfolio connected to their institution’s goals without absorbing every technical detail at once.",
    researchFocus:
      "Information hierarchy, content variability, progressive disclosure, responsive behavior, and visual storytelling across an enterprise product ecosystem.",
    keyDiscovery:
      "Consistency should come from a shared interaction and hierarchy—not from forcing every product into the same content structure.",
  },
  orbit: {
    angle: 145,
    radius: 115,
    speed: 0.95e-4,
    starPrefix: "orc",
  },
  overviewStars: [
    {
      id: "context",
      label: "CONTEXT",
      angle: 168,
      x: -1.15,
      y: 0.25,
      scale: 0.96,
      stellarType: "relational",
      intensity: "balanced",
      labelPosition: { side: "left", offset: 30 },
    },
    {
      id: "problem",
      label: "PROBLEM",
      angle: -132,
      x: -0.65,
      y: -0.65,
      scale: 1.02,
      stellarType: "risk",
      intensity: "bright",
      labelPosition: { side: "top", offset: 30 },
    },
    {
      id: "approach",
      label: "APPROACH",
      angle: -96,
      x: -0.05,
      y: -0.62,
      scale: 1.15,
      stellarType: "strategy",
      intensity: "bright",
      labelPosition: { side: "top", offset: 32 },
    },
    {
      id: "decisions",
      label: "DECISIONS",
      angle: -63,
      x: 0.45,
      y: -0.88,
      scale: 1.12,
      stellarType: "judgment",
      intensity: "bright",
      labelPosition: { side: "top", offset: 32 },
    },
    {
      id: "outcomes",
      label: "OUTCOMES",
      angle: -12,
      x: 1.05,
      y: -0.2,
      scale: 1.05,
      stellarType: "agentic",
      intensity: "bright",
      labelPosition: { side: "right", offset: 30 },
    },
    {
      id: "lessons",
      label: "LESSONS",
      angle: 58,
      x: 0.5,
      y: 0.78,
      scale: 0.98,
      stellarType: "purpose",
      intensity: "balanced",
      labelPosition: { side: "bottom", offset: 30 },
    },
  ],
  constellation: {
    showCenterConnections: false,
    connections: [
      { from: "context", to: "problem", strength: "primary" },
      { from: "context", to: "approach", strength: "secondary" },
      { from: "problem", to: "approach", strength: "primary" },
      { from: "approach", to: "decisions", strength: "primary" },
      { from: "approach", to: "outcomes", strength: "secondary" },
      { from: "decisions", to: "outcomes", strength: "primary" },
      { from: "outcomes", to: "lessons", strength: "primary" },
    ],
  },
  caseStudyId: "oracle",
  focus,
  sections: focus.sections,
});
