import oldHomeDashboard from "../../../../imports/case-studies/globality/01-context/1-old-home-dashboard.png";
import oldProjectDashboard from "../../../../imports/case-studies/globality/01-context/2-old-project-dashboard.png";
import navNoMentalModel from "../../../../imports/case-studies/globality/01-context/3-nav-no-mental-model.png";

import homepageAllUsers from "../../../../imports/case-studies/globality/02-problem/1-homepage-all-users.png";
import cardsScanning from "../../../../imports/case-studies/globality/02-problem/2-cards-scanning.png";
import dashboardNoOrientation from "../../../../imports/case-studies/globality/02-problem/3-dashboard-no-orientation.png";

import navExploreTop from "../../../../imports/case-studies/globality/03-approach/1-nav-explore-top.png";
import navExploreTopOpen from "../../../../imports/case-studies/globality/03-approach/2-nav-explore-top-open.png";
import navExploreSide from "../../../../imports/case-studies/globality/03-approach/3-nav-explore-side.png";
import navExploreSideOpen from "../../../../imports/case-studies/globality/03-approach/4-nav-explore-side-open.png";
import navRespondsContext from "../../../../imports/case-studies/globality/03-approach/5-nav-responds-context.png";

import projectCardsToOperationalAwareness from "../../../../imports/case-studies/globality/04-decisions/1-project-cards-to-operational-awareness.png";
import designAroundDecisionsHome from "../../../../imports/case-studies/globality/04-decisions/2-design-around-decisions-home.png";
import designAroundDecisionsProject from "../../../../imports/case-studies/globality/04-decisions/3-design-around-decisions-project.png";
import stateAwareJourney from "../../../../imports/case-studies/globality/04-decisions/4-state-aware-journey.png";

import beforeAfterHome from "../../../../imports/case-studies/globality/05-outcomes/1-before-after-home.png";
import beforeAfterProjectWorkspace from "../../../../imports/case-studies/globality/05-outcomes/2-before-after-project-workspace.png";
import beforeAfterProjectList from "../../../../imports/case-studies/globality/05-outcomes/3-before-after-project-list.png";

import questionsEnterpriseProducts from "../../../../imports/case-studies/globality/06-lessons/1-questions-enterprise-products.png";

import type { MobileEvidenceItem } from "./mobileReadingTypes";

