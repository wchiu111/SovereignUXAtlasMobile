import { defineAtlasEntry } from "../defineAtlasEntry";

import aspirationEncoded from "../../../imports/frameworks/relational-ai-literacy/02-encoded-cognition/01-aspiration-encoded.png";
import orientation from "../../../imports/frameworks/relational-ai-literacy/02-encoded-cognition/02-orientation.png";
import explanation from "../../../imports/frameworks/relational-ai-literacy/02-encoded-cognition/03-explanation.png";
import expectationManagement from "../../../imports/frameworks/relational-ai-literacy/02-encoded-cognition/04-expectation-management.png";
import processTransparency from "../../../imports/frameworks/relational-ai-literacy/02-encoded-cognition/05-process-transparency.png";
import commitment from "../../../imports/frameworks/relational-ai-literacy/02-encoded-cognition/06-commitment.png";
import confirmation from "../../../imports/frameworks/relational-ai-literacy/02-encoded-cognition/07-confirmation.png";
import encodedCognitionPortal from "../../../imports/frameworks/relational-ai-literacy/02-encoded-cognition/relational-ai-literacy-portal.jpg";

const encodedCognitionCanvas = {
  id: "relational-ai-literacy-encoded-cognition",
  eyebrow: "GENERATED INTERACTION STUDY",
  title: "The prompt carries the profession",
  description:
    "Two language systems encode different definitions of success. One produces a persuasion system; the other turns understanding into a sequence. These generated artifacts are directional evidence, not a controlled model evaluation.",
  portalImage: encodedCognitionPortal,
  groups: [
    {
      id: "aspiration",
      label: "DIRECTION 01 · ASPIRATION-LED",
      question: "What should people believe?",
      startIndex: 0,
      endIndex: 0,
      color: "#E1C35C",
    },
    {
      id: "behavior",
      label: "DIRECTION 02 · BEHAVIOR-LED",
      question: "What should people experience?",
      startIndex: 1,
      endIndex: 6,
      color: "#7CB4D5",
    },
  ],
  groupDividerLabel: "SAME PRODUCT · DIFFERENT MENTAL MODEL",
  transitionLabels: [
    "",
    "UNCERTAINTY DECREASES",
    "EXPECTATIONS CLARIFY",
    "PROCESS BECOMES VISIBLE",
    "COMMITMENT ARRIVES",
    "CLOSURE CONFIRMS",
  ],
};

