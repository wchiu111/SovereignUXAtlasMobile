import { defineAtlasEntry } from "../defineAtlasEntry";

import oldHomeDashboard from "../../../imports/case-studies/globality/01-context/1-old-home-dashboard.png";
import oldProjectDashboard from "../../../imports/case-studies/globality/01-context/2-old-project-dashboard.png";
import navNoMentalModel from "../../../imports/case-studies/globality/01-context/3-nav-no-mental-model.png";

import homepageAllUsers from "../../../imports/case-studies/globality/02-problem/1-homepage-all-users.png";
import cardsScanning from "../../../imports/case-studies/globality/02-problem/2-cards-scanning.png";
import dashboardNoOrientation from "../../../imports/case-studies/globality/02-problem/3-dashboard-no-orientation.png";

import navExploreTop from "../../../imports/case-studies/globality/03-approach/1-nav-explore-top.png";
import navExploreTopOpen from "../../../imports/case-studies/globality/03-approach/2-nav-explore-top-open.png";
import navExploreSide from "../../../imports/case-studies/globality/03-approach/3-nav-explore-side.png";
import navExploreSideOpen from "../../../imports/case-studies/globality/03-approach/4-nav-explore-side-open.png";
import navRespondsContext from "../../../imports/case-studies/globality/03-approach/5-nav-responds-context.png";

import projectCardsToOperationalAwareness from "../../../imports/case-studies/globality/04-decisions/1-project-cards-to-operational-awareness.png";
import designAroundDecisionsHome from "../../../imports/case-studies/globality/04-decisions/2-design-around-decisions-home.png";
import designAroundDecisionsProject from "../../../imports/case-studies/globality/04-decisions/3-design-around-decisions-project.png";
import stateAwareJourney from "../../../imports/case-studies/globality/04-decisions/4-state-aware-journey.png";

import beforeAfterHome from "../../../imports/case-studies/globality/05-outcomes/1-before-after-home.png";
import beforeAfterProjectWorkspace from "../../../imports/case-studies/globality/05-outcomes/2-before-after-project-workspace.png";
import beforeAfterProjectList from "../../../imports/case-studies/globality/05-outcomes/3-before-after-project-list.png";

import questionsEnterpriseProducts from "../../../imports/case-studies/globality/06-lessons/1-questions-enterprise-products.png";

