import attentionArchitectureDemo from "../../../../imports/frameworks/presence-navigation/01-attention-architecture/1-attention-architecture.gif";
import attentionArchitectureMap from "../../../../imports/frameworks/presence-navigation/01-attention-architecture/2-framework-map.png";
import type { MobileFrameworkDocument } from "./mobileFrameworkTypes";

export const PRESENCE_NAVIGATION: MobileFrameworkDocument = {
  id: "presence-navigation",
  title: "PRESENCE NAVIGATION",
  subtitle:
    "A framework for designing when attention arrives—not only where information lives.",
  tags: ["TEMPORAL HIERARCHY", "ATTENTION", "ORIENTATION"],
  status: "ready",
  overview: {
    what:
      "A temporal framework for guiding a person from arrival through orientation, attention, and confident exploration.",
    why:
      "Interfaces often establish spatial hierarchy while leaving the first moment of cognition undesigned. Everything appears at once, and the person must decide where to begin while uncertainty is at its highest.",
    researchFocus:
      "How can an interface acknowledge arrival and establish a useful entry point without interrupting, coercing, or continuing to steer the person after orientation is complete?",
    keyDiscovery:
      "Traditional hierarchy organizes where information lives. Temporal hierarchy shapes when information asks for attention—and then recedes once its orienting work is complete.",
  },
  sequenceLabel: "ATTENTION PATH",
  sections: [
    {
      id: "arrival",
      label: "ARRIVAL",
      short: "A",
      subtitle: "The first moment begins before the first action.",
      readingTime: 2,
      content:
        "Arrival is the brief period in which a person encounters the interface but has not yet established where to begin. Navigation, recent work, recommendations, alerts, and primary content may all be individually understandable while still competing for the first glance.\n\nThis is not automatically a layout failure. A dashboard can have sound spatial hierarchy and still feel cognitively unresolved because every region appears with equal temporal priority. The person must scan the page, infer its current state, and choose an entry point while uncertainty is at its highest.\n\nPresence Navigation treats this interval as a design surface. Before adding motion, the team identifies the orientation problem: what does the person need to notice first, why does it deserve priority now, and what freedom should remain once that first moment has passed?",
      insight:
        "The interface has already shaped attention before the person clicks anything—even when that shaping was never deliberately designed.",
    },
    {
      id: "orientation",
      label: "ORIENTATION",
      short: "O",
      subtitle: "Direction appears without demanding attention.",
      readingTime: 2,
      content:
        "Orientation is the system's quiet response to arrival. It establishes a direction before asking the person to make a choice. This may be accomplished through sequence, progressive disclosure, a change in emphasis, or restrained motion that briefly distinguishes one region from the rest of the field.\n\nThe cue should communicate relevance rather than urgency. In the dashboard experiment, a short delay allows the environment to resolve before an ambient light sweep passes across the recommended resources. The cards respond as material—lifting, brightening, and settling—rather than behaving like an alert.\n\nOrientation is low-intrusion guidance. It does not block the interface, explain itself through a coach mark, or require dismissal. It gives the person a useful hypothesis about where to begin while keeping every other path available.",
      insight:
        "A cue becomes guidance when it reduces uncertainty without converting possibility into obligation.",
    },
    {
      id: "attention",
      label: "ATTENTION",
      short: "T",
      subtitle: "A possible path resolves into focus.",
      readingTime: 2,
      content:
        "Attention is the moment orientation succeeds. One region becomes legible as the primary entry point, not because everything else disappears, but because the interface has temporarily resolved the competition among possible directions.\n\nThe focal point must be earned by context. A recommended resource may deserve initial attention for a new user, while recent work may be more appropriate for someone returning to an active task. Presence Navigation therefore depends on user state and product intent; the same animation should not run indiscriminately for every person or every visit.\n\nThe cue also needs a clear ending. Repetition, continuous pulsing, or escalating emphasis turns orientation into capture. Once focus is established, the motion settles and the chosen region returns to the same interaction language as the rest of the interface.",
      insight:
        "Attention architecture establishes an entry point; it does not claim ownership of the person's attention.",
    },
    {
      id: "exploration",
      label: "EXPLORATION",
      short: "E",
      subtitle: "Guidance recedes so exploration can begin.",
      readingTime: 2,
      content:
        "Exploration begins when the person has enough orientation to move confidently through the interface. The system's role changes at this threshold. It no longer needs to announce where to begin; it needs to preserve context, respond predictably, and let the person pursue another path without penalty.\n\nThis is what separates temporal hierarchy from attention capture. The interaction is intentionally finite. It runs once, leaves no persistent badge or visual residue, and does not compete with the task after its orienting purpose has been fulfilled.\n\nA mature implementation would also respect repeat visits, user preference, reduced-motion settings, and task urgency. Motion is only one possible instrument. If the intended direction cannot remain understandable without animation, the underlying hierarchy still needs work.",
      insight:
        "The strongest presence cue knows when its work is finished and gives the interface back to the person.",
    },
  ],
  evidence: [
    {
      id: "attention-architecture-demo",
      sectionId: "*",
      image: attentionArchitectureDemo,
      imageFit: "contain",
      alt:
        "Animated Figma dashboard in which a restrained ambient light sweep passes across Recommended Resources shortly after arrival.",
      number: "01",
      title: "Attention Architecture Study",
      type: "Motion Experiment",
      description:
        "A one-time ambient light cue briefly gives Recommended Resources temporal priority without changing the dashboard layout.",
      caption:
        "This exploratory prototype demonstrates the interaction hypothesis. It does not establish that the cue improves comprehension without further observation and testing.",
    },
    {
      id: "attention-architecture-map",
      sectionId: "*",
      image: attentionArchitectureMap,
      imageFit: "contain",
      alt:
        "Framework map showing the progression from Arrival to Orientation, Attention, and Exploration across the first three seconds.",
      number: "02",
      title: "Designing the First Three Seconds",
      type: "Framework Map",
      description:
        "The map separates the first moments of interface cognition into four states: Arrival, Orientation, Attention, and Exploration.",
      caption:
        "The timings are an authored interaction model for this experiment, not universal perceptual thresholds.",
    },
  ],
};
