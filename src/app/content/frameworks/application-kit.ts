import { defineAtlasEntry } from "../defineAtlasEntry";

export default defineAtlasEntry({
  id: "application-kit",
  category: "framework",
  frameworkKind: "collection",
  title: "APPLICATION KIT",
  subtitle:
    "Fourteen optional modules for scaling Sovereign UX without turning clarity, consent, or presence into performance.",
  overview: {
    what:
      "A collection of optional scaffolds for applying Sovereign UX across teams, products, organizations, and higher-risk contexts.",
    why:
      "As a framework scales, its principles can quietly become rituals, performance, or false authority. The Application Kit supports adoption without making every module mandatory.",
    researchFocus:
      "How can teams improve clarity and decision quality while preserving contextual judgment, consent, and professional boundaries?",
    keyDiscovery:
      "Sovereign UX scales through selective application and restraint. Any module that increases confidence while reducing clarity should be removed.",
  },
  orbit: {
    angle: 90,
    radius: 112,
    speed: 0.96e-4,
    starPrefix: "ak",
  },
  overviewStars: [
    {
      id: "adoption-sustainability",
      label: "ADOPTION & SUSTAINABILITY",
      angle: -90,
      x: -0.52,
      y: -0.92,
      scale: 0.9,
      stellarType: "strategy",
      labelPosition: { side: "left", offset: 38 },
    },
    {
      id: "behavior-authority",
      label: "BEHAVIOR & AUTHORITY",
      angle: -18,
      x: 0.92,
      y: -0.54,
      scale: 1.04,
      stellarType: "judgment",
      labelPosition: { side: "top", offset: 34 },
    },
    {
      id: "integrity-safety",
      label: "INTEGRITY & SAFETY",
      angle: 54,
      x: 0.88,
      y: 0.56,
      scale: 1.1,
      stellarType: "risk",
      labelPosition: { side: "bottom", offset: 36 },
    },
    {
      id: "ethical-experience",
      label: "ETHICAL EXPERIENCE",
      angle: 126,
      x: -0.42,
      y: 0.94,
      scale: 0.96,
      stellarType: "relational",
      labelPosition: { side: "bottom", offset: 34 },
    },
    {
      id: "validation-governance",
      label: "VALIDATION & GOVERNANCE",
      angle: 198,
      x: -1.02,
      y: 0.08,
      scale: 1.06,
      stellarType: "agentic",
      labelPosition: { side: "left", offset: 38 },
    },
  ],
  collection: {
    moduleCount: 14,
    families: [
      {
        id: "adoption-sustainability",
        title: "ADOPTION & SUSTAINABILITY",
        description:
          "Introduce Sovereign practice clearly while protecting the teams responsible for carrying it.",
        modules: [
          {
            id: "sovereign-onboarding",
            title: "SOVEREIGN ONBOARDING",
            stellarType: "purpose",
            purpose:
              "Help teams align on intent, scope, and boundaries before applying the framework.",
            includes: [
              "Plain-language overview of Sovereign UX principles",
              "Layer map summary: General Practice vs Threshold Signals",
              "Boundary statement describing what the framework does not do",
              "Team reflection prompt: Where could we accidentally overreach?",
            ],
            useWhen: "Introducing Sovereign UX to new teams or stakeholders.",
            watchFor:
              "Turning onboarding into mandatory ritual instead of contextual orientation.",
            relatedFrameworks: ["relational-ai-literacy"],
          },
          {
            id: "presence-sustainability",
            title: "PRESENCE SUSTAINABILITY",
            stellarType: "relational",
            purpose:
              "Protect teams from burnout and emotional overload while doing depth-heavy work.",
            includes: [
              "Rotation of depth-heavy work",
              "Clear role boundaries",
              "Recovery cycles",
              "Design review load limits",
            ],
            useWhen: "Teams feel exhausted despite good intentions.",
            watchFor:
              "Treating care practices as permission to leave structural workload problems unchanged.",
            relatedFrameworks: ["presence-navigation"],
          },
        ],
      },
      {
        id: "behavior-authority",
        title: "BEHAVIOR & AUTHORITY",
        description:
          "Clarify how systems interpret, frame, share, and limit decision-making authority.",
        modules: [
          {
            id: "behavioral-decision-design",
            title: "BEHAVIORAL & DECISION DESIGN",
            stellarType: "agentic",
            purpose:
              "Support AI and automation that interpret correctly, frame decisions clearly, and respond without assuming authority.",
            includes: [
              "Reflection-before-action patterns",
              "Confirmation and correction loops",
              "Tone modulation for stress and routine contexts",
              "Clear language for uncertainty and limitations",
              "Separation of information, interpretation, and recommendation",
              "Decision framing visibility",
              "Confidence and assumption disclosure",
            ],
            useWhen:
              "Designing conversational systems, recommendations, or adaptive flows.",
            watchFor:
              "A system that sounds appropriately cautious while still making consequential assumptions invisibly.",
            relatedFrameworks: ["behavioral-architecture", "authority-gradient"],
          },
          {
            id: "multi-user-co-sovereignty",
            title: "MULTI-USER & CO-SOVEREIGNTY",
            stellarType: "relational",
            purpose:
              "Handle shared systems where legitimate user needs and decision rights may conflict.",
            includes: [
              "Transparent negotiation patterns",
              "Equal-weight choice presentation",
              "Context preservation across roles",
              "Explicit trade-off visibility",
            ],
            useWhen:
              "Designing platforms, marketplaces, or admin-user environments.",
            watchFor:
              "Presenting unequal power relationships as though every participant has equivalent agency.",
            relatedFrameworks: ["authority-gradient"],
          },
          {
            id: "constraint-scope-design",
            title: "CONSTRAINT & SCOPE DESIGN",
            stellarType: "strategy",
            purpose:
              "Ensure systems operate within clear boundaries and do not imply capabilities they do not have.",
            includes: [
              "Scope definition patterns",
              "Capability boundary disclosure",
              "Constraint-aware response design",
              "What this system does not do framing",
            ],
            useWhen:
              "Designing AI systems, assistants, or any experience where capability may be overestimated.",
            watchFor:
              "Limitations that are technically disclosed but practically invisible or difficult to understand.",
            relatedFrameworks: ["behavioral-architecture", "authority-gradient"],
          },
        ],
      },
      {
        id: "integrity-safety",
        title: "INTEGRITY & SAFETY",
        description:
          "Detect distortion, protect vulnerable contexts, and keep stated values aligned with behavior.",
        modules: [
          {
            id: "distortion-drift-detection",
            title: "DISTORTION & DRIFT DETECTION",
            stellarType: "risk",
            purpose:
              "Help teams identify when systems quietly undermine agency.",
            includes: [
              "Common misalignment patterns such as pressure creep and false urgency",
              "Reflection failure checklist",
              "Friction vs fatigue distinction guide",
              "Pause before fixing review prompts",
            ],
            useWhen: "Metrics improve while trust complaints increase.",
            watchFor:
              "Using the checklist to explain away user feedback instead of pausing to understand it.",
            relatedFrameworks: ["regenerative-systems"],
          },
          {
            id: "vulnerable-context-safeguards",
            title: "SAFEGUARDS FOR VULNERABLE CONTEXTS",
            stellarType: "risk",
            purpose:
              "Prevent accidental harm in emotionally sensitive or consequential domains.",
            includes: [
              "Explicit consent gates for depth",
              "Clear escalation and referral points",
              "Scope disclaimers",
              "Opt-in support modes",
            ],
            useWhen:
              "Designing for healthcare, finance, crisis-adjacent, or care-related flows.",
            watchFor:
              "Treating interface safeguards as substitutes for qualified professional support.",
            relatedFrameworks: ["authority-gradient", "presence-navigation"],
          },
          {
            id: "signal-fidelity",
            title: "SIGNAL FIDELITY & EXPERIENCE ALIGNMENT",
            stellarType: "purpose",
            purpose:
              "Ensure stated values remain consistent with actual system behavior.",
            includes: [
              "Promise vs behavior audits",
              "Consent and exit path reviews",
              "Tone and pacing checks",
              "Drift indicators over time",
            ],
            useWhen:
              "Brand values are strong but user trust is inconsistent.",
            watchFor:
              "Improving the language of a promise without correcting the behavior that violates it.",
            relatedFrameworks: ["regenerative-systems"],
          },
          {
            id: "bias-projection-safeguards",
            title: "BIAS & PROJECTION SAFEGUARDS",
            stellarType: "judgment",
            purpose:
              "Reduce misinterpretation and projection by designers and teams.",
            includes: [
              "Reflection vs projection checks",
              "External review triggers",
              "Multi-perspective validation prompts",
              "If it feels heavy, stop rule",
            ],
            useWhen:
              "Interpretation feels charged, defensive, or unclear.",
            watchFor:
              "Using reflection language to avoid accountability or necessary external review.",
            relatedFrameworks: ["relational-ai-literacy"],
          },
        ],
      },
      {
        id: "ethical-experience",
        title: "ETHICAL EXPERIENCE",
        description:
          "Support growth, closure, and cultural adaptation without manipulation or imposed assumptions.",
        modules: [
          {
            id: "value-aligned-growth",
            title: "VALUE-ALIGNED GROWTH & REVENUE",
            stellarType: "strategy",
            purpose:
              "Help organizations grow without reverting to manipulation.",
            includes: [
              "Trust-based growth patterns",
              "Clear upgrade trade-offs",
              "Long-term retention indicators",
              "Revenue models that do not rely on urgency or lock-in",
            ],
            useWhen:
              "Business goals risk pressuring design integrity.",
            watchFor:
              "Renaming conventional pressure mechanics without changing their effect on users.",
            relatedFrameworks: ["regenerative-systems"],
          },
          {
            id: "stillness-closure-recovery",
            title: "STILLNESS, CLOSURE & RECOVERY",
            stellarType: "relational",
            purpose:
              "Normalize rest, endings, repair, and penalty-free return in product design.",
            includes: [
              "Clean completion patterns",
              "Pause-friendly flows",
              "Re-entry without penalty",
              "Clear acknowledgment of effort",
            ],
            useWhen: "Users feel drained, stuck, or abandoned mid-journey.",
            watchFor:
              "Adding calming language while the underlying flow continues to create pressure.",
            relatedFrameworks: ["presence-navigation"],
          },
          {
            id: "cross-cultural-adaptation",
            title: "CROSS-CULTURAL ADAPTATION",
            stellarType: "relational",
            purpose:
              "Apply Sovereign UX without imposing a single worldview.",
            includes: [
              "Cultural assumptions checklist",
              "Localization guidance for agency and consent",
              "Narrative neutrality prompts",
              "Regional validation methods",
            ],
            useWhen: "Designing across geographies or cultural norms.",
            watchFor:
              "Treating localization as translation while leaving authority and consent assumptions unchanged.",
            relatedFrameworks: ["relational-ai-literacy"],
          },
        ],
      },
      {
        id: "validation-governance",
        title: "VALIDATION & GOVERNANCE",
        description:
          "Model consequences before deployment and steward signals that exceed ordinary product interpretation.",
        modules: [
          {
            id: "threshold-signal-stewardship",
            title: "THRESHOLD SIGNAL STEWARDSHIP",
            stellarType: "judgment",
            purpose:
              "Prevent misuse of high-risk design signals.",
            includes: [
              "Clear explanation of threshold indicators",
              "Observe, do not act documentation templates",
              "Escalation guidelines",
              "Team boundary checks",
            ],
            useWhen:
              "Systems begin influencing identity, long-term behavior, or emotional state.",
            watchFor:
              "Treating an observed signal as permission to diagnose, intervene, or claim authority.",
            relatedFrameworks: ["authority-gradient"],
          },
          {
            id: "simulation-based-validation",
            title: "SIMULATION-BASED BEHAVIOR & DECISION VALIDATION",
            stellarType: "agentic",
            purpose:
              "Model user behavior, system response, and decision outcomes before deployment.",
            includes: [
              "Scenario simulation",
              "Failure path modeling",
              "Trust breakdown prediction",
              "Interaction to interpretation to decision flow modeling",
              "Trust shift prediction",
              "Decision outcome simulation",
            ],
            useWhen:
              "Data is incomplete but system behavior must be understood.",
            watchFor:
              "Presenting simulated behavior as evidence of how real people will respond.",
            relatedFrameworks: ["behavioral-architecture", "regenerative-systems"],
          },
        ],
      },
    ],
  },
  sections: undefined,
});
