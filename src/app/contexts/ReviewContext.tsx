import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import { usabilityTasks, heuristics, pourCategories } from "../data/reviewData";

// ── TYPE DEFINITIONS ───────────────────────────────────────

export type EvaluationType = "heuristic" | "usability" | "accessibility";
export type ReviewPhase = "idle" | "setup" | "evaluating" | "summary";
export type TaskResult = "pass" | "fail" | "assist" | null;
export type SubmissionStatus = "idle" | "submitting" | "success" | "error";

export interface EvaluatorInfo {
  name: string;
  groupName: string;
  targetApp: string;
  device: "Mobile" | "Desktop" | "Tablet";
  date: string;
  evaluationType: "diagnosis" | "peer-review";
}

export interface HeuristicObservation {
  description: string;
  severity: 0 | 1 | 2 | 3 | 4;
  screenshotRef: string;
}

export interface TaskEntry {
  description: string;
  timeSeconds: number;
  result: TaskResult;
  errorClicks: number;
  notes: string;
}

export interface UsabilitySessionDetails {
  version: "original" | "redesigned";
  participantId: string;
  profession: string;
  gender: "male" | "female" | "prefer-not-to-say";
}

export interface AccessibilityItemScore {
  score: number; // 0-3
  notes: string;
}

export interface NavigationLogEntry {
  path: string;
  pageName: string;
  timestamp: number;
}

export interface ReviewMetrics {
  startTime: number;
  totalClicks: number;
  clicksPerPage: Record<string, number>;
  timePerPage: Record<string, number>;
  navigationLog: NavigationLogEntry[];
  lastPageEnterTime: number;
  currentPage: string;
}

export interface ReviewState {
  phase: ReviewPhase;
  evaluationType: EvaluationType | null;
  evaluatorInfo: EvaluatorInfo;

  metrics: ReviewMetrics;

  // Heuristic data
  heuristicCurrentIndex: number;
  heuristicObservations: HeuristicObservation[][];
  showHeuristicCard: boolean;

  // Usability data
  usabilitySessionDetails: UsabilitySessionDetails;
  usabilityCurrentTask: number;
  usabilityTasks: TaskEntry[];
  usabilityTaskActive: boolean;
  susResponses: number[];
  qualitativeAnswers: string[];
  usabilityPhase: "setup" | "tasks" | "sus" | "qualitative" | "done";

  // Accessibility data
  accessibilityCurrentCategory: number;
  accessibilityScores: AccessibilityItemScore[][];
  accessibilityIssues: string[];
  accessibilityImprovements: string[];
  accessibilityReflection: string[];
  
  // Submission
  submissionStatus: SubmissionStatus;
  submissionError: string | null;
}

// ── INITIAL STATE ──────────────────────────────────────────

const initialEvaluatorInfo: EvaluatorInfo = {
  name: "",
  groupName: "",
  targetApp: "Ourschool (Redesigned)",
  device: "Desktop",
  date: new Date().toLocaleDateString("en-US"),
  evaluationType: "peer-review",
};

const initialUsabilitySessionDetails: UsabilitySessionDetails = {
  version: "redesigned",
  participantId: "",
  profession: "",
  gender: "prefer-not-to-say",
};

const initialMetrics: ReviewMetrics = {
  startTime: 0,
  totalClicks: 0,
  clicksPerPage: {},
  timePerPage: {},
  navigationLog: [],
  lastPageEnterTime: 0,
  currentPage: "/",
};