const focus = {
  headline: "Globality",
  subheadline:
    "Redesigning an AI-assisted procurement platform around orientation, work states, and the decisions users needed to make next.",
  sections: [
    {
      id: "context",
      label: "Context",
      accentStellarType: "relational",
      subtitle: "A powerful platform that did not always communicate where users were",
      readingTime: 3,
      content: `Globality was an AI-assisted procurement platform designed to help enterprise teams create sourcing projects, develop briefs, discover providers, evaluate proposals, and move work toward launch.

The platform already supported a complex procurement journey. The problem was not a lack of capability. It was that users could not always tell where they were, what required attention, or what they should do next.

When we reviewed the experience through the perspective of both new and returning users, a deeper issue became visible.

The navigation existed, but it did not guide.

The logged-in home experience and the project workspace looked structurally similar, even though they served different purposes. Global actions, account tools, and project-specific destinations competed inside the same navigation model. Important actions such as creating a project were present, but not surfaced at the moment they became relevant.

What initially appeared to be a navigation redesign became a broader effort to improve orientation across the product.`,
      insight:
        "The system knew whether someone was browsing the platform or working inside a project. The interface did not communicate that distinction clearly enough.",
      evidence: [
        {
          id: "old-home-dashboard",
          image: oldHomeDashboard,
          alt: "Original Globality home dashboard",
          imageFit: "contain",
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
          image: oldProjectDashboard,
          alt: "Original Globality project dashboard",
          imageFit: "contain",
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
          image: navNoMentalModel,
          alt: "Original Globality navigation structure",
          imageFit: "contain",
          number: "03",
          title: "Navigation Without a Clear Mental Model",
          type: "Information Architecture",
          description:
            "Global destinations, account tools, project actions, and support entry points were distributed across several navigation surfaces without one clear organizing principle.",
          caption:
            "The navigation provided access, but it did not consistently explain whether an action belonged to the platform, the account, or the active project.",
        },
      ],
    },
    {
      id: "problem",
      label: "The Problem",
      accentStellarType: "risk",
      subtitle: "Small orientation failures accumulated across the entire workflow",
      readingTime: 4,
      content: `The usability issues were not isolated to a single screen.

They appeared across the path from login to active project work.

New users needed a clear place to begin, but the primary create-project action was treated like another navigation item. Returning users needed to scan active work, compare project states, and identify what required attention, but the card-based project view made cross-project comparison difficult.

The homepage also tried to serve too many purposes at once. It needed to onboard new users, help returning users resume work, surface projects, provide support, and make the AI assistant visible.

Inside a project, the dashboard still relied heavily on broad prompts rather than clearly surfacing project state, recent changes, and next actions.

The AI assistant added another layer of friction. Its prompts were often relevant in a general sense, but they repeated what the interface already showed rather than resolving a specific moment of uncertainty.

The product contained the information users needed. The difficulty was recognizing what mattered now.

Every transition required users to rebuild their context:

• Am I at the platform level or inside a project?
• What stage is this project in?
• What changed since I was last here?
• Which action should I take next?

The problem was not that the platform lacked navigation.

The problem was that the product repeatedly asked users to orient themselves.`,
      insight:
        "The largest usability cost came from making users reconstruct their context after every transition.",
      evidence: [
        {
          id: "homepage-serving-everyone",
          image: homepageAllUsers,
          alt: "Original Globality homepage serving new and returning users",
          imageFit: "contain",
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
          image: cardsScanning,
          alt: "Globality project card layout",
          imageFit: "contain",
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
          image: dashboardNoOrientation,
          alt: "Original Globality project dashboard without strong orientation",
          imageFit: "contain",
          number: "03",
          title: "A Dashboard Without Strong Orientation",
          type: "Workflow Problem",
          description:
            "The project workspace surfaced broad assistant guidance but gave less emphasis to project state, recent activity, and the actions most likely to move the work forward.",
          caption:
            "The dashboard contained useful tools, but it did not answer the user’s most immediate question: what matters in this project right now?",
        },
      ],
    },
    {
      id: "approach",
      label: "Approach",
      accentStellarType: "strategy",
      subtitle: "Exploring how navigation could preserve context without consuming the workspace",
      readingTime: 4,
      content: `We did not need to begin with a completely new research program.

Feedback from designers, product managers, leadership, Customer Success, and internal procurement users was already pointing toward the same issues: users struggled to distinguish the home experience from the project experience, critical actions were difficult to locate, and the navigation did not reflect the way procurement work actually progressed.

We consolidated those signals and mapped the platform around the user journey:

1. Create a project
2. Develop the brief
3. Match with providers
4. Review providers and proposals
5. Collaborate and decide
6. Award and launch the work

From there, I explored multiple navigation structures.

The goal was not simply to choose between a top navigation and a side navigation. Each direction tested a different balance between visibility, recognition, screen space, and contextual depth.

The collapsed states tested how little navigation could remain visible while still preserving orientation. The open states tested whether users could reveal labels and deeper destinations without permanently shrinking the work area.

That distinction matters.

The closed and open versions were not competing final designs. They were paired states of the same interaction model: one optimized for focused work, the other for deliberate navigation.

The exploration ultimately led to a two-level architecture:

• Home-level navigation for creating work, reviewing the portfolio, accessing resources, and managing the account
• In-project navigation for the brief, providers, proposals, collaborators, and project-specific actions

The interface could now communicate a meaningful shift between browsing the platform and acting inside a project.`,
      insight:
        "The navigation needed to preserve orientation in its quiet state and reveal depth only when the user asked for it.",
      evidence: [
        {
          id: "top-navigation-closed",
          image: navExploreTop,
          alt: "Collapsed top-navigation exploration for Globality",
          imageFit: "contain",
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
          image: navExploreTopOpen,
          alt: "Expanded top-navigation exploration for Globality",
          imageFit: "contain",
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
          image: navExploreSide,
          alt: "Collapsed side-navigation exploration for Globality",
          imageFit: "contain",
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
          image: navExploreSideOpen,
          alt: "Expanded side-navigation exploration for Globality",
          imageFit: "contain",
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
          image: navRespondsContext,
          alt: "Globality home-level and in-project navigation comparison",
          imageFit: "contain",
          number: "05",
          title: "Navigation That Responds to Context",
          type: "Information Architecture",
          description:
            "The final architecture distinguished platform-level destinations from the tools and stages associated with an active project.",
          caption:
            "The navigation no longer treated every destination as universally relevant. It changed to reflect whether the user was managing the portfolio or progressing through a project.",
        },
      ],
    },
    {
      id: "decisions",
      label: "Key Decisions",
      accentStellarType: "judgment",
      subtitle: "Designing the interface around the next decision",
      readingTime: 5,
      content: `Several decisions reshaped the experience beyond navigation.

The first was to elevate “Create Project” from a navigation link into a contextual action on the home experience. New work could begin where the need became visible rather than inside a menu users first had to interpret.

The second was to replace the project cards with a table.

Returning procurement users were often managing several projects at once. They needed to compare stage, ownership, recent activity, status, deadlines, and next steps. The table treated the portfolio as operational work rather than a gallery of individual projects.

The third decision was to redesign the home and project dashboards around different questions.

The home experience answered:

• What work is active?
• What changed?
• Where should I resume?
• How do I start something new?

The project workspace answered:

• What stage is this project in?
• What requires attention?
• Who is involved?
• What action will move the project forward?

The fourth decision was to make the product state-aware.

A project beginning with a brief should not expose the same destinations and actions as a project reviewing proposals or preparing to launch. Navigation and available actions needed to evolve with the work.

The AI assistant followed the same principle.

Instead of maintaining a large, persistent presence, Glo could remain quiet during routine activity and surface only when the system had something useful to say. We described this behavior as thresholding.

The assistant might appear after a brief was completed, when provider matches became available, or when a stalled decision could be unblocked. Its value came from timing and context—not constant visibility.`,
      insight:
        "The interface became clearer when every surface answered one question: what does the user need to understand before making the next decision?",
      evidence: [
        {
          id: "project-cards-to-operational-awareness",
          image: projectCardsToOperationalAwareness,
          alt: "Globality project table replacing project cards",
          imageFit: "contain",
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
          image: designAroundDecisionsHome,
          alt: "Redesigned Globality home dashboard",
          imageFit: "contain",
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
          image: designAroundDecisionsProject,
          alt: "Redesigned Globality project dashboard",
          imageFit: "contain",
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
          image: stateAwareJourney,
          alt: "State-aware procurement journey from home to award and launch",
          imageFit: "contain",
          number: "04",
          title: "Designing the Product Around Work States",
          type: "System Model",
          description:
            "A retrospective model showing the progression from Home to Create Project, Brief, Provider Match, Proposal Review, and Award or Launch.",
          caption:
            "Each stage creates a different question, so navigation, information, and available actions should evolve instead of remaining static throughout the journey.",
        },
      ],
    },
    {
      id: "outcomes",
      label: "Outcomes",
      accentStellarType: "agentic",
      subtitle: "A clearer distinction between entering, managing, and progressing work",
      readingTime: 4,
      content: `We built and tested a three-screen prototype covering the Home experience, the project portfolio, and the Project Dashboard.

Internal procurement users completed realistic tasks such as identifying a project that required attention, returning to a specific brief, and understanding what action was available next.

The strongest signals were behavioral.

Users distinguished the home and project contexts more easily. The table improved scanning across active work. The project dashboard provided clearer orientation around stage, status, collaborators, and next actions. Contextual navigation reduced unnecessary searching.

The redesign was reviewed across product, design, engineering, leadership, and Customer Success.

Customer-facing teams had already documented recurring confusion around the previous navigation and homepage. The new structure gave the organization a clearer shared model for how users should move from portfolio-level awareness into focused project work.

I would not attach performance or satisfaction percentages to this version of the case study unless the original measurement source can be documented.

What the evidence does support is a visible structural improvement:

• Home and project contexts became distinct
• Active work became easier to compare
• Next actions became more explicit
• AI assistance became quieter and more contextual
• The experience better reflected the procurement journey

The product did not become less complex.

It became better at communicating which part of that complexity mattered now.`,
      insight:
        "The redesign worked because the product began communicating context before asking the user to act.",
      evidence: [
        {
          id: "before-after-home",
          image: beforeAfterHome,
          alt: "Before-and-after comparison of the Globality home experience",
          imageFit: "contain",
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
          image: beforeAfterProjectWorkspace,
          alt: "Before-and-after comparison of the Globality project workspace",
          imageFit: "contain",
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
          image: beforeAfterProjectList,
          alt: "Before-and-after comparison of Globality project cards and project table",
          imageFit: "contain",
          number: "03",
          title: "Before and After: Project Portfolio",
          type: "Content Comparison",
          description:
            "The portfolio shifted from individually presented project cards to a table optimized for comparison, prioritization, and return visits.",
          caption:
            "The new structure helps users scan across projects rather than opening each one to reconstruct its status.",
        },
      ],
    },
    {
      id: "lessons",
      label: "Lessons",
      accentStellarType: "purpose",
      subtitle: "What navigation work taught me about orientation",
      readingTime: 3,
      content: `At the time, I thought I was redesigning navigation.

Looking back, I was designing orientation.

Users do not experience enterprise products as a sequence of pages. They experience changing states of work:

• entering
• learning
• starting
• planning
• reviewing
• deciding
• completing
• returning

A product becomes easier to use when its structure communicates those changes.

The project gave me a model I continued to use in later work.

Every product should continuously answer five questions:

• Where am I?
• What changed?
• What matters now?
• What can I do next?
• How do I return?

When those questions are answered clearly, users can spend less attention interpreting the interface and more attention on the work itself.

The lesson also changed how I thought about AI assistance.

An intelligent system should not speak merely because it can. It should understand the user’s state, recognize when uncertainty has crossed a meaningful threshold, and offer the right support without taking over the experience.

That thinking later became part of how I approached presence, context, and spatial continuity in Sovereign Atlas.`,
      insight:
        "Users should not have to reconstruct their context every time they change screens. Good enterprise products preserve orientation throughout the journey.",
      evidence: [
        {
          id: "questions-every-product-must-answer",
          image: questionsEnterpriseProducts,
          alt: "Orientation model showing five questions every product must answer",
          imageFit: "contain",
          number: "01",
          title: "The Questions Every Product Must Answer",
          type: "Orientation Model",
          description:
            "A reflective system model organized around five questions that help users understand their current situation before taking action.",
          caption:
            "Orientation is not one navigation feature. It is the continuous reinforcement of location, change, priority, action, and return.",
        },
      ],
    },
  ],
};

