import { defineAtlasEntry } from "../defineAtlasEntry";

export default defineAtlasEntry({
  id: "sovereign-ux",
  category: "framework",
  title: "SOVEREIGN UX",
  subtitle: "A framework for designing AI-integrated products that preserve user autonomy, judgment, and identity over time.",
  overview: {
    what: "A framework for designing AI-integrated products that preserve user autonomy, judgment, and identity over time.",
    why: "Most AI UX frameworks optimize for engagement. Sovereign UX optimizes for the quality of the user's relationship with their own thinking.",
    researchFocus: "What design decisions protect user cognitive autonomy in AI-mediated environments?",
    keyDiscovery: "Autonomy is not preserved by limiting AI capability — it's preserved by making AI behavior legible, reversible, and explicitly chosen.",
  },
  orbit: {
    angle: -80,
    radius: 112,
    speed: 1.18e-4,
    starPrefix: "sux",
  },
  sections: undefined,
});
