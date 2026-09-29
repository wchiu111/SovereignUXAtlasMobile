export type BehavioralStageId = "interpret" | "separate" | "frame" | "recommend" | "confirm" | "act";
export interface BehavioralStage {
  id: BehavioralStageId; title: string; summary: string; detail: string; prompts: string[];
  colorRole: "agentic" | "purpose" | "strategy" | "judgment" | "risk" | "relational";
  annotation: { what:string; why:string; principle:string; question:string; };
}
export const BEHAVIORAL_STAGES: BehavioralStage[] = [
  {id:"interpret",title:"Interpret",summary:"Understand context before forming a response.",detail:"Make the system's read of the situation inspectable: what signals matter, what is missing, and what assumptions are being made.",prompts:["What signals is the system using?","What context may be missing?","Which assumptions affect the outcome?"],colorRole:"agentic",annotation:{what:"The experience begins with one observable point of attention.",why:"Orientation comes before analysis. The system should not rush into a conclusion before the user can see what is being interpreted.",principle:"Presence before complexity.",question:"What are we observing before we decide what it means?"}},
  {id:"separate",title:"Separate",summary:"Keep information, interpretation, and recommendation distinct.",detail:"Prevent inference from appearing as fact or recommendation as inevitability. Users should be able to tell what is known, inferred, and suggested.",prompts:["What is observable information?","What has the system inferred?","What is merely being recommended?"],colorRole:"purpose",annotation:{what:"The interface exposes distinct layers of meaning.",why:"Users can only challenge a recommendation when they can see where observation ends and inference begins.",principle:"Information ≠ interpretation ≠ recommendation.",question:"Could a user tell which part of this answer is fact?"}},
  {id:"frame",title:"Frame",summary:"Expose options, trade-offs, assumptions, and consequences.",detail:"Decision framing changes what feels available. Show the criteria and alternatives that shape the recommendation instead of quietly narrowing the user's decision space.",prompts:["What alternatives remain viable?","Which trade-offs are being privileged?","What would change the framing?"],colorRole:"strategy",annotation:{what:"Alternative paths become visible without competing equally for attention.",why:"Framing determines what feels possible before any recommendation is made.",principle:"Reveal the decision space before narrowing it.",question:"What choice disappears if this framing is accepted?"}},
  {id:"recommend",title:"Recommend",summary:"Offer a next step with proportional strength.",detail:"Recommendations should be identifiable as recommendations, calibrated to evidence, and accompanied by enough rationale for the user to challenge them.",prompts:["How strong should the recommendation sound?","What evidence supports it?","When should the system remain neutral?"],colorRole:"judgment",annotation:{what:"The recommendation appears only after the supporting context has been exposed.",why:"A recommendation should feel earned by the reasoning that precedes it.",principle:"Meaning before authority.",question:"How strongly should the system speak given the evidence available?"}},
  {id:"confirm",title:"Confirm",summary:"Return consequential choice to the human.",detail:"Before meaningful action, give users a clear opportunity to confirm, correct, reject, or revise the system's interpretation and proposed next step.",prompts:["What requires explicit confirmation?","Can the interpretation be corrected?","Can the user reject the recommendation cleanly?"],colorRole:"risk",annotation:{what:"The user receives an explicit decision checkpoint.",why:"Consequential action should not be hidden inside momentum or automation.",principle:"Human authority remains visible.",question:"What can the user still change before action occurs?"}},
  {id:"act",title:"Act",summary:"Proceed only within confirmed authority and scope.",detail:"Action is the end of the behavioral sequence, not the starting assumption. The system should act only after authority, scope, and intent are sufficiently clear.",prompts:["Has intent been confirmed?","Is the action within system scope?","Can the action be reversed or audited?"],colorRole:"relational",annotation:{what:"The system acts only after the earlier conditions have been established.",why:"Action becomes a consequence of clear authority rather than a default expression of intelligence.",principle:"Act within confirmed scope.",question:"What proves that the system is authorized to continue?"}},
];
export const CHECKLIST=["Can users distinguish facts from interpretation?","Is the recommendation visibly a recommendation?","Are assumptions exposed where they affect the outcome?","Is uncertainty communicated proportionally?","Can the user correct the system's interpretation?","Can the recommendation be rejected without friction?","Does the system seek confirmation before consequential action?","Can the system decide not to recommend?"];
export const APPLY_COMPARISON = {
  scenario: "Find a better time for the project review.",
  recommendation: "Tuesday at 2:00 PM",
  without: { rationale:"Best time based on team availability.", primaryAction:"Accept recommendation", secondaryAction:"Choose another time" },
  with: {
    observed:"5 attendees invited. 4 are available Tuesday afternoon.",
    inferred:"The project owner appears flexible; one attendee has a soft conflict.",
    alternatives:[
      {time:"Monday · 4:30 PM",tradeoff:"All attendees available, later in the day."},
      {time:"Tuesday · 2:00 PM",tradeoff:"4 of 5 available; strongest overall fit.",recommended:true},
      {time:"Wednesday · 11:00 AM",tradeoff:"All attendees available; pushes review one day."},
    ],
    confirm:"Reschedule the project review to Tuesday at 2:00 PM?",
    primaryAction:"Confirm & reschedule", secondaryAction:"Keep current time",
  },
} as const;
export const APPLY_CHANGE_NOTES = [
  {id:"interpret",label:"Context appears before suggestion."},
  {id:"separate",label:"Observation and inference remain distinct."},
  {id:"frame",label:"Alternatives and trade-offs are visible."},
  {id:"recommend",label:"Recommendation follows reasoning."},
  {id:"confirm",label:"Consequential choice returns to the human."},
  {id:"act",label:"Action follows confirmed authority."},
] as const;
