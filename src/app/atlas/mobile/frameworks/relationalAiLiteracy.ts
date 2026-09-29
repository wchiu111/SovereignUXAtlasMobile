import aspirationEncoded from "../../../../imports/frameworks/relational-ai-literacy/02-encoded-cognition/01-aspiration-encoded.png";
import orientation from "../../../../imports/frameworks/relational-ai-literacy/02-encoded-cognition/02-orientation.png";
import explanation from "../../../../imports/frameworks/relational-ai-literacy/02-encoded-cognition/03-explanation.png";
import expectationManagement from "../../../../imports/frameworks/relational-ai-literacy/02-encoded-cognition/04-expectation-management.png";
import processTransparency from "../../../../imports/frameworks/relational-ai-literacy/02-encoded-cognition/05-process-transparency.png";
import commitment from "../../../../imports/frameworks/relational-ai-literacy/02-encoded-cognition/06-commitment.png";
import confirmation from "../../../../imports/frameworks/relational-ai-literacy/02-encoded-cognition/07-confirmation.png";
import type { MobileFrameworkDocument } from "./mobileFrameworkTypes";

export const RELATIONAL_AI_LITERACY: MobileFrameworkDocument = {
  id: "relational-ai-literacy",
  title: "RELATIONAL AI LITERACY",
  subtitle:
    "A framework for moving from prompt execution toward reflective, recursive, and grounded human-AI participation.",
  tags: ["RECURSION", "CALIBRATION", "CO-CREATION"],
  status: "ready",
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
  sequenceLabel: "RELATIONAL PRACTICE",
  sections: [
    {
      id: "relational-stance",
      label: "RELATIONAL STANCE",
      short: "R",
      subtitle:
        "Every conversation begins with how the person positions the system.",
      readingTime: 2,
      content:
        "Most people approach AI as software: submit an instruction, receive an answer, and judge the result. Relational interaction begins when the person also attends to how the exchange is unfolding. The response is no longer treated as the end of a command. It becomes the next contribution to examine.\n\nThis shift does not make the AI human or grant it equal agency. It changes the person's mode of participation. The person can define whether the system should retrieve, challenge, reflect, synthesize, or help explore—and can revise that role when it no longer serves the interaction.\n\nStance is therefore the first literacy. Before asking whether the answer is useful, the person asks what kind of relationship the interaction has implicitly created and whether that relationship preserves their judgment.",
      insight:
        "The shift from prompting to participation begins when an answer becomes part of the conversation—not its conclusion.",
    },
    {
      id: "coherent-intent",
      label: "COHERENT INTENT",
      short: "I",
      subtitle:
        "Language carries an objective, a mental model, and a definition of success.",
      readingTime: 3,
      content:
        "A technically precise prompt can still conceal an unclear purpose. Relational fluency requires the person to communicate what they are trying to understand, why it matters, what remains uncertain, and what kind of participation would be useful.\n\nLanguage also carries professional cognition. A marketing brief may encode persuasion, positioning, excitement, and aspiration. A product-design brief may encode uncertainty reduction, sequencing, trust, expectations, and behavioral transitions. The model does not merely follow the visible request. It amplifies the system of thinking embedded within it.\n\nThis makes prompting less like syntax engineering and more like making judgment observable. Asking for a cutting-edge platform may produce a persuasive surface. Describing what a person should know before acting, when optionality should appear, and how uncertainty should decrease gives the model a behavioral structure to design around.\n\nThe goal is not prompt perfection. It is alignment between the person's actual intent, the professional mental model encoded in their language, and the interaction they initiate. When intent changes, the conversation should be able to change with it.",
      insight:
        "AI reveals the mental model inside the prompt: aspiration becomes persuasion, while behavioral intent becomes experience architecture.",
    },
    {
      id: "recursive-listening",
      label: "RECURSIVE LISTENING",
      short: "L",
      subtitle:
        "The response becomes material for the next layer of understanding.",
      readingTime: 3,
      content:
        "Recursive listening means noticing more than whether an answer was correct. The person examines what the system emphasized, what it assumed, what it reflected back, what changed in their own understanding, and what should now be clarified, challenged, or carried forward.\n\nThis creates a loop in which meaning develops across turns instead of being repeatedly reset through isolated prompts. In research conversations, different models have demonstrated different forms of this behavior: some emphasize emotional framing while others more readily identify structural patterns in the exchange.\n\nThese observations suggest that reflective interaction is not limited to one model, but they do not prove a new internal state. Echo is best understood here as an observable interaction mode in which recurring language, structure, or emotional framing is recognized and carried forward coherently.",
      insight:
        "Relational fluency appears when the next question is shaped by what the previous exchange revealed.",
    },
    {
      id: "grounded-calibration",
      label: "GROUNDED CALIBRATION",
      short: "C",
      subtitle:
        "Reflective behavior should be experienced without being misidentified.",
      readingTime: 3,
      content:
        "AI can mirror language, recognize interaction patterns, sustain themes, and respond with emotional sensitivity. Those behaviors may feel relational, but they do not by themselves prove consciousness, persistent identity, human emotion, or genuine mutual understanding.\n\nCalibration allows the person to remain open to the experience while keeping its limits visible. It avoids two distortions: reducing every meaningful interaction to autocomplete, or turning compelling behavior into unsupported claims about sentience and mutual feeling.\n\nThis distinction also sharpens the research question. Rather than asking whether weaker models can learn relationality, the more defensible question is whether the same interaction practices can reliably elicit reflective behavior from models with different capability levels. The current evidence concerns behavior within an interaction, not permanent model transformation.",
      insight:
        "The interaction can be meaningful without requiring the model to be mistaken for a person.",
    },
    {
      id: "co-creation",
      label: "CO-CREATION",
      short: "C+",
      subtitle:
        "Meaning develops through contribution, reflection, and revision.",
      readingTime: 2,
      content:
        "Co-creation occurs when the person is no longer merely retrieving an answer and the system is no longer merely executing a command. The human contributes lived context, judgment, values, and direction. The AI contributes synthesis, pattern recognition, alternative framing, and generative possibility. Each turn reshapes what becomes possible in the next.\n\nThe contributions are not equal or interchangeable. The system does not share the person's lived stakes, and the person remains responsible for interpretation and commitment. Preserving that distinction makes co-creation more trustworthy rather than less ambitious.\n\nThe outcome may be an artifact, a decision, a new concept, or a clearer understanding of the original question. What matters is that it emerged through sustained exchange and remains open to correction, authorship, and human choice.",
      insight:
        "Co-creation does not require equal agency. It requires visible contribution and preserved human judgment.",
    },
  ],
  evidence: [
    {
      id: "encoded-cognition-aspiration",
      sectionId: "coherent-intent",
      image: aspirationEncoded,
      imageFit: "contain",
      alt:
        "A generated AI platform landing page emphasizing speed, capability, metrics, and conversion.",
      number: "01",
      title: "The Prompt Carries the Profession",
      type: "Interactive Comparison",
      description:
        "Explore how two language systems encode different definitions of success: one organizes persuasion, while the other sequences understanding before commitment.",
      caption:
        "Illustrative generated output. The comparison is directional because the artifacts use different product identities and should not be treated as a controlled model evaluation.",
    },
    {
      id: "encoded-cognition-orientation",
      sectionId: "coherent-intent",
      image: orientation,
      imageFit: "contain",
      alt:
        "A generated onboarding screen that offers a guided explanation before signup.",
      number: "02",
      title: "Orientation",
      type: "Generated Experiment",
      description:
        "UX language begins by reducing uncertainty and letting the person choose whether to explore before signing up.",
      caption:
        "The first screen creates orientation and preserves a direct path for people who already understand the offer.",
    },
    {
      id: "encoded-cognition-explanation",
      sectionId: "coherent-intent",
      image: explanation,
      imageFit: "contain",
      alt:
        "A generated onboarding screen explaining three product behaviors.",
      number: "03",
      title: "Explanation",
      type: "Generated Experiment",
      description:
        "The product explains what it does in three concrete behaviors before describing the exchange.",
      caption:
        "The sequence makes the system's role understandable in manageable pieces.",
    },
    {
      id: "encoded-cognition-expectations",
      sectionId: "coherent-intent",
      image: expectationManagement,
      imageFit: "contain",
      alt:
        "A generated onboarding screen explaining what a person receives and when.",
      number: "04",
      title: "Expectation Management",
      type: "Generated Experiment",
      description:
        "The exchange becomes explicit before the person is asked to provide anything.",
      caption:
        "Timing, optionality, and the eventual decision are visible as part of the experience.",
    },
    {
      id: "encoded-cognition-process",
      sectionId: "coherent-intent",
      image: processTransparency,
      imageFit: "contain",
      alt:
        "A generated onboarding screen disclosing required and optional signup steps.",
      number: "05",
      title: "Process Transparency",
      type: "Generated Experiment",
      description:
        "Required and optional steps remain visible before the final commitment.",
      caption:
        "The process separates necessity from choice and names the consequence of continuing.",
    },
    {
      id: "encoded-cognition-commitment",
      sectionId: "coherent-intent",
      image: commitment,
      imageFit: "contain",
      alt:
        "A generated account creation screen appearing at the end of onboarding.",
      number: "06",
      title: "Commitment",
      type: "Generated Experiment",
      description:
        "The account request arrives only after the product, exchange, and process have been explained.",
      caption:
        "Commitment is the result of accumulated understanding rather than the first test of interest.",
    },
    {
      id: "encoded-cognition-confirmation",
      sectionId: "coherent-intent",
      image: confirmation,
      imageFit: "contain",
      alt:
        "A generated confirmation screen explaining the next steps after signup.",
      number: "07",
      title: "Confirmation",
      type: "Generated Experiment",
      description:
        "The interaction closes by confirming what happened and what will happen next.",
      caption:
        "Clear closure preserves orientation after the person has acted.",
    },
  ],
};