function createInitialState(): ReviewState {
  return {
    phase: "idle",
    evaluationType: null,
    evaluatorInfo: { ...initialEvaluatorInfo },
    metrics: { ...initialMetrics },

    heuristicCurrentIndex: 0,
    heuristicObservations: heuristics.map(() => []),
    showHeuristicCard: false,

    usabilitySessionDetails: { ...initialUsabilitySessionDetails },
    usabilityCurrentTask: 0,
    usabilityTasks: usabilityTasks.map((t) => ({
      description: t.description,
      timeSeconds: 0,
      result: null,
      errorClicks: 0,
      notes: "",
    })),
    usabilityTaskActive: false,
    susResponses: Array(10).fill(0),
    qualitativeAnswers: Array(7).fill(""),
    usabilityPhase: "setup",

    accessibilityCurrentCategory: 0,
    accessibilityScores: pourCategories.map((cat) =>
      cat.criteria.map(() => ({ score: 0, notes: "" }))
    ),
    accessibilityIssues: Array(4).fill(""),
    accessibilityImprovements: Array(4).fill(""),
    accessibilityReflection: Array(2).fill(""),
    
    submissionStatus: "idle",
    submissionError: null,
  };
}

// ── CONTEXT DEFINITION ─────────────────────────────────────

interface ReviewContextValue {
  state: ReviewState;

  // Setup actions
  startReview: (type: EvaluationType, info: EvaluatorInfo) => void;
  endReview: () => void;
  resetReview: () => void;
  goToSummary: () => void;

  // Metrics
  recordClick: () => void;
  recordPageChange: (path: string, pageName: string) => void;

  // Heuristic actions
  setHeuristicIndex: (index: number) => void;
  addHeuristicObservation: (heuristicIndex: number, obs: HeuristicObservation) => void;
  removeHeuristicObservation: (heuristicIndex: number, obsIndex: number) => void;
  setShowHeuristicCard: (show: boolean) => void;

  // Usability actions
  setUsabilitySessionDetails: (details: UsabilitySessionDetails) => void;
  setUsabilityPhase: (phase: "setup" | "tasks" | "sus" | "qualitative" | "done") => void;
  startTask: () => void;
  completeTask: (result: TaskResult, notes: string) => void;
  setUsabilityCurrentTask: (index: number) => void;
  setSusResponse: (index: number, value: number) => void;
  setQualitativeAnswer: (index: number, value: string) => void;

  // Accessibility actions
  setAccessibilityCategory: (index: number) => void;
  setAccessibilityScore: (catIndex: number, itemIndex: number, score: number, notes: string) => void;
  setAccessibilityIssue: (index: number, value: string) => void;
  setAccessibilityImprovement: (index: number, value: string) => void;
  setAccessibilityReflection: (index: number, value: string) => void;

  // Computed
  getElapsedTime: () => number;
  getTaskElapsedTime: () => number;

  // Submission
  submitReview: (html: string) => Promise<void>;
}

const ReviewContext = createContext<ReviewContextValue | null>(null);

// ── PROVIDER COMPONENT ─────────────────────────────────────