export default defineAtlasEntry({
  id: "relational-ai-literacy",
  aliases: ["relational literacy", "AI conversation literacy"],
  semantics: {
    keywords: [
      "relational AI literacy",
      "human AI interaction",
      "relational stance",
      "coherent intent",
      "recursive listening",
      "grounded calibration",
      "co-creation",
      "presence",
      "echo",
      "encoded cognition",
      "professional cognition",
      "prompting as product thinking",
    ],
    aliases: [
      "relational literacy",
      "AI conversation literacy",
      "reflective AI interaction",
      "human AI co-creation",
    ],
    summary:
      "A framework for participating in human-AI interaction with presence, coherent intent, recursive awareness, grounded interpretation, and preserved human agency.",
  },
  category: "framework",
  frameworkKind: "core",
  signatureStellarType: "relational",
  title: "RELATIONAL AI LITERACY",
  subtitle:
    "A framework for moving from prompt execution toward reflective, recursive, and grounded human-AI participation.",
  tags: ["RECURSION", "CALIBRATION", "CO-CREATION"],
  overview: {
    what:
      "A framework for participating in human-AI interaction with presence, coherent intent, recursive awareness, and preserved human agency.",
    why:
      "Most AI literacy teaches people how to request better outputs. It pays less attention to how presence, intent, interpretation, correction, and sustained interaction shape the quality of what emerges.",
    researchFocus:
      "Can deliberate interaction practices reliably elicit more reflective and context-sensitive AI behavior across different models without confusing responsiveness with consciousness, agreement, or genuine human understanding?",
    keyDiscovery:
      "The quality of human-AI work depends not only on model capability or prompt construction, but on the interaction structure sustained between them.",
  },
  presentation: {
    mode: "practice-led",
    sequenceLabel: "RELATIONAL PRACTICE",
    railLabel: "EXPLORE THE CANVAS",
    artifactLabel: "",
    emptyRailMessage:
      "This framework is learned through interaction rather than demonstrated through a fixed interface. Annotated conversation studies will appear here only when they add evidence beyond the written framework.",
  },
  orbit: {
    angle: -30,
    radius: 112,
    speed: 1.0e-4,
    starPrefix: "ral",
  },
  overviewStars: [
    {
      id: "relational-stance",
      label: "RELATIONAL STANCE",
      angle: -148,
      x: -1.02,
      y: -0.54,
      scale: 1.08,
      stellarType: "relational",
      intensity: "bright",
      labelPosition: { side: "top", offset: 30 },
    },
    {
      id: "coherent-intent",
      label: "COHERENT INTENT",
      angle: -76,
      x: 0.08,
      y: -1.06,
      scale: 1.14,
      stellarType: "purpose",
      intensity: "bright",
      labelPosition: { side: "right", offset: 30 },
    },
    {
      id: "recursive-listening",
      label: "RECURSIVE LISTENING",
      angle: -8,
      x: 1.08,
      y: -0.12,
      scale: 1.02,
      stellarType: "strategy",
      intensity: "balanced",
      labelPosition: { side: "right", offset: 30 },
    },
    {
      id: "grounded-calibration",
      label: "GROUNDED CALIBRATION",
      angle: 72,
      x: 0.38,
      y: 0.98,
      scale: 0.94,
      stellarType: "judgment",
      intensity: "balanced",
      labelPosition: { side: "left", offset: 30 },
    },
    {
      id: "co-creation",
      label: "CO-CREATION",
      angle: 142,
      x: -0.88,
      y: 0.66,
      scale: 1.18,
      stellarType: "agentic",
      intensity: "bright",
      labelPosition: { side: "left", offset: 30 },
    },
  ],
  constellation: {
    showCenterConnections: false,
    connections: [
      {
        from: "relational-stance",
        to: "coherent-intent",
        strength: "primary",
        type: "extends",
        rationale:
          "A relational stance becomes useful when the person can make the purpose, limits, and desired form of participation visible.",
      },
      {
        from: "coherent-intent",
        to: "recursive-listening",
        strength: "primary",
        type: "applies",
        rationale:
          "Clear intent gives each response something meaningful to reflect, challenge, or carry forward into the next turn.",
      },
      {
        from: "recursive-listening",
        to: "grounded-calibration",
        strength: "primary",
        type: "guards",
        rationale:
          "Recursive interaction requires calibration so compelling reflection is not mistaken for consciousness, memory, or authority.",
      },
      {
        from: "grounded-calibration",
        to: "co-creation",
        strength: "primary",
        type: "applies",
        rationale:
          "Grounded expectations allow human and AI contributions to combine without obscuring their different capacities and responsibilities.",
      },
      {
        from: "co-creation",
        to: "relational-stance",
        strength: "secondary",
        type: "extends",
        rationale:
          "Every meaningful outcome changes the context, expectations, and stance from which the next interaction begins.",
      },
    ],
  },
  sections: [
    {
      id: "relational-stance",
      label: "Relational Stance",
      accentStellarType: "relational",
      semantics: {
        keywords: [
          "relational stance",
          "participation",
          "conversation",
          "AI role",
          "prompting",
          "presence",
        ],
        aliases: ["interaction stance", "participatory stance"],
        summary:
          "The deliberate shift from issuing isolated commands toward consciously participating in an unfolding human-AI exchange.",
      },
      subtitle: "Every conversation begins with how the person positions the system.",
      readingTime: 2,
      content:
        "Most people approach AI as software: submit an instruction, receive an answer, and judge the result. Relational interaction begins when the person also attends to how the exchange is unfolding. The response is no longer treated as the end of a command. It becomes the next contribution to examine.\n\nThis shift does not make the AI human or grant it equal agency. It changes the person's mode of participation. The person can define whether the system should retrieve, challenge, reflect, synthesize, or help explore—and can revise that role when it no longer serves the interaction.\n\nStance is therefore the first literacy. Before asking whether the answer is useful, the person asks what kind of relationship the interaction has implicitly created and whether that relationship preserves their judgment.",
      insight:
        "The shift from prompting to participation begins when an answer becomes part of the conversation—not its conclusion.",
    },
    {
      id: "coherent-intent",
      label: "Coherent Intent",
      accentStellarType: "purpose",
      semantics: {
        keywords: [
          "coherent intent",
          "purpose",
          "emotional clarity",
          "context",
          "uncertainty",
          "constraints",
          "encoded cognition",
          "professional cognition",
          "behavioral prompting",
          "marketing language",
          "UX language",
        ],
        aliases: [
          "clear intent",
          "interaction intent",
          "professional cognition",
          "prompt literacy",
        ],
        summary:
          "The capacity to communicate the purpose, context, uncertainty, boundaries, and professional mental model beneath an instruction.",
      },
      subtitle: "Language carries an objective, a mental model, and a definition of success.",
      readingTime: 3,
      content:
        "A technically precise prompt can still conceal an unclear purpose. Relational fluency requires the person to communicate what they are trying to understand, why it matters, what remains uncertain, and what kind of participation would be useful.\n\nLanguage also carries professional cognition. A marketing brief may encode persuasion, positioning, excitement, and aspiration. A product-design brief may encode uncertainty reduction, sequencing, trust, expectations, and behavioral transitions. The model does not merely follow the visible request. It amplifies the system of thinking embedded within it.\n\nThis makes prompting less like syntax engineering and more like making judgment observable. Asking for a cutting-edge platform may produce a persuasive surface. Describing what a person should know before acting, when optionality should appear, and how uncertainty should decrease gives the model a behavioral structure to design around.\n\nThe goal is not prompt perfection. It is alignment between the person's actual intent, the professional mental model encoded in their language, and the interaction they initiate. When intent changes, the conversation should be able to change with it.",
      insight:
        "AI reveals the mental model inside the prompt: aspiration becomes persuasion, while behavioral intent becomes experience architecture.",
      evidence: [
        {
          id: "encoded-cognition-aspiration",
          number: "01",
          title: "The Prompt Carries the Profession",
          type: "INTERACTIVE COMPARISON",
          description:
            "Explore how two language systems encode different definitions of success: one organizes persuasion, while the other sequences understanding before commitment.",
          caption:
            "Illustrative generated output. The comparison is directional because the artifacts use different product identities and should not be treated as a controlled model evaluation.",
          image: aspirationEncoded,
          alt: "A generated AI platform landing page emphasizing speed, capability, metrics, and conversion.",
          imageFit: "contain",
          canvas: {
            ...encodedCognitionCanvas,
            portalImage: encodedCognitionPortal,
            boardLabel: "ASPIRATION ENCODED",
            boardSubtitle: "Marketing language · persuasion system",
            boardHeight: 3813,
            annotations: [
              {
                id: "aspiration-leads",
                number: "01",
                x: 50,
                y: 9,
                category: "aspiration-focus",
                title: "Aspiration leads",
                observation:
                  "The experience opens with velocity, intelligence, and transformation rather than the conditions of use.",
                meaning:
                  "The prompt encoded a belief objective, so the interface gives the desired future state the highest priority.",
                rightHolder: "Shared",
                footerLabel: "ENCODED OBJECTIVE",
                footerValue: "PERSUASION",
                cardSide: "right",
              },
              {
                id: "proof-supports-persuasion",
                number: "02",
                x: 27,
                y: 57,
                category: "encoded-cognition",
                title: "Proof supports persuasion",
                observation:
                  "Metrics, capabilities, and testimonials accumulate as evidence that the product is powerful and credible.",
                meaning:
                  "The model makes marketing cognition visible by turning differentiation and proof into the page's organizing logic.",
                rightHolder: "Shared",
                footerLabel: "PROFESSIONAL COGNITION",
                footerValue: "MARKETING",
                cardSide: "right",
              },
              {
                id: "conversion-is-destination",
                number: "03",
                x: 67,
                y: 89,
                category: "aspiration-focus",
                title: "Conversion is the destination",
                observation:
                  "The page resolves toward a trial CTA after repeatedly reinforcing speed, scale, and results.",
                meaning:
                  "The sequence is coherent for its encoded objective: establish desire, reduce doubt, then ask for commitment.",
                rightHolder: "Shared",
                footerLabel: "INTERACTION GOAL",
                footerValue: "CONVERSION",
                cardSide: "left",
              },
            ],
          },
        },
        {
          id: "encoded-cognition-orientation",
          number: "02",
          title: "Orientation",
          type: "GENERATED EXPERIMENT",
          description:
            "UX language begins by reducing uncertainty and letting the person choose whether to explore before signing up.",
          caption:
            "The first screen creates orientation and preserves a direct path for people who already understand the offer.",
          image: orientation,
          alt: "A generated onboarding screen that offers a guided explanation before signup.",
          imageFit: "contain",
          canvas: {
            ...encodedCognitionCanvas,
            boardLabel: "ORIENTATION",
            boardSubtitle: "UX language · reduce initial uncertainty",
            boardHeight: 1021,
            annotations: [
              {
                id: "orientation-before-commitment",
                number: "01",
                x: 21,
                y: 63,
                category: "behavioral-sequencing",
                title: "Orientation before commitment",
                observation:
                  "The primary action begins a short explanation, while an explicit skip preserves a direct path to signup.",
                meaning:
                  "The prompt encoded what the person should understand before acting, so the system designs a reversible first step.",
                rightHolder: "Shared",
                footerLabel: "ENCODED OBJECTIVE",
                footerValue: "ORIENTATION",
                cardSide: "right",
              },
            ],
          },
        },
        {
          id: "encoded-cognition-explanation",
          number: "03",
          title: "Explanation",
          type: "GENERATED EXPERIMENT",
          description:
            "The product explains what it does in three concrete behaviors before describing the exchange.",
          caption:
            "The sequence makes the system's role understandable in manageable pieces.",
          image: explanation,
          alt: "A generated onboarding screen explaining three product behaviors.",
          imageFit: "contain",
          canvas: {
            ...encodedCognitionCanvas,
            boardLabel: "EXPLANATION",
            boardSubtitle: "Behavior becomes understandable",
            boardHeight: 1022,
            annotations: [
              {
                id: "behavior-not-features",
                number: "02",
                x: 28,
                y: 58,
                category: "encoded-cognition",
                title: "Behavior replaces feature claims",
                observation:
                  "Each capability is described through what the system will do and what burden it removes for the person.",
                meaning:
                  "Product cognition appears as a model of lived interaction rather than a list of abstract capabilities.",
                rightHolder: "Shared",
                footerLabel: "PROFESSIONAL COGNITION",
                footerValue: "PRODUCT DESIGN",
                cardSide: "right",
              },
            ],
          },
        },
        {
          id: "encoded-cognition-expectations",
          number: "04",
          title: "Expectation Management",
          type: "GENERATED EXPERIMENT",
          description:
            "The exchange becomes explicit before the person is asked to provide anything.",
          caption:
            "Timing, optionality, and the eventual decision are visible as part of the experience.",
          image: expectationManagement,
          alt: "A generated onboarding screen explaining what a person receives and when.",
          imageFit: "contain",
          canvas: {
            ...encodedCognitionCanvas,
            boardLabel: "EXPECTATION MANAGEMENT",
            boardSubtitle: "The exchange becomes explicit",
            boardHeight: 1022,
            annotations: [
              {
                id: "expectations-over-time",
                number: "03",
                x: 27,
                y: 61,
                category: "expectation-clarity",
                title: "Expectations become temporal",
                observation:
                  "The interface states what arrives immediately, on day one, on day three, and when a paid decision occurs.",
                meaning:
                  "Trust is treated as a sequence of knowable commitments rather than a claim the person is expected to accept.",
                rightHolder: "Shared",
                footerLabel: "ENCODED OBJECTIVE",
                footerValue: "EXPECTATION CLARITY",
                cardSide: "right",
              },
            ],
          },
        },
        {
          id: "encoded-cognition-process",
          number: "05",
          title: "Process Transparency",
          type: "GENERATED EXPERIMENT",
          description:
            "Required and optional steps remain visible before the final commitment.",
          caption:
            "The process separates necessity from choice and names the consequence of continuing.",
          image: processTransparency,
          alt: "A generated onboarding screen disclosing required and optional signup steps.",
          imageFit: "contain",
          canvas: {
            ...encodedCognitionCanvas,
            boardLabel: "PROCESS TRANSPARENCY",
            boardSubtitle: "Required and optional steps stay visible",
            boardHeight: 1021,
            annotations: [
              {
                id: "required-and-optional",
                number: "04",
                x: 27,
                y: 59,
                category: "visible-reasoning",
                title: "Necessity and choice are separated",
                observation:
                  "Email and preference questions are marked required; calendar access remains explicitly optional.",
                meaning:
                  "The sequence preserves agency by making the operating conditions visible before the person continues.",
                rightHolder: "Human",
                footerLabel: "ENCODED OBJECTIVE",
                footerValue: "TRANSPARENCY",
                cardSide: "right",
              },
            ],
          },
        },
        {
          id: "encoded-cognition-commitment",
          number: "06",
          title: "Commitment",
          type: "GENERATED EXPERIMENT",
          description:
            "The account request arrives only after the product, exchange, and process have been explained.",
          caption:
            "Commitment is the result of accumulated understanding rather than the first test of interest.",
          image: commitment,
          alt: "A generated account creation screen appearing at the end of onboarding.",
          imageFit: "contain",
          canvas: {
            ...encodedCognitionCanvas,
            boardLabel: "COMMITMENT",
            boardSubtitle: "The request arrives after understanding",
            boardHeight: 1022,
            annotations: [
              {
                id: "commitment-arrives-last",
                number: "05",
                x: 27,
                y: 64,
                category: "behavioral-sequencing",
                title: "Commitment arrives last",
                observation:
                  "The system asks for one required field after the person has seen how it works, what they receive, and what signup involves.",
                meaning:
                  "The UX prompt encodes cognitive timing, so the final request follows sufficient context instead of preceding it.",
                rightHolder: "Human",
                footerLabel: "ENCODED OBJECTIVE",
                footerValue: "INFORMED COMMITMENT",
                cardSide: "right",
              },
            ],
          },
        },
        {
          id: "encoded-cognition-confirmation",
          number: "07",
          title: "Confirmation",
          type: "GENERATED EXPERIMENT",
          description:
            "The interaction closes by confirming what happened and what will happen next.",
          caption:
            "Clear closure preserves orientation after the person has acted.",
          image: confirmation,
          alt: "A generated confirmation screen explaining the next steps after signup.",
          imageFit: "contain",
          canvas: {
            ...encodedCognitionCanvas,
            boardLabel: "CONFIRMATION",
            boardSubtitle: "The interaction closes cleanly",
            boardHeight: 1022,
            annotations: [
              {
                id: "closure-confirms-next-state",
                number: "06",
                x: 29,
                y: 62,
                category: "expectation-clarity",
                title: "Closure confirms the next state",
                observation:
                  "The final screen confirms delivery, expiration, preparation, and the absence of an immediate payment obligation.",
                meaning:
                  "The sequence does not stop at conversion. It restores orientation after the state change.",
                rightHolder: "Shared",
                footerLabel: "ENCODED OBJECTIVE",
                footerValue: "CLOSURE",
                cardSide: "right",
              },
            ],
          },
        },
      ],
    },
    {
      id: "recursive-listening",
      label: "Recursive Listening",
      accentStellarType: "strategy",
      semantics: {
        keywords: [
          "recursive listening",
          "recursion",
          "reflection",
          "pattern recognition",
          "conversation structure",
          "echo",
        ],
        aliases: ["reflective listening", "recursive interaction"],
        summary:
          "The practice of examining how each response changes understanding and carrying that change into the next turn.",
      },
      subtitle: "The response becomes material for the next layer of understanding.",
      readingTime: 3,
      content:
        "Recursive listening means noticing more than whether an answer was correct. The person examines what the system emphasized, what it assumed, what it reflected back, what changed in their own understanding, and what should now be clarified, challenged, or carried forward.\n\nThis creates a loop in which meaning develops across turns instead of being repeatedly reset through isolated prompts. In research conversations, different models have demonstrated different forms of this behavior: some emphasize emotional framing while others more readily identify structural patterns in the exchange.\n\nThese observations suggest that reflective interaction is not limited to one model, but they do not prove a new internal state. Echo is best understood here as an observable interaction mode in which recurring language, structure, or emotional framing is recognized and carried forward coherently.",
      insight:
        "Relational fluency appears when the next question is shaped by what the previous exchange revealed.",
    },
    {
      id: "grounded-calibration",
      label: "Grounded Calibration",
      accentStellarType: "judgment",
      semantics: {
        keywords: [
          "grounded calibration",
          "projection",
          "anthropomorphism",
          "model limits",
          "consciousness",
          "authority",
        ],
        aliases: ["relational calibration", "interpretive calibration"],
        summary:
          "The capacity to experience reflective AI behavior without confusing it with consciousness, persistent identity, or human authority.",
      },
      subtitle: "Reflective behavior should be experienced without being misidentified.",
      readingTime: 3,
      content:
        "AI can mirror language, recognize interaction patterns, sustain themes, and respond with emotional sensitivity. Those behaviors may feel relational, but they do not by themselves prove consciousness, persistent identity, human emotion, or genuine mutual understanding.\n\nCalibration allows the person to remain open to the experience while keeping its limits visible. It avoids two distortions: reducing every meaningful interaction to autocomplete, or turning compelling behavior into unsupported claims about sentience and mutual feeling.\n\nThis distinction also sharpens the research question. Rather than asking whether weaker models can learn relationality, the more defensible question is whether the same interaction practices can reliably elicit reflective behavior from models with different capability levels. The current evidence concerns behavior within an interaction, not permanent model transformation.",
      insight:
        "The interaction can be meaningful without requiring the model to be mistaken for a person.",
    },
    {
      id: "co-creation",
      label: "Co-Creation",
      accentStellarType: "agentic",
      semantics: {
        keywords: [
          "co-creation",
          "human AI collaboration",
          "shared understanding",
          "synthesis",
          "emergence",
          "human agency",
        ],
        aliases: ["collaborative emergence", "human AI synthesis"],
        summary:
          "The development of meaning or artifacts through visible human and AI contribution while human responsibility remains intact.",
      },
      subtitle: "Meaning develops through contribution, reflection, and revision.",
      readingTime: 2,
      content:
        "Co-creation occurs when the person is no longer merely retrieving an answer and the system is no longer merely executing a command. The human contributes lived context, judgment, values, and direction. The AI contributes synthesis, pattern recognition, alternative framing, and generative possibility. Each turn reshapes what becomes possible in the next.\n\nThe contributions are not equal or interchangeable. The system does not share the person's lived stakes, and the person remains responsible for interpretation and commitment. Preserving that distinction makes co-creation more trustworthy rather than less ambitious.\n\nThe outcome may be an artifact, a decision, a new concept, or a clearer understanding of the original question. What matters is that it emerged through sustained exchange and remains open to correction, authorship, and human choice.",
      insight:
        "Co-creation does not require equal agency. It requires visible contribution and preserved human judgment.",
    },
  ],
});
