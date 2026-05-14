// ============================================================
// REVIEW DATA — Static definitions for all 3 evaluation forms
// ============================================================

// ── SEVERITY SCALE (Heuristic Evaluation) ──────────────────
export const severityScale = [
  { value: 0, label: "No Problem", description: "I don't agree that this is a usability problem at all.", color: "#22c55e" },
  { value: 1, label: "Cosmetic", description: "Aesthetic problem only. No need to fix it immediately. (e.g., Ugly icon).", color: "#eab308" },
  { value: 2, label: "Minor", description: "Minor usability problem. Fix if you have extra time. (e.g., Text is slightly too small).", color: "#f97316" },
  { value: 3, label: "Major", description: "Important to fix. Users will be frustrated. (e.g., Hard to find the 'Back' button).", color: "#ef4444" },
  { value: 4, label: "Catastrophe", description: "Imperative to fix. Users cannot complete the task. (e.g., App crashes, or data is lost).", color: "#991b1b" },
] as const;

// ── UX HEALTH SCORE RATINGS ────────────────────────────────
export const uxHealthRatings = [
  { min: 0, max: 5, label: "Excellent UX", color: "#22c55e" },
  { min: 6, max: 15, label: "Needs minor work", color: "#eab308" },
  { min: 16, max: 30, label: "Needs major redesign", color: "#f97316" },
  { min: 31, max: Infinity, label: "Critical Failure", color: "#ef4444" },
] as const;

// ── THE 10 HEURISTICS ──────────────────────────────────────
export interface HeuristicDefinition {
  id: number;
  name: string;
  description: string;
  checklist: string[];
}

export const heuristics: HeuristicDefinition[] = [
  {
    id: 1,
    name: "Visibility of System Status",
    description: "The design should always keep users informed about what is going on, through appropriate feedback within a reasonable amount of time.",
    checklist: [
      "Does the app show a loading spinner/bar when I wait?",
      "If I click a button, does it change color to show it was pressed?",
      "Can I clearly see where I am in the navigation?",
      "Does it tell me my current status?",
    ],
  },
  {
    id: 2,
    name: "Match Between System and the Real World",
    description: "The design should speak the users' language. Use words, phrases, and concepts familiar to the user, rather than internal jargon.",
    checklist: [
      "Are the icons obvious?",
      'Does it use plain English instead of "Dev Speak"?',
      "Does the workflow match how things happen in real life?",
    ],
  },
  {
    id: 3,
    name: "User Control and Freedom",
    description: 'Users often perform actions by mistake. They need a clearly marked "emergency exit" to leave the unwanted action.',
    checklist: [
      'Is there always a "Back" button?',
      'Can I "Undo" my last action?',
      'Can I "Cancel" a long process while it\'s running?',
      'If I delete something, does it ask "Are you sure?"',
    ],
  },
  {
    id: 4,
    name: "Consistency and Standards",
    description: "Users should not have to wonder whether different words, situations, or actions mean the same thing.",
    checklist: [
      'Do all "Primary Buttons" look the same color/size?',
      "Are fonts consistent across all pages?",
      "Does the app follow standard gestures?",
    ],
  },
  {
    id: 5,
    name: "Error Prevention",
    description: "Good error messages are important, but the best designs carefully prevent problems from occurring in the first place.",
    checklist: [
      "Does it gray out buttons I shouldn't click?",
      'Are there "Input Constraints"?',
      "Does it warn me if I'm about to do something destructive?",
    ],
  },
  {
    id: 6,
    name: "Recognition Rather Than Recall",
    description: "Minimize the user's memory load by making elements, actions, and options visible.",
    checklist: [
      "Are menu items visible, or hidden behind obscure gestures?",
      'When searching, does it show "Recent Searches"?',
      'Does it show "Password Requirements" while I am typing, or only after I fail?',
    ],
  },
  {
    id: 7,
    name: "Flexibility and Efficiency of Use",
    description: "Shortcuts — hidden from novice users — may speed up the interaction for the expert user.",
    checklist: [
      "Are there keyboard shortcuts or gestures for frequent actions?",
      "Can I personalize the dashboard to show what I need?",
      'Is there a "Select All" option?',
    ],
  },
  {
    id: 8,
    name: "Aesthetic and Minimalist Design",
    description: "Interfaces should not contain information which is irrelevant or rarely needed.",
    checklist: [
      "Is there too much text?",
      "Are there too many colors or distractions?",
      'Is there enough "White Space" between elements?',
      "Is the most important button the most visible thing on the screen?",
    ],
  },
  {
    id: 9,
    name: "Help Users Recognize, Diagnose, and Recover from Errors",
    description: "Error messages should be expressed in plain language, precisely indicate the problem, and suggest a solution.",
    checklist: [
      "Do error messages explain what went wrong?",
      "Do they suggest how to fix it?",
      "Are the error messages polite?",
    ],
  },
  {
    id: 10,
    name: "Help and Documentation",
    description: "It's best if the system doesn't need any additional explanation. However, it may be necessary to provide documentation.",
    checklist: [
      "Is there a Search Bar?",
      'Is there a visible "Help" or "FAQ" section?',
      'Are there "Tooltips" next to confusing terms?',
    ],
  },
];

// ── USABILITY TASKS ────────────────────────────────────────
export interface TaskDefinition {
  id: number;
  description: string;
  targetRoute: string;
}

