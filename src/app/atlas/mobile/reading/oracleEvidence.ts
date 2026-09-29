import wireframes from "../../../../imports/case-studies/oracle/01-context/1-wireframes.png";
import micrositeOverview from "../../../../imports/case-studies/oracle/01-context/2-microsite-overview.png";

import cardFailureOne from "../../../../imports/case-studies/oracle/02-problem/1-card-failure.png";
import cardFailureTwo from "../../../../imports/case-studies/oracle/02-problem/2-card-failure.png";

import heroExplorationOne from "../../../../imports/case-studies/oracle/03-approach/1-hero-exploration.png";
import heroExplorationTwo from "../../../../imports/case-studies/oracle/03-approach/2-hero-exploration.png";
import heroResult from "../../../../imports/case-studies/oracle/03-approach/3-hero-result.png";
import choreographyMap from "../../../../imports/case-studies/oracle/03-approach/4-choreography-map.png";

import productExplorerOne from "../../../../imports/case-studies/oracle/04-decisions/1-product-explorer.png";
import productExplorerTwo from "../../../../imports/case-studies/oracle/04-decisions/2-product-explorer.png";
import modularContentOne from "../../../../imports/case-studies/oracle/04-decisions/3-modular-content.png";
import modularContentTwo from "../../../../imports/case-studies/oracle/04-decisions/4-modular-content.png";

import responsiveFinalExperience from "../../../../imports/case-studies/oracle/05-outcomes/3-responsive-final-experience.png";

import type { MobileEvidenceItem } from "./mobileReadingTypes";

export const ORACLE_EVIDENCE: readonly MobileEvidenceItem[] = [
  {
    id: "structuring-dense-product-story",
    sectionId: "context",
    insertAfterParagraph: 1,
    image: wireframes,
    imageFit: "contain",
    alt: "Early Oracle Higher Education microsite wireframes",
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
    sectionId: "context",
    insertAfterParagraph: 4,
    image: micrositeOverview,
    imageFit: "contain",
    alt: "Oracle Higher Education microsite overview",
    number: "02",
    title: "Microsite Overview",
    type: "Experience Architecture",
    description:
      "A broader view of the experience showing how the hero, product exploration, customer proof, resources, and conversion points were organized into a single customer journey.",
    caption:
      "The page was designed as a sequence of questions and answers, moving from industry context toward specific products and next actions.",
  },
  {
    id: "fixed-card-assumption",
    sectionId: "problem",
    insertAfterParagraph: 1,
    image: cardFailureOne,
    imageFit: "contain",
    alt: "Initial fixed product card concept",
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
    sectionId: "problem",
    insertAfterParagraph: 4,
    image: cardFailureTwo,
    imageFit: "contain",
    alt: "Product card layout showing content limitations",
    number: "02",
    title: "When Consistency Became a Constraint",
    type: "Design Finding",
    description:
      "The card model broke down when products required different numbers of links, supporting examples, and levels of explanation.",
    caption:
      "The failure clarified that the system needed to adapt to product variation rather than conceal it.",
  },
  {
    id: "hero-exploration-isolated",
    sectionId: "approach",
    insertAfterParagraph: 3,
    image: heroExplorationOne,
    imageFit: "contain",
    alt: "Oracle hero exploration with isolated icons",
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
    sectionId: "approach",
    insertAfterParagraph: 3,
    image: heroExplorationTwo,
    imageFit: "contain",
    alt: "Oracle hero exploration with connected product icons",
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
    sectionId: "approach",
    insertAfterParagraph: 5,
    image: heroResult,
    imageFit: "contain",
    alt: "Final Oracle Higher Education hero design",
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
    sectionId: "approach",
    insertAfterParagraph: 7,
    image: choreographyMap,
    imageFit: "contain",
    alt: "Information choreography map showing the Oracle reading sequence",
    number: "04",
    title: "Information Choreography",
    type: "Content Strategy",
    description:
      "A retrospective map showing how each section answered the question created by the section before it—from industry challenge to platform, product exploration, proof, and next steps.",
    caption:
      "Good design does not only organize content. It orchestrates the order in which understanding happens.",
  },
  {
    id: "product-explorer-student-cloud",
    sectionId: "decisions",
    insertAfterParagraph: 1,
    image: productExplorerOne,
    imageFit: "contain",
    alt: "Oracle product explorer showing Student Cloud",
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
    sectionId: "decisions",
    insertAfterParagraph: 3,
    image: productExplorerTwo,
    imageFit: "contain",
    alt: "Oracle product explorer showing HCM",
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
    sectionId: "decisions",
    insertAfterParagraph: 4,
    image: modularContentOne,
    imageFit: "contain",
    alt: "Oracle supporting content modules",
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
    sectionId: "decisions",
    insertAfterParagraph: 5,
    image: modularContentTwo,
    imageFit: "contain",
    alt: "Additional Oracle supporting content modules",
    number: "04",
    title: "A Flexible Content System",
    type: "Modular Content",
    description:
      "Additional content patterns demonstrated how different kinds of proof and resources could remain visually coherent within the same experience.",
    caption:
      "The system preserved a shared hierarchy while allowing each content type to serve a different purpose.",
  },
  {
    id: "responsive-final-experience",
    sectionId: "outcomes",
    insertAfterParagraph: 3,
    image: responsiveFinalExperience,
    imageFit: "contain",
    alt: "Oracle Higher Education microsite across desktop, tablet, and mobile",
    number: "01",
    title: "One Experience Across Screen Sizes",
    type: "Responsive Design",
    description:
      "The final microsite preserved the core narrative, product exploration, and conversion path across desktop, tablet, and mobile layouts.",
    caption:
      "Responsiveness was treated as preservation of hierarchy and purpose, not simply compression of the desktop layout.",
  },
] as const;