export function ReviewProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ReviewState>(createInitialState());
  const taskTimerRef = useRef<number>(0);
  const taskClicksRef = useRef<number>(0);

  // ── Setup Actions ──

  const startReview = useCallback((type: EvaluationType, info: EvaluatorInfo) => {
    setState((prev) => ({
      ...prev,
      phase: "evaluating",
      evaluationType: type,
      evaluatorInfo: info,
      metrics: {
        ...initialMetrics,
        startTime: Date.now(),
        lastPageEnterTime: Date.now(),
      },
    }));
  }, []);

  const endReview = useCallback(() => {
    setState((prev) => ({ ...prev, phase: "summary" }));
  }, []);

  const goToSummary = useCallback(() => {
    setState((prev) => ({ ...prev, phase: "summary" }));
  }, []);

  const resetReview = useCallback(() => {
    setState(createInitialState());
  }, []);

  // ── Metrics ──

  const recordClick = useCallback(() => {
    setState((prev) => {
      const currentPage = prev.metrics.currentPage;
      const clicksPerPage = { ...prev.metrics.clicksPerPage };
      clicksPerPage[currentPage] = (clicksPerPage[currentPage] || 0) + 1;
      return {
        ...prev,
        metrics: {
          ...prev.metrics,
          totalClicks: prev.metrics.totalClicks + 1,
          clicksPerPage,
        },
      };
    });
    // Also track clicks during active task
    taskClicksRef.current += 1;
  }, []);

  const recordPageChange = useCallback((path: string, pageName: string) => {
    setState((prev) => {
      const now = Date.now();
      const prevPage = prev.metrics.currentPage;
      const timePerPage = { ...prev.metrics.timePerPage };
      if (prev.metrics.lastPageEnterTime > 0) {
        const elapsed = (now - prev.metrics.lastPageEnterTime) / 1000;
        timePerPage[prevPage] = (timePerPage[prevPage] || 0) + elapsed;
      }
      return {
        ...prev,
        metrics: {
          ...prev.metrics,
          currentPage: path,
          lastPageEnterTime: now,
          timePerPage,
          navigationLog: [
            ...prev.metrics.navigationLog,
            { path, pageName, timestamp: now },
          ],
        },
      };
    });
  }, []);

  // ── Heuristic Actions ──

  const setHeuristicIndex = useCallback((index: number) => {
    setState((prev) => ({ ...prev, heuristicCurrentIndex: index }));
  }, []);

  const addHeuristicObservation = useCallback(
    (heuristicIndex: number, obs: HeuristicObservation) => {
      setState((prev) => {
        const newObs = [...prev.heuristicObservations];
        newObs[heuristicIndex] = [...newObs[heuristicIndex], obs];
        return { ...prev, heuristicObservations: newObs };
      });
    },
    []
  );

  const removeHeuristicObservation = useCallback(
    (heuristicIndex: number, obsIndex: number) => {
      setState((prev) => {
        const newObs = [...prev.heuristicObservations];
        newObs[heuristicIndex] = newObs[heuristicIndex].filter((_, i) => i !== obsIndex);
        return { ...prev, heuristicObservations: newObs };
      });
    },
    []
  );

  const setShowHeuristicCard = useCallback((show: boolean) => {
    setState((prev) => ({ ...prev, showHeuristicCard: show }));
  }, []);

  // ── Usability Actions ──

  const setUsabilitySessionDetails = useCallback((details: UsabilitySessionDetails) => {
    setState((prev) => ({ ...prev, usabilitySessionDetails: details }));
  }, []);

  const setUsabilityPhase = useCallback(
    (phase: "setup" | "tasks" | "sus" | "qualitative" | "done") => {
      setState((prev) => ({ ...prev, usabilityPhase: phase }));
    },
    []
  );

  const startTask = useCallback(() => {
    taskTimerRef.current = Date.now();
    taskClicksRef.current = 0;
    setState((prev) => ({ ...prev, usabilityTaskActive: true }));
  }, []);

  const completeTask = useCallback((result: TaskResult, notes: string) => {
    const elapsed = Math.round((Date.now() - taskTimerRef.current) / 1000);
    const clicks = taskClicksRef.current;
    setState((prev) => {
      const tasks = [...prev.usabilityTasks];
      tasks[prev.usabilityCurrentTask] = {
        ...tasks[prev.usabilityCurrentTask],
        timeSeconds: elapsed,
        result,
        errorClicks: clicks,
        notes,
      };
      const nextTask = prev.usabilityCurrentTask + 1;
      return {
        ...prev,
        usabilityTasks: tasks,
        usabilityTaskActive: false,
        usabilityCurrentTask: nextTask,
        usabilityPhase: nextTask >= 10 ? "sus" : "tasks",
      };
    });
  }, []);

  const setUsabilityCurrentTask = useCallback((index: number) => {
    setState((prev) => ({ ...prev, usabilityCurrentTask: index }));
  }, []);

  const setSusResponse = useCallback((index: number, value: number) => {
    setState((prev) => {
      const responses = [...prev.susResponses];
      responses[index] = value;
      return { ...prev, susResponses: responses };
    });
  }, []);

  const setQualitativeAnswer = useCallback((index: number, value: string) => {
    setState((prev) => {
      const answers = [...prev.qualitativeAnswers];
      answers[index] = value;
      return { ...prev, qualitativeAnswers: answers };
    });
  }, []);

  // ── Accessibility Actions ──

  const setAccessibilityCategory = useCallback((index: number) => {
    setState((prev) => ({ ...prev, accessibilityCurrentCategory: index }));
  }, []);

  const setAccessibilityScore = useCallback(
    (catIndex: number, itemIndex: number, score: number, notes: string) => {
      setState((prev) => {
        const scores = prev.accessibilityScores.map((cat) => [...cat]);
        scores[catIndex][itemIndex] = { score, notes };
        return { ...prev, accessibilityScores: scores };
      });
    },
    []
  );

  const setAccessibilityIssue = useCallback((index: number, value: string) => {
    setState((prev) => {
      const issues = [...prev.accessibilityIssues];
      issues[index] = value;
      return { ...prev, accessibilityIssues: issues };
    });
  }, []);

  const setAccessibilityImprovement = useCallback((index: number, value: string) => {
    setState((prev) => {
      const improvements = [...prev.accessibilityImprovements];
      improvements[index] = value;
      return { ...prev, accessibilityImprovements: improvements };
    });
  }, []);

  const setAccessibilityReflection = useCallback((index: number, value: string) => {
    setState((prev) => {
      const reflection = [...prev.accessibilityReflection];
      reflection[index] = value;
      return { ...prev, accessibilityReflection: reflection };
    });
  }, []);

  // ── Submission Actions ──

  const submitReview = useCallback(async (html: string) => {
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbybifbCrgN6-QdWXnd05g4e3JgqJGu6dc6vV8WK4ELdsyWxOm_q44FJdlscxBWJ5kGbyQ/exec";

    if (SCRIPT_URL === "PASTE_YOUR_SCRIPT_URL_HERE") {
      setState(prev => ({ 
        ...prev, 
        submissionStatus: "error", 
        submissionError: "Please configure your Google Script URL in ReviewContext.tsx" 
      }));
      return;
    }

    setState(prev => ({ ...prev, submissionStatus: "submitting", submissionError: null }));

    try {
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Required for Google Apps Script Web Apps
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: state.evaluationType,
          name: state.evaluatorInfo.name,
          html: html
        }),
      });

      // Since mode is 'no-cors', we can't check response.ok, but if we reach here, it's sent
      setState(prev => ({ ...prev, submissionStatus: "success" }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        submissionStatus: "error", 
        submissionError: error instanceof Error ? error.message : "Failed to submit report" 
      }));
    }
  }, [state.evaluationType, state.evaluatorInfo.name]);

  // ── Computed ──

  const getElapsedTime = useCallback(() => {
    if (state.metrics.startTime === 0) return 0;
    return Math.floor((Date.now() - state.metrics.startTime) / 1000);
  }, [state.metrics.startTime]);

  const getTaskElapsedTime = useCallback(() => {
    if (taskTimerRef.current === 0) return 0;
    return Math.floor((Date.now() - taskTimerRef.current) / 1000);
  }, []);

  // ── Value ──

  const value: ReviewContextValue = {
    state,
    startReview,
    endReview,
    resetReview,
    goToSummary,
    recordClick,
    recordPageChange,
    setHeuristicIndex,
    addHeuristicObservation,
    removeHeuristicObservation,
    setShowHeuristicCard,
    setUsabilitySessionDetails,
    setUsabilityPhase,
    startTask,
    completeTask,
    setUsabilityCurrentTask,
    setSusResponse,
    setQualitativeAnswer,
    setAccessibilityCategory,
    setAccessibilityScore,
    setAccessibilityIssue,
    setAccessibilityImprovement,
    setAccessibilityReflection,
    getElapsedTime,
    getTaskElapsedTime,
    submitReview,
  };

  return <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>;
}

// ── HOOK ───────────────────────────────────────────────────

export function useReview() {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error("useReview must be used within a ReviewProvider");
  }
  return context;
}
