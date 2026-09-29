import type { MobileReadingSectionData } from "./mobileReadingTypes";

export const AGENTIC_INSURANCE_READING = {
  title: "AGENTIC INSURANCE",
  subtitle:
    "Exploring where AI could support insurance decisions—and where real validation still had to begin.",
  sections: [
    {
      id: "context",
      number: "01",
      label: "CONTEXT",
      subtitle: "How a fully agentic assumption began to break down",
      readingTime: 3,
      paragraphs: [
        "This project began while I was interviewing for a product design role at an insurance company.",
        "I entered it with a fairly expansive idea of agentic UX. I assumed a strong AI experience should be able to guide a customer from the moment of collision through evidence capture, estimates, claim explanations, recommendations, settlement guidance, and next steps.",
        "The attraction was obvious: a more seamless journey with fewer handoffs and less uncertainty.",
        "Once I started researching the role, that assumption began to break down. Claims are influenced by legal requirements, jurisdictional differences, policy language, internal processes, professional experience, and the judgment of the person reviewing the case.",
        "That changed the direction of the project. Instead of asking how much of the journey AI could perform, I needed to understand where its contribution should stop and where human judgment still needed to take over.",
      ],
      insight:
        "The project began as an exploration of fully agentic UX and became an investigation into where AI capability should stop short of decision authority.",
    },
    {
      id: "problem",
      number: "02",
      label: "THE PROBLEM",
      subtitle: "When capability stopped being the same thing as judgment",
      readingTime: 3,
      paragraphs: [
        "I did not have direct access to claim adjusters, and I did not know what their typical day looked like.",
        "Without that context, it would have been easy to design a polished AI tool around assumptions that were completely wrong.",
        "The deeper research exposed a more specific problem. An AI system could inspect a vehicle-damage photo and produce an estimate almost instantly. But an experienced mechanic or adjuster may know that visible damage does not represent the true repair cost. Hidden damage, prior cases, repair patterns, jurisdictional rules, and claim context can materially change the number.",
        "The problem was no longer simply whether AI could produce an answer. It was whether that answer should carry decision authority.",
        "In a high-stakes domain, the adjuster needs to understand what the system found, what it may be missing, how similar cases compare, and why a recommendation is being made before deciding what to do next.",
      ],
      insight:
        "Capability does not automatically grant authority. A fast answer can still require slower professional judgment.",
    },
    {
      id: "approach",
      number: "03",
      label: "APPROACH",
      subtitle: "Using AI to investigate the role, not impersonate validation",
      readingTime: 4,
      paragraphs: [
        "I used public research, job descriptions, workflow documentation, industry material, and AI-assisted role simulation to build a more complete picture of the claim-adjuster experience.",
        "The AI-generated persona was not treated as a substitute for a real person. It was used as a research instrument—a way to ask more specific questions about the role, pressure-test assumptions, and identify areas I needed to investigate further.",
        "From that research, I mapped a customer and adjuster journey and explored where AI-assisted tools might support the process.",
        "As the domain became clearer, the concept moved away from autonomous journey completion and toward decision support. The strongest opportunities were the parts of the workflow where AI could reduce synthesis work without pretending to replace professional judgment.",
        "The concepts focused on areas such as:\n\n• summarizing claim information\n• identifying missing or conflicting evidence\n• surfacing jurisdictional or policy considerations\n• explaining why a case may require escalation\n• helping the adjuster compare possible next steps\n• preserving a clear record of how a decision was reached",
      ],
      insight:
        "AI was most useful when it reduced the work required to understand the claim—not when it pretended to replace the person accountable for the outcome.",
    },
    {
      id: "decisions",
      number: "04",
      label: "KEY DECISIONS",
      subtitle: "Turning AI recommendations into an informed baseline",
      readingTime: 4,
      paragraphs: [
        "One of the most important decisions was not to design AI as an autonomous claim decision-maker.",
        "The project had started with the assumption that a more advanced agentic experience would remove more human intervention. The claim-adjuster workflow changed that.",
        "I began treating the AI as capable of:\n\n• gathering claim information\n• summarizing evidence\n• comparing similar claims\n• identifying conflicts or missing information\n• recommending a baseline",
        "But consequential decisions remained with the adjuster:\n\n• determining the working estimate\n• changing the reserve\n• escalating the claim\n• approving or finalizing a decision\n• remaining accountable for the judgment",
        "The Editable Reserve Recommendation became the clearest expression of that boundary.",
        "The system could propose a reserve, expose the underlying inputs, and compare similar claims. But the recommendation was not the answer. It was an informed baseline the adjuster could interrogate, change, and document.",
        "The interface therefore needed to make enough of the system visible for the adjuster to understand why a recommendation existed and what evidence supported it. The goal was not to ask the user to blindly approve AI output. It was to reduce the synthesis work while preserving meaningful professional judgment.",
      ],
      insight:
        "AI could establish an informed baseline without owning the final decision.",
    },
    {
      id: "outcomes",
      number: "05",
      label: "OUTCOMES",
      subtitle: "What the exploration produced—and what it did not prove",
      readingTime: 3,
      paragraphs: [
        "The project resulted in a conceptual customer and adjuster journey showing how AI-assisted tools could be introduced across the claims process.",
        "It helped me identify several areas where AI might reduce cognitive load and improve access to relevant information. More importantly, it produced a clearer boundary between what AI could synthesize and what still required professional judgment.",
        "The exploration suggested that AI could gather evidence, summarize a case, compare similar claims, and produce recommendations without automatically inheriting the authority to finalize consequential decisions.",
        "I did not conduct formal usability testing with claim adjusters, so I cannot claim that the concept improved speed, accuracy, trust, or decision quality.",
        "That validation would require real users, realistic claim scenarios, and subject-matter experts who could evaluate whether the proposed experience reflected actual insurance practice.",
      ],
      insight:
        "The outcome was a stronger hypothesis, a clearer authority boundary, and a better research direction—not proof that the concept worked.",
    },
    {
      id: "lessons",
      number: "06",
      label: "LESSONS",
      subtitle: "From maximizing autonomy to designing decision boundaries",
      readingTime: 4,
      paragraphs: [
        "I began the project believing the most advanced version of agentic UX would be the one that removed the most human intervention.",
        "I left with a different view.",
        "In a high-stakes workflow, seamless automation can hide important inconsistencies. A system may be capable of producing an estimate, recommendation, or suggested action while still lacking the professional context required to own the decision.",
        "The design goal therefore is not to maximize the number of decisions AI can make. It is to decide which parts of the work AI can perform usefully while preserving meaningful human judgment where the consequences are highest.",
        "The project also reinforced another boundary: simulated research has a stopping point.",
        "AI helped me simulate the role, generate better questions, and uncover aspects of the domain I had not initially considered. But running the design back through another AI model would only produce a simulated evaluation. It would not tell me whether a real adjuster found the system useful, whether the information was legally appropriate, or whether the recommendations supported better decisions.",
        "The experiment ended there because I did not have the bandwidth or access required to validate it responsibly.",
        "That limitation became part of the project’s value. It taught me to distinguish between using AI to explore a problem, using AI to support a decision, and using real evidence to determine whether either one actually works.",
      ],
      insight:
        "Capability does not automatically grant decision authority. AI can contribute heavily to judgment without owning the final decision.",
    },
  ] satisfies MobileReadingSectionData[],
} as const;