export default defineAtlasEntry({
  id: "globality",
  category: "case-study",
  signatureStellarType: "strategy",
  title: "GLOBALITY",
  subtitle:
    "Redesigning an AI-assisted procurement platform around orientation, work states, and the decisions users needed to make next.",
  tags: ["ENTERPRISE SYSTEMS", "WORKFLOW"],
  overview: {
    what:
      "A navigation and workflow redesign spanning Globality’s home experience, project portfolio, and in-project workspace.",
    why:
      "The platform contained powerful procurement and AI capabilities, but users repeatedly had to reconstruct where they were, what had changed, and what action mattered next.",
    researchFocus:
      "How navigation, dashboards, and contextual AI could respond to the user’s current work state while preserving clarity across a complex procurement journey.",
    keyDiscovery:
      "Users do not experience enterprise products as a collection of pages. They experience changing states of work—and the interface must preserve orientation between them.",
  },
  orbit: {
    angle: 50,
    radius: 115,
    speed: 1.05e-4,
    starPrefix: "glob",
  },
  overviewStars: [
    {
      id: "context",
      label: "CONTEXT",
      angle: 165,
      x: -1.35,
      y: 0.52,
      scale: 0.94,
      stellarType: "relational",
      intensity: "balanced",
      labelPosition: { side: "left", offset: 28 },
    },
    {
      id: "problem",
      label: "PROBLEM",
      angle: -150,
      x: -0.88,
      y: 0.12,
      scale: 1.02,
      stellarType: "risk",
      intensity: "bright",
      labelPosition: { side: "top", offset: 30 },
    },
    {
      id: "approach",
      label: "APPROACH",
      angle: -105,
      x: -0.3,
      y: 0.34,
      scale: 1.08,
      stellarType: "strategy",
      intensity: "bright",
      labelPosition: { side: "left", offset: 30 },
    },
    {
      id: "decisions",
      label: "DECISIONS",
      angle: -50,
      x: 0.3,
      y: -0.18,
      scale: 1.18,
      stellarType: "judgment",
      intensity: "bright",
      labelPosition: { side: "top", offset: 32 },
    },
    {
      id: "outcomes",
      label: "OUTCOMES",
      angle: -5,
      x: 0.88,
      y: -0.02,
      scale: 1.1,
      stellarType: "agentic",
      intensity: "bright",
      labelPosition: { side: "bottom", offset: 30 },
    },
    {
      id: "lessons",
      label: "LESSONS",
      angle: 32,
      x: 1.34,
      y: -0.58,
      scale: 0.96,
      stellarType: "purpose",
      intensity: "balanced",
      labelPosition: { side: "right", offset: 28 },
    },
  ],
  constellation: {
    showCenterConnections: false,
    connections: [
      { from: "context", to: "problem", strength: "primary" },
      { from: "problem", to: "approach", strength: "primary" },
      { from: "approach", to: "decisions", strength: "primary" },
      { from: "decisions", to: "outcomes", strength: "primary" },
      { from: "outcomes", to: "lessons", strength: "primary" },
    ],
  },
  caseStudyId: "globality",
  focus,
  sections: focus.sections,
});
