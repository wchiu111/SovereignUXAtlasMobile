import layeredClaimsJourney from "../../../../imports/case-studies/agentic-insurance/01-context/1-layered-claims-journey.png";
import driverJourney from "../../../../imports/case-studies/agentic-insurance/01-context/2-driver-journey.png";
import adjusterJourney from "../../../../imports/case-studies/agentic-insurance/01-context/3-adjuster-journey.png";

import blackBoxMoment from "../../../../imports/case-studies/agentic-insurance/02-problem/1-the-blackbox-moment.png";
import reasoningGapAnalysis from "../../../../imports/case-studies/agentic-insurance/02-problem/2-reasoning-gap-analysis.png";
import initialDashboardAssumption from "../../../../imports/case-studies/agentic-insurance/02-problem/3-initial-dashboard-assumption.png";

import postAccidentEntryFlow from "../../../../imports/case-studies/agentic-insurance/03-approach/1-post-accident-entry-flow.png";
import guidedEvidenceCapture from "../../../../imports/case-studies/agentic-insurance/03-approach/2-guided-evidence-capture.png";
import adjustersClaimOverview from "../../../../imports/case-studies/agentic-insurance/03-approach/3-adjusters-claim-overview.png";

import estimateConfidenceExplanation from "../../../../imports/case-studies/agentic-insurance/04-decisions/1-estimate-confidence-explaination.png";
import contextualClaimReview from "../../../../imports/case-studies/agentic-insurance/04-decisions/2-contextual-claim-review.png";
import editableReserveRecommendation from "../../../../imports/case-studies/agentic-insurance/04-decisions/3-editable-reserve-recommendation.png";

import submissionNextStepVisibility from "../../../../imports/case-studies/agentic-insurance/05-outcomes/1-submission-next-step-visibility.png";
import claimStabilizationStateOne from "../../../../imports/case-studies/agentic-insurance/05-outcomes/2-claim-stabilization-state-1.png";
import claimStabilizationStateTwo from "../../../../imports/case-studies/agentic-insurance/05-outcomes/2-claim-stabilization-state-2.png";
import confidenceVsConsequence from "../../../../imports/case-studies/agentic-insurance/05-outcomes/3-confidence-vs-consequence.png";

import emotionalRepairLayer from "../../../../imports/case-studies/agentic-insurance/06-lessons/1-emotional-repair-layer.png";
import humanOverrideFeedback from "../../../../imports/case-studies/agentic-insurance/06-lessons/2-human-override-feedback.png";

import type { MobileEvidenceItem } from "./mobileReadingTypes";

