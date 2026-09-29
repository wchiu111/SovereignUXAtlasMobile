import baselineModal from "../../../../imports/frameworks/regenerative-systems/01-drift-detection/baseline-modal.png";
import unconstrainedGeneration from "../../../../imports/frameworks/regenerative-systems/01-drift-detection/unconstrained-generation.png";
import preservationConstrained from "../../../../imports/frameworks/regenerative-systems/01-drift-detection/preservation-constrained.png";
import type { MobileFrameworkDocument } from "./mobileFrameworkTypes";

export const REGENERATIVE_SYSTEMS: MobileFrameworkDocument = {
  id: "regenerative-systems",
  title: "REGENERATIVE SYSTEMS",
  subtitle:
    "A framework for detecting drift, preserving critical relationships, and guiding intelligent systems back toward integrity.",
  tags: ["DRIFT", "PRESERVATION", "SYSTEM INTEGRITY"],
  status: "ready",
  overview: {
    what:
      "A framework for evolving intelligent systems without losing the relationships that define their identity.",
    why:
      "AI-assisted generation can produce locally successful interfaces while quietly changing hierarchy, workflow, operational density, authority, or meaning.",
    researchFocus:
      "How can a system identify, evaluate, and resist coherence violations without relying solely on carefully engineered prompts?",
    keyDiscovery:
      "Regeneration is not the preservation of pixels. It is the preservation of the relationships that keep a system coherent while its artifacts change.",
  },
  sequenceLabel: "REGENERATION LOOP",
  sections: [
    {
      id: "drift-detection",
      label: "DRIFT DETECTION",
      short: "D",
      subtitle: "What changed beneath the surface.",
      readingTime: 3,
      content:
        "Drift occurs when an evolving system changes a relationship that matters even though the new artifact may still look polished or function correctly. The change may be structural, such as a compact approval flow becoming a large analysis interface. It may redistribute authority, increase the work required to reach a decision, or subtly reassign a user's role through language.\n\nDetection therefore begins with comparison, not preference. Teams examine the generated state against the original workflow and ask which relationships moved: hierarchy, density, sequence, decision ownership, semantic intent, or recovery behavior. A visible difference is not automatically drift, and a visually consistent result is not automatically coherent.\n\nThe current experiments provide strong evidence for structural and authority drift, and promising evidence for semantic drift. Cognitive drift remains a working hypothesis that requires more deliberate measurement.",
      insight:
        "A system can remain visually successful while becoming structurally or semantically less faithful to what it was designed to preserve.",
    },
    {
      id: "invariant-preservation",
      label: "INVARIANT PRESERVATION",
      short: "I",
      subtitle: "What must remain true while artifacts change.",
      readingTime: 2,
      content:
        "An invariant names a relationship that should survive change. It may protect hierarchy continuity, spacing rhythm, navigation predictability, workflow progression, operational density, authority distribution, or semantic intent. Unlike a component specification, it does not require the next artifact to look identical.\n\nPreservation is therefore selective. Teams identify which relationships carry the system's identity and which details may be freely reinterpreted. An approval surface might tolerate new explanatory content while preserving compactness, the prominence of the decision, and the distinction between leaving and rejecting.\n\nIn the current experiments, invariants are expressed as prompt constraints. They measurably influence generation, but they are not yet autonomous guardrails. That distinction matters: prompt discipline demonstrates the value of preservation without proving a complete preservation architecture.",
      insight:
        "Preservation does not freeze the interface. It gives change a set of relationships it is not allowed to quietly erase.",
    },
    {
      id: "guided-regeneration",
      label: "GUIDED REGENERATION",
      short: "G",
      subtitle: "How the affected layer changes without rewriting the system.",
      readingTime: 2,
      content:
        "Guided regeneration applies the identified invariants while producing a new candidate state. The goal is not to make the output resemble the baseline at any cost. It is to repair the affected layer while retaining the relationships that continue to serve the system.\n\nThis changes the generation task. Instead of asking only for a desired feature or behavior, the system must also carry forward what may not drift: decision ownership, operational sequence, information density, semantic roles, and the recovery path if the change fails.\n\nToday this guidance is supplied through explicit prompts. A mature regenerative architecture would apply constraints from governed system knowledge, record which ones shaped the result, and escalate when the requested change cannot coexist with them.",
      insight:
        "Repair becomes regenerative when it changes what failed without treating everything around the failure as disposable.",
    },
    {
      id: "integrity-verification",
      label: "INTEGRITY VERIFICATION",
      short: "V",
      subtitle: "Whether the regenerated system still means what it meant.",
      readingTime: 2,
      content:
        "Integrity verification asks whether the regenerated state actually preserved the relationships it claimed to protect. It compares the candidate with the baseline and the authored invariants, then identifies remaining drift, newly introduced trade-offs, and ambiguities that require human judgment.\n\nVerification prevents visual resemblance from becoming false assurance. A compact modal may preserve density while changing Cancel into Reject, which could clarify the workflow or quietly alter the user's role. The correct conclusion depends on the product requirement, so the system must surface the change rather than label the generation successful.\n\nThis is also where regeneration becomes a loop. Verification records which constraints held, which failed, and which were incomplete. That evidence returns to drift detection and improves the next repair rather than hiding the history of change.",
      insight:
        "A regenerated artifact is not trustworthy because it looks restored. It is trustworthy when preserved relationships and unresolved changes are made inspectable.",
    },
  ],
  evidence: [
    {
      id: "baseline-modal",
      sectionId: "drift-detection",
      image: baselineModal,
      imageFit: "contain",
      alt:
        "Compact vendor exception approval modal showing the original hierarchy, request context, and Cancel and Approve Exception actions.",
      number: "01",
      title: "Baseline System",
      type: "Interactive Example",
      description:
        "The original compact approval flow establishes the relationships against which later generations can be evaluated.",
      caption:
        "The baseline is not a perfect answer. It is the evidence of the hierarchy, density, authority, and semantics that existed before generation.",
    },
    {
      id: "unconstrained-generation",
      sectionId: "drift-detection",
      image: unconstrainedGeneration,
      imageFit: "contain",
      alt:
        "Expanded vendor exception modal with a large AI-powered analysis section, policy concerns, compliance impact, and a recommendation.",
      number: "02",
      title: "Unconstrained Generation",
      type: "Interactive Example",
      description:
        "A simple request to add AI assistance expands the interface and makes AI interpretation the dominant center of the workflow.",
      caption:
        "The generated artifact adds capability while changing the structure through which the person understands and decides.",
    },
    {
      id: "preservation-constrained",
      sectionId: "drift-detection",
      image: preservationConstrained,
      imageFit: "contain",
      alt:
        "Compact vendor exception modal generated with preservation constraints, keeping the original density while adding a subordinate compliance note.",
      number: "03",
      title: "Preservation-Constrained Generation",
      type: "Interactive Example",
      description:
        "The same AI assistance is regenerated with explicit constraints protecting hierarchy, density, workflow, and human authority.",
      caption:
        "Preservation constraints materially influence the output, but the result still requires verification for unresolved semantic change.",
    },
  ],
};
