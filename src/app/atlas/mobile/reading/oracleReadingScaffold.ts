import type { MobileReadingSectionData } from "./mobileReadingTypes";

export const ORACLE_READING = {
  title: "ORACLE",
  subtitle:
    "Translating a complex enterprise cloud portfolio into a clearer, more adaptable customer experience.",
  sections: [
    {
      id: "context",
      number: "01",
      label: "CONTEXT",
      subtitle:
        "Designing a clearer entry point into a complex product portfolio",
      readingTime: 3,
      paragraphs: [
        "Oracle offered a broad set of cloud products for higher education, including student systems, human capital management, enterprise resource planning, platform services, and infrastructure.",
        "Each product had its own content, links, screenshots, and supporting resources. But visitors were not arriving with an understanding of Oracle’s internal product structure.",
        "They were arriving with practical questions:\n\n• Which products apply to my institution?\n• How do these products work together?\n• What does each product actually look like?\n• Where should I begin?",
        "The experience needed to translate Oracle’s portfolio into a story that made sense from the customer’s point of view.",
        "I worked across wireframing, content structure, visual design, component exploration, responsive behavior, and final implementation review to help shape the Higher Education microsite.",
      ],
      insight:
        "The challenge was not presenting more Oracle products. It was giving visitors a structure through which they could understand how those products related to their own goals.",
    },
    {
      id: "problem",
      number: "02",
      label: "THE PROBLEM",
      subtitle:
        "Creating consistency without pretending every product was the same",
      readingTime: 3,
      paragraphs: [
        "The information was dense, technical, and uneven.",
        "Some products had several supporting links. Others had fewer. Some needed interface previews. Others required more explanation. A single fixed component could not accommodate every product without creating awkward gaps, inconsistent page heights, or an incomplete experience.",
        "At the same time, the page still needed to feel cohesive and remain aligned with Oracle’s broader design system.",
        "The core problem became:\n\nHow do we create consistency without forcing every product into the same content model?",
        "The initial card-based direction exposed the limitation. It assumed uniform content, but the real portfolio contained meaningful variation.",
      ],
      insight:
        "A reusable component becomes a constraint when it requires the content to behave more consistently than the real system does.",
    },
    {
      id: "approach",
      number: "03",
      label: "APPROACH",
      subtitle: "Treating the page as an information system",
      readingTime: 4,
      paragraphs: [
        "I treated the page as an information system rather than a collection of marketing sections.",
        "The work focused on three connected layers.",
        "Narrative:\nThe page needed to move from the higher-education challenge into Oracle’s role, then into specific products, examples, proof, and next steps.",
        "Visual explanation:\nIcons, imagery, interface previews, and content groupings needed to explain relationships rather than decorate the page.",
        "Component flexibility:\nThe system needed reusable patterns, but those patterns had to accommodate variation across products and content types.",
        "As I worked through the structure, I began thinking less about page sections and more about the sequence in which understanding needed to form.",
        "Each part of the experience needed to answer the question created by the one before it:\n\n• Why should this matter to my institution?\n• What role does Oracle play?\n• Which products are relevant?\n• How do those products work together?\n• What does the experience actually look like?\n• Where can I go deeper?",
        "That sequence became a form of information choreography.",
        "This meant revealing supporting information after enough context existed to make it useful, rather than turning the page into a long, undifferentiated list.",
      ],
      insight:
        "The page did not need to expose every detail at once. It needed to reveal the right information at the moment it became useful.",
    },
    {
      id: "decisions",
      number: "04",
      label: "KEY DECISIONS",
      subtitle:
        "Changing the content model instead of restyling the cards",
      readingTime: 4,
      paragraphs: [
        "The strongest decision was to replace the fixed product-card model with a flexible product explorer.",
        "Product categories remained visible at a glance. Selecting a category revealed its related links and updated the adjacent interface preview. This created a stronger connection between the product name, its supporting content, and what the experience actually looked like.",
        "The interaction also introduced progressive disclosure.",
        "Not every product detail needed to appear simultaneously. Visitors could begin with the overall portfolio, then move deeper when a category became relevant to them.",
        "Supporting content followed the same hierarchy. Customer stories, news, and resources remained available, but they were positioned as proof and deeper pathways rather than competing with the primary product journey.",
        "The design system remained consistent, but the underlying content model became flexible enough to reflect real differences across the portfolio.",
      ],
      insight:
        "The final direction did not merely restyle the original cards. It changed how product information was organized, connected, and revealed.",
    },
    {
      id: "outcomes",
      number: "05",
      label: "OUTCOMES",
      subtitle: "Structural proof across a complex product ecosystem",
      readingTime: 3,
      paragraphs: [
        "The final experience brought a large product portfolio into a more coherent customer journey.",
        "One narrative hierarchy could now accommodate products with very different content needs without forcing them into identical cards. The flexible product explorer preserved a shared interaction model while allowing each category to reveal the links, examples, and interface previews relevant to it.",
        "Progressive disclosure also reduced the need to expose the entire portfolio at once. Visitors could understand the overall product landscape first, then reveal additional detail after a category became relevant.",
        "That hierarchy held across desktop, tablet, and mobile. Responsive behavior preserved the order and purpose of the experience rather than simply compressing the desktop layout.",
        "I do not have reliable product-performance metrics for this specific experience, so I would not attach conversion or engagement claims to it.",
        "The proof in this project is structural: one system could preserve coherence, accommodate meaningful variation, and guide people through complexity without requiring them to absorb all of it at once.",
      ],
      insight:
        "The outcome was not a simpler product portfolio. It was a system that preserved a clear path through complexity across content types and screen sizes.",
    },
    {
      id: "lessons",
      number: "06",
      label: "LESSONS",
      subtitle: "From information architecture to the timing of understanding",
      readingTime: 3,
      paragraphs: [
        "At the time, I saw much of this work as microsite and campaign design.",
        "Looking back, the more important lesson was about translation.",
        "The challenge was not making Oracle’s portfolio appear simpler than it was. The challenge was giving people a structure through which they could understand that complexity.",
        "I learned that:\n\n• consistency should not erase meaningful content differences\n• reusable components need to accommodate variation\n• visual design can explain system relationships\n• progressive disclosure can reduce cognitive load without removing depth\n• enterprise UX often begins with content structure before interface behavior",
        "At Oracle, I did not yet think of this as temporal hierarchy. I thought of it as sequencing a story.",
        "Looking back, the principle was already there: hierarchy is not only about what is visually largest or spatially closest. It is also about what becomes relevant first, what can wait, and what should appear only after the reader has enough context to understand it.",
        "That lesson continued into my later work on enterprise workflows and AI systems.",
        "People do not need every detail at once. They need the right detail at the moment it becomes useful.",
      ],
      insight:
        "Oracle was where I began learning that product design is not only about arranging interfaces. It is about guiding the order in which understanding happens.",
    },
  ] satisfies MobileReadingSectionData[],
} as const;