export const AGENTIC_INSURANCE_EVIDENCE: readonly MobileEvidenceItem[] = [
  {
    id: "layered-claims-journey",
    sectionId: "context",
    insertAfterParagraph: 1,
    image: layeredClaimsJourney,
    imageFit: "contain",
    alt: "Layered claims journey map",
    number: "01",
    title: "Layered Claims Journey",
    type: "Research Mapping",
    description:
      "An early mapping exercise examining the claims experience across interface behavior, emotional response, assumptions, and moments where human reflection needed to re-enter the process.",
    caption:
      "The map separated what users see from what they may feel, assume, and need after an automated decision.",
  },
  {
    id: "driver-journey",
    sectionId: "context",
    insertAfterParagraph: 3,
    image: driverJourney,
    imageFit: "contain",
    alt: "Driver journey map",
    number: "02",
    title: "Driver Journey",
    type: "Journey Map",
    description:
      "A journey model focused on the driver’s need for reassurance, guided evidence capture, and visibility into what happens after submission.",
    caption:
      "The driver journey helped identify where uncertainty builds and where the experience needed to offer clearer orientation and next steps.",
  },
  {
    id: "adjuster-journey",
    sectionId: "context",
    insertAfterParagraph: 3,
    image: adjusterJourney,
    imageFit: "contain",
    alt: "Claims adjuster journey map",
    number: "03",
    title: "Claim Adjuster Journey",
    type: "Journey Map",
    description:
      "A parallel journey model focused on the adjuster’s workload, evidence review, regulatory responsibilities, and final decision authority.",
    caption:
      "The adjuster journey clarified that the same claim creates a very different set of information, accountability, and time-pressure needs.",
  },
  {
    id: "black-box-moment",
    sectionId: "problem",
    insertAfterParagraph: 2,
    image: blackBoxMoment,
    imageFit: "contain",
    alt: "Black-box moment research map",
    number: "01",
    title: "The Black-Box Moment",
    type: "Research Finding",
    description:
      "The journey map exposed a mismatch between system speed and human understanding: analysis may happen immediately, while the user is left without visibility into what was reviewed or how the conclusion was reached.",
    caption:
      "The gap between instant processing and delayed human understanding became one of the central problems to investigate.",
  },
  {
    id: "reasoning-gap-analysis",
    sectionId: "problem",
    insertAfterParagraph: 3,
    image: reasoningGapAnalysis,
    imageFit: "contain",
    alt: "Reasoning gap analysis system map",
    number: "02",
    title: "Reasoning Gap Analysis",
    type: "System Map",
    description:
      "A breakdown of the decision from both the customer and insurance sides, used to identify where historical comparisons, rationale, and additional clarification needed to become visible.",
    caption:
      "The core question became: can the system explain its reasoning back to the person affected by it?",
  },
  {
    id: "initial-dashboard-assumptions",
    sectionId: "problem",
    insertAfterParagraph: 4,
    image: initialDashboardAssumption,
    imageFit: "contain",
    alt: "Initial adjuster dashboard assumption",
    number: "03",
    title: "Initial Dashboard Assumptions",
    type: "Design Exploration",
    description:
      "The first adjuster concept emphasized AI confidence and generic prioritization before the research exposed the importance of deadlines, jurisdiction, documentation status, and financial exposure.",
    caption:
      "This early version became useful evidence of which assumptions needed to change as the domain became clearer.",
  },
  {
    id: "post-accident-entry-flow",
    sectionId: "approach",
    insertAfterParagraph: 1,
    image: postAccidentEntryFlow,
    imageFit: "contain",
    alt: "Post-accident entry flow screens",
    number: "01",
    title: "Post-Accident Entry Flow",
    type: "Design Exploration",
    description:
      "The driver experience begins with a small set of direct actions and conversational guidance intended to reduce the immediate uncertainty of what to do after a collision.",
    caption:
      "The concept prioritizes orientation and reassurance before asking the user to begin a complex claims workflow.",
  },
  {
    id: "guided-evidence-capture",
    sectionId: "approach",
    insertAfterParagraph: 2,
    image: guidedEvidenceCapture,
    imageFit: "contain",
    alt: "Guided vehicle damage evidence capture",
    number: "02",
    title: "Guided Evidence Capture",
    type: "Interaction Pattern",
    description:
      "Visual prompts guide the driver toward usable damage photos while keeping the documentation task understandable and under their control.",
    caption:
      "AI assistance is positioned as guidance for producing better evidence rather than as an invisible evaluator.",
  },
  {
    id: "adjuster-claims-overview",
    sectionId: "approach",
    insertAfterParagraph: 3,
    image: adjustersClaimOverview,
    imageFit: "contain",
    alt: "Claims adjuster overview dashboard",
    number: "03",
    title: "Adjuster Claims Overview",
    type: "UI Concept",
    description:
      "A unified claims workspace intended to support triage, workload awareness, and faster orientation before the adjuster begins deeper analysis.",
    caption:
      "The dashboard explores how fragmented claim information might be consolidated without making AI the primary authority.",
  },
  {
    id: "estimate-confidence-explanation",
    sectionId: "decisions",
    insertAfterParagraph: 1,
    image: estimateConfidenceExplanation,
    imageFit: "contain",
    alt: "Estimate and confidence explanation interface",
    number: "01",
    title: "Estimate and Confidence Explanation",
    type: "UI Component",
    description:
      "The damage estimate is paired with a confidence statement and plain-language explanation, positioning the output as an informed assessment rather than a final fact.",
    caption:
      "The design exposes uncertainty so the user can understand the limits of the system’s interpretation.",
  },
  {
    id: "contextual-claim-review",
    sectionId: "decisions",
    insertAfterParagraph: 3,
    image: contextualClaimReview,
    imageFit: "contain",
    alt: "Contextual claim review drawer",
    number: "02",
    title: "Contextual Claim Review",
    type: "Interaction Pattern",
    description:
      "Selecting a claim opens supporting evidence and regulatory context beside the claims table, allowing the adjuster to investigate without losing awareness of the broader workload.",
    caption:
      "Progressive disclosure preserves context while making deeper evidence available when the adjuster needs it.",
  },
  {
    id: "editable-reserve-recommendation",
    sectionId: "decisions",
    insertAfterParagraph: 5,
    image: editableReserveRecommendation,
    imageFit: "contain",
    alt: "Editable reserve recommendation interface",
    number: "03",
    title: "Editable Reserve Recommendation",
    type: "Decision Support",
    description:
      "The system proposes a reserve and exposes the underlying inputs, while the adjuster can change the amount, compare benchmarks, and document why their judgment differs.",
    caption:
      "The recommendation acts as an informed baseline; human judgment remains editable, explicit, and accountable.",
  },
  {
    id: "submission-next-step-visibility",
    sectionId: "outcomes",
    insertAfterParagraph: 0,
    image: submissionNextStepVisibility,
    imageFit: "contain",
    alt: "Claim submission and next-step visibility",
    number: "01",
    title: "Submission and Next-Step Visibility",
    type: "Journey Outcome",
    description:
      "The final driver concept closes the submission flow with a structured summary, status progression, and visible handoff to the adjuster rather than ending at a generic confirmation screen.",
    caption:
      "The concept explores how a completed action can still communicate what happens next and who now owns the process.",
  },
  {
    id: "claim-stabilization-state-overview",
    sectionId: "outcomes",
    insertAfterParagraph: 2,
    image: claimStabilizationStateOne,
    imageFit: "contain",
    alt: "Claim stabilization overview interface",
    number: "02",
    title: "Claim Stabilization State",
    type: "UI State",
    description:
      "Once immediate decisions are complete, the interface shifts from active decision support into a stabilized status view showing completed actions and the claim’s current posture.",
    caption:
      "The overview helps the adjuster confirm what has been completed without reconstructing the claim from scattered information.",
  },
  {
    id: "claim-stabilization-monitoring",
    sectionId: "outcomes",
    insertAfterParagraph: 2,
    image: claimStabilizationStateTwo,
    imageFit: "contain",
    alt: "Claim stabilization monitoring and reminders interface",
    number: "03",
    title: "Ongoing Monitoring and Reminders",
    type: "UI State",
    description:
      "A supporting monitoring view surfaces remaining deadlines, upcoming events, and reminders after the claim moves out of active decision-making.",
    caption:
      "The second state explores how the system could remain vigilant after the adjuster has applied professional judgment.",
  },
  {
    id: "confidence-to-consequence",
    sectionId: "outcomes",
    insertAfterParagraph: 3,
    image: confidenceVsConsequence,
    imageFit: "contain",
    alt: "Confidence-first and consequence-first dashboard comparison",
    number: "04",
    title: "From Confidence-First to Consequence-First",
    type: "Design Evolution",
    description:
      "The adjuster dashboard evolved from generic confidence signals into a workflow organized around statutory deadlines, documentation readiness, regulatory exposure, and required action.",
    caption:
      "The redesign reflects a more grounded hypothesis about what an adjuster may need to see before deciding what deserves attention.",
  },
  {
    id: "emotional-repair-layer",
    sectionId: "lessons",
    insertAfterParagraph: 4,
    image: emotionalRepairLayer,
    imageFit: "contain",
    alt: "Emotional repair layer system map",
    number: "01",
    title: "Emotional Repair Layer",
    type: "System Map",
    description:
      "A conceptual flow exploring what happens after an automated decision, including moments where a user may need to signal concern, request correction, or receive acknowledgment.",
    caption:
      "The map suggests that trust is not resolved when the system produces an answer; the interaction still needs a meaningful close.",
  },
  {
    id: "human-override-feedback",
    sectionId: "lessons",
    insertAfterParagraph: 6,
    image: humanOverrideFeedback,
    imageFit: "contain",
    alt: "Human override feedback model",
    number: "02",
    title: "Human Override as Feedback",
    type: "Feedback Model",
    description:
      "A conceptual model showing how overrides, corrections, and repeated conversational friction could become signals for improving both the model and the surrounding workflow.",
    caption:
      "This remained a design hypothesis rather than an implemented or validated learning loop.",
  },
] as const;