export const GLOBALITY_EVIDENCE: readonly MobileEvidenceItem[] = [
  {
    id: "old-home-dashboard",
    sectionId: "context",
    insertAfterParagraph: 1,
    image: oldHomeDashboard,
    imageFit: "contain",
    alt: "Original Globality home dashboard",
    number: "01",
    title: "The Original Home Experience",
    type: "Existing Experience",
    description:
      "The logged-in home combined broad onboarding guidance, active-project prompts, and persistent AI assistance inside one shared workspace.",
    caption:
      "The experience attempted to support new and returning users at the same time, but it did not establish a clear hierarchy between learning, starting, and resuming work.",
  },
  {
    id: "old-project-dashboard",
    sectionId: "context",
    insertAfterParagraph: 3,
    image: oldProjectDashboard,
    imageFit: "contain",
    alt: "Original Globality project dashboard",
    number: "02",
    title: "The Original Project Workspace",
    type: "Existing Experience",
    description:
      "The project-level experience used much of the same visual and behavioral structure as the home experience, despite representing a different level of work.",
    caption:
      "Moving into a project did not create a strong enough shift in context, so users had to reconstruct where they were after the transition.",
  },
  {
    id: "navigation-without-mental-model",
    sectionId: "context",
    insertAfterParagraph: 6,
    image: navNoMentalModel,
    imageFit: "contain",
    alt: "Original Globality navigation structure",
    number: "03",
    title: "Navigation Without a Clear Mental Model",
    type: "Information Architecture",
    description:
      "Global destinations, account tools, project actions, and support entry points were distributed across several navigation surfaces without one clear organizing principle.",
    caption:
      "The navigation provided access, but it did not consistently explain whether an action belonged to the platform, the account, or the active project.",
  },
  {
    id: "homepage-serving-everyone",
    sectionId: "problem",
    insertAfterParagraph: 1,
    image: homepageAllUsers,
    imageFit: "contain",
    alt: "Original Globality homepage serving new and returning users",
    number: "01",
    title: "A Homepage Trying to Serve Everyone",
    type: "Usability Problem",
    description:
      "The homepage combined onboarding, project entry points, assistant messaging, and returning-user tasks without making one intent dominant.",
    caption:
      "New users needed orientation while returning users needed operational awareness, but both groups were given nearly the same experience.",
  },
  {
    id: "cards-against-scanning",
    sectionId: "problem",
    insertAfterParagraph: 2,
    image: cardsScanning,
    imageFit: "contain",
    alt: "Globality project card layout",
    number: "02",
    title: "When Cards Worked Against Scanning",
    type: "Content Structure",
    description:
      "The project-card layout presented each project cleanly in isolation but made it harder to compare status, ownership, deadlines, and next steps across a portfolio.",
    caption:
      "The format optimized individual presentation at the expense of the cross-project awareness returning users needed.",
  },
  {
    id: "dashboard-without-orientation",
    sectionId: "problem",
    insertAfterParagraph: 4,
    image: dashboardNoOrientation,
    imageFit: "contain",
    alt: "Original Globality project dashboard without strong orientation",
    number: "03",
    title: "A Dashboard Without Strong Orientation",
    type: "Workflow Problem",
    description:
      "The project workspace surfaced broad assistant guidance but gave less emphasis to project state, recent activity, and the actions most likely to move the work forward.",
    caption:
      "The dashboard contained useful tools, but it did not answer the user’s most immediate question: what matters in this project right now?",
  },
  {
    id: "top-navigation-closed",
    sectionId: "approach",
    insertAfterParagraph: 5,
    image: navExploreTop,
    imageFit: "contain",
    alt: "Collapsed top-navigation exploration for Globality",
    number: "01",
    title: "Top Navigation: Quiet State",
    type: "Navigation Exploration",
    description:
      "A compact top-navigation direction tested whether global destinations could remain discoverable without permanently reducing the horizontal workspace.",
    caption:
      "The closed state preserved screen space and kept the current task dominant while maintaining a visible entry point into the broader platform.",
  },
  {
    id: "top-navigation-open",
    sectionId: "approach",
    insertAfterParagraph: 5,
    image: navExploreTopOpen,
    imageFit: "contain",
    alt: "Expanded top-navigation exploration for Globality",
    number: "02",
    title: "Top Navigation: Revealed State",
    type: "Interaction State",
    description:
      "The expanded state exposed destination labels and account actions only when the user intentionally opened the navigation.",
    caption:
      "Paired with the quiet state, this direction explored progressive disclosure: orientation remained available without requiring every destination to stay visible.",
  },
  {
    id: "side-navigation-closed",
    sectionId: "approach",
    insertAfterParagraph: 7,
    image: navExploreSide,
    imageFit: "contain",
    alt: "Collapsed side-navigation exploration for Globality",
    number: "03",
    title: "Side Navigation: Quiet State",
    type: "Navigation Exploration",
    description:
      "A collapsed side-navigation direction tested whether persistent icons could communicate location and preserve more vertical continuity across the product.",
    caption:
      "The compact rail supported focused work, but depended on strong icon recognition and a clear active-state treatment.",
  },
  {
    id: "side-navigation-open",
    sectionId: "approach",
    insertAfterParagraph: 7,
    image: navExploreSideOpen,
    imageFit: "contain",
    alt: "Expanded side-navigation exploration for Globality",
    number: "04",
    title: "Side Navigation: Revealed State",
    type: "Interaction State",
    description:
      "The expanded state paired labels with the persistent icon rail, revealing the full navigation model when users needed additional certainty.",
    caption:
      "The open and closed states worked as one system: compact during routine work, explicit during navigation or reorientation.",
  },
  {
    id: "navigation-responds-to-context",
    sectionId: "approach",
    insertAfterParagraph: 9,
    image: navRespondsContext,
    imageFit: "contain",
    alt: "Globality home-level and in-project navigation comparison",
    number: "05",
    title: "Navigation That Responds to Context",
    type: "Information Architecture",
    description:
      "The final architecture distinguished platform-level destinations from the tools and stages associated with an active project.",
    caption:
      "The navigation no longer treated every destination as universally relevant. It changed to reflect whether the user was managing the portfolio or progressing through a project.",
  },
  {
    id: "project-cards-to-operational-awareness",
    sectionId: "decisions",
    insertAfterParagraph: 3,
    image: projectCardsToOperationalAwareness,
    imageFit: "contain",
    alt: "Globality project table replacing project cards",
    number: "01",
    title: "From Project Cards to Operational Awareness",
    type: "Content Architecture",
    description:
      "The redesigned project list used a table to make stage, ownership, activity, status, and next actions easier to compare across several projects.",
    caption:
      "The shift was not stylistic. It changed the portfolio from a set of isolated cards into a workspace for scanning and prioritization.",
  },
  {
    id: "design-around-decisions-home",
    sectionId: "decisions",
    insertAfterParagraph: 5,
    image: designAroundDecisionsHome,
    imageFit: "contain",
    alt: "Redesigned Globality home dashboard",
    number: "02",
    title: "Designing Around the Next Decision: Home",
    type: "Dashboard Design",
    description:
      "The redesigned home separated suggested actions, recent projects, learning resources, and project creation into a clearer hierarchy for new and returning users.",
    caption:
      "The home experience became an orientation layer: start new work, recognize what changed, or return to something already in progress.",
  },
  {
    id: "design-around-decisions-project",
    sectionId: "decisions",
    insertAfterParagraph: 6,
    image: designAroundDecisionsProject,
    imageFit: "contain",
    alt: "Redesigned Globality project dashboard",
    number: "03",
    title: "Designing Around the Next Decision: Project",
    type: "Workflow Dashboard",
    description:
      "The project workspace consolidated stage, progress, team, brief status, provider activity, and proposals around the active project.",
    caption:
      "The dashboard stopped behaving like a generic landing page and began answering the specific questions required to move the project forward.",
  },
  {
    id: "state-aware-journey",
    sectionId: "decisions",
    insertAfterParagraph: 7,
    image: stateAwareJourney,
    imageFit: "contain",
    alt: "State-aware procurement journey from home to award and launch",
    number: "04",
    title: "Designing the Product Around Work States",
    type: "System Model",
    description:
      "A retrospective model showing the progression from Home to Create Project, Brief, Provider Match, Proposal Review, and Award or Launch.",
    caption:
      "Each stage creates a different question, so navigation, information, and available actions should evolve instead of remaining static throughout the journey.",
  },
  {
    id: "before-after-home",
    sectionId: "outcomes",
    insertAfterParagraph: 4,
    image: beforeAfterHome,
    imageFit: "contain",
    alt: "Before-and-after comparison of the Globality home experience",
    number: "01",
    title: "Before and After: Home",
    type: "Experience Comparison",
    description:
      "The comparison shows the shift from a broad assistant-led homepage toward a clearer hierarchy of active work, suggested actions, and project entry points.",
    caption:
      "The redesigned home makes a stronger distinction between orientation, resuming work, and creating something new.",
  },
  {
    id: "before-after-project-workspace",
    sectionId: "outcomes",
    insertAfterParagraph: 7,
    image: beforeAfterProjectWorkspace,
    imageFit: "contain",
    alt: "Before-and-after comparison of the Globality project workspace",
    number: "02",
    title: "Before and After: Project Workspace",
    type: "Experience Comparison",
    description:
      "The project workspace moved from generic guidance toward a state-specific view of progress, team activity, providers, proposals, and next steps.",
    caption:
      "The new dashboard reduces the need to search across the project by bringing the current state and relevant decisions into one view.",
  },
  {
    id: "before-after-project-list",
    sectionId: "outcomes",
    insertAfterParagraph: 10,
    image: beforeAfterProjectList,
    imageFit: "contain",
    alt: "Before-and-after comparison of Globality project cards and project table",
    number: "03",
    title: "Before and After: Project Portfolio",
    type: "Content Comparison",
    description:
      "The portfolio shifted from individually presented project cards to a table optimized for comparison, prioritization, and return visits.",
    caption:
      "The new structure helps users scan across projects rather than opening each one to reconstruct its status.",
  },
  {
    id: "questions-every-product-must-answer",
    sectionId: "lessons",
    insertAfterParagraph: 3,
    image: questionsEnterpriseProducts,
    imageFit: "contain",
    alt: "Orientation model showing five questions every product must answer",
    number: "01",
    title: "The Questions Every Product Must Answer",
    type: "Orientation Model",
    description:
      "A reflective system model organized around five questions that help users understand their current situation before taking action.",
    caption:
      "Orientation is not one navigation feature. It is the continuous reinforcement of location, change, priority, action, and return.",
  },
] as const;