export const usabilityTasks: TaskDefinition[] = [
  { id: 1, description: "Log in to the student portal", targetRoute: "/" },
  { id: 2, description: "Find your class schedule for this semester", targetRoute: "/my-class-schedule" },
  { id: 3, description: "Check your current semester grades", targetRoute: "/my-grade" },
  { id: 4, description: "View your transcript of records", targetRoute: "/my-transcript" },
  { id: 5, description: "Look up offered subjects for next semester", targetRoute: "/offered-subject" },
  { id: 6, description: "Check your outstanding balance", targetRoute: "/my-balances" },
  { id: 7, description: "View your clearance status", targetRoute: "/my-clearance" },
  { id: 8, description: "Find your student information details", targetRoute: "/my-student-information" },
  { id: 9, description: "Toggle between dark mode and light mode", targetRoute: "" },
  { id: 10, description: "Log out of the system safely", targetRoute: "/login" },
];

// ── SUS STATEMENTS ─────────────────────────────────────────
export const susStatements = [
  "I think that I would like to use this system frequently.",
  "I found the system unnecessarily complex.",
  "I thought the system was easy to use.",
  "I think that I would need the support of a technical person to use this system.",
  "I found the various functions in this system were well integrated.",
  "I thought there was too much inconsistency in this system.",
  "I would imagine that most people would learn to use this system very quickly.",
  "I found the system very cumbersome (awkward) to use.",
  "I felt very confident using the system.",
  "I needed to learn a lot of things before I could get going with this system.",
] as const;

// ── QUALITATIVE QUESTIONS ──────────────────────────────────
export const qualitativeQuestions = [
  "What features of the platform did you like the most?",
  "What are the possible features to be added/incorporated?",
  "Which feature do you think is NOT necessary?",
  "What was the most frustrating part of using this app?",
  "If you could change one thing about the design, what would it be?",
  "Did you find the text easy to read and the buttons easy to click?",
  "Your overall remarks.",
] as const;

// ── ACCESSIBILITY SCALE ────────────────────────────────────
export const accessibilityScale = [
  { value: 0, label: "Not Accessible", description: "Accessibility requirement is missing", color: "#ef4444" },
  { value: 1, label: "Needs Improvement", description: "Accessibility is poorly implemented", color: "#f97316" },
  { value: 2, label: "Partially Accessible", description: "Some accessibility features exist but improvements are needed", color: "#eab308" },
  { value: 3, label: "Fully Accessible", description: "Accessibility requirement is completely satisfied", color: "#22c55e" },
] as const;

// ── ACCESSIBILITY RATINGS ──────────────────────────────────
export const accessibilityRatings = [
  { min: 55, max: 63, label: "Excellent Accessibility", color: "#22c55e" },
  { min: 45, max: 54, label: "Good Accessibility", color: "#3b82f6" },
  { min: 30, max: 44, label: "Moderate Accessibility", color: "#eab308" },
  { min: 0, max: 29, label: "Poor Accessibility", color: "#ef4444" },
] as const;

// ── WCAG POUR CHECKLIST ────────────────────────────────────
export interface AccessibilityCriteria {
  label: string;
}

export interface POURCategory {
  id: number;
  name: string;
  description: string;
  maxScore: number;
  criteria: AccessibilityCriteria[];
}

export const pourCategories: POURCategory[] = [
  {
    id: 1,
    name: "Perceivable",
    description: "Users must be able to perceive the information presented.",
    maxScore: 18,
    criteria: [
      { label: "Images include meaningful alternative text (alt text)" },
      { label: "Videos include captions or transcripts" },
      { label: "Text has sufficient color contrast" },
      { label: "Information is not conveyed by color alone" },
      { label: "Text can be resized without breaking the layout" },
      { label: "Audio content includes text alternatives" },
    ],
  },
  {
    id: 2,
    name: "Operable",
    description: "Users must be able to interact with and navigate the interface.",
    maxScore: 18,
    criteria: [
      { label: "Website/app is navigable using keyboard" },
      { label: "Interactive elements show visible focus indicators" },
      { label: "Navigation menus are clear and easy to use" },
      { label: "Buttons and links are large enough to interact with" },
      { label: "Interface avoids flashing or seizure-triggering content" },
      { label: "Users have sufficient time to complete tasks" },
    ],
  },
  {
    id: 3,
    name: "Understandable",
    description: "Users must be able to understand the interface and content.",
    maxScore: 15,
    criteria: [
      { label: "Language is clear and simple" },
      { label: "Navigation structure is consistent across pages" },
      { label: "Forms include clear labels and instructions" },
      { label: "Error messages are clear and helpful" },
      { label: "Interface behavior is predictable" },
    ],
  },
  {
    id: 4,
    name: "Robust",
    description: "Content must work with assistive technologies and different systems.",
    maxScore: 12,
    criteria: [
      { label: "Proper HTML semantic structure is used" },
      { label: "Interface works with screen readers" },
      { label: "Forms and controls include accessible labels" },
      { label: "Content works across different browsers and devices" },
    ],
  },
];

// ── ACCESSIBILITY REFLECTION QUESTIONS ─────────────────────
export const accessibilityReflectionQuestions = [
  "Which WCAG principle had the most issues?",
  "How can the interface be redesigned to improve accessibility?",
] as const;

// ── SUS SCORING HELPER ─────────────────────────────────────
export function calculateSUSScore(responses: number[]): number {
  if (responses.length !== 10) return 0;
  let total = 0;
  for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) {
      // Odd items (1,3,5,7,9): score = response - 1
      total += (responses[i] - 1);
    } else {
      // Even items (2,4,6,8,10): score = 5 - response
      total += (5 - responses[i]);
    }
  }
  return total * 2.5;
}

export function getSUSGrade(score: number): { grade: string; label: string; color: string } {
  if (score >= 80) return { grade: "A", label: "Excellent Usability", color: "#22c55e" };
  if (score >= 68) return { grade: "B", label: "Good Usability", color: "#3b82f6" };
  if (score >= 50) return { grade: "C", label: "Acceptable Usability", color: "#eab308" };
  return { grade: "F", label: "Major Redesign Needed", color: "#ef4444" };
}
