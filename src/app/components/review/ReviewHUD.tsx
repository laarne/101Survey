import { useState, useEffect } from "react";
import { useReview } from "../../contexts/ReviewContext";
import {
  Clock,
  MousePointerClick,
  MapPin,
  ClipboardCheck,
  Timer,
  Accessibility,
  ChevronDown,
  ChevronUp,
  Eye,
  Square,
} from "lucide-react";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

const typeIcons = {
  heuristic: ClipboardCheck,
  usability: Timer,
  accessibility: Accessibility,
};

const typeLabels = {
  heuristic: "Heuristic Audit",
  usability: "Usability Evaluation",
  accessibility: "Accessibility Evaluation",
};

export function ReviewHUD() {
  const { state, getElapsedTime, goToSummary, endReview, setShowHeuristicCard } = useReview();
  const [elapsed, setElapsed] = useState(0);
  const [collapsed, setCollapsed] = useState(false);

  // Update elapsed time every second
  useEffect(() => {
    if (state.phase !== "evaluating") return;
    const interval = setInterval(() => {
      setElapsed(getElapsedTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [state.phase, getElapsedTime]);

  if (state.phase !== "evaluating" && state.phase !== "summary") return null;
  if (!state.evaluationType) return null;

  const TypeIcon = typeIcons[state.evaluationType];

  // Progress calculation
  let progress = "";
  if (state.evaluationType === "heuristic") {
    const completed = state.heuristicObservations.filter((obs) => obs.length > 0).length;
    progress = `${completed}/10 heuristics`;
  } else if (state.evaluationType === "usability") {
    const completed = state.usabilityTasks.filter((t) => t.result !== null).length;
    progress = `${completed}/10 tasks`;
  } else if (state.evaluationType === "accessibility") {
    const completed = state.accessibilityScores.filter((cat) =>
      cat.every((item) => item.score > 0)
    ).length;
    progress = `${completed}/4 categories`;
  }

  // Current page name
  const currentPage = state.metrics.currentPage === "/"
    ? "Dashboard"
    : state.metrics.currentPage.replace("/", "").replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div
      className="fixed bottom-4 right-4 z-[9990] transition-all duration-300"
      style={{ maxWidth: collapsed ? "200px" : "320px" }}
    >
      <div
        className="rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
        style={{
          background: "rgba(2, 44, 34, 0.92)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Header bar */}
        <div
          className="flex items-center justify-between px-4 py-2 cursor-pointer"
          onClick={() => setCollapsed(!collapsed)}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-bold text-white/90 uppercase tracking-wider">
              Review Mode
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-emerald-300 font-mono">{formatTime(elapsed)}</span>
            {collapsed ? (
              <ChevronUp size={14} className="text-white/60" />
            ) : (
              <ChevronDown size={14} className="text-white/60" />
            )}
          </div>
        </div>

        {/* Expanded content */}
        {!collapsed && (
          <div className="px-4 pb-4 space-y-3">
            {/* Type badge */}
            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-1.5">
              <TypeIcon size={14} className="text-emerald-400" />
              <span className="text-xs text-white/80 font-medium">
                {typeLabels[state.evaluationType]}
              </span>
            </div>

            {/* Metrics row - ONLY SHOW FOR USABILITY */}
            {state.evaluationType === "usability" && (
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white/10 rounded-lg px-3 py-2 text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <MousePointerClick size={12} className="text-emerald-400" />
                    <span className="text-[10px] text-white/50 uppercase">Clicks</span>
                  </div>
                  <span className="text-lg font-bold text-white font-mono">
                    {state.metrics.totalClicks}
                  </span>
                </div>
                <div className="bg-white/10 rounded-lg px-3 py-2 text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <Clock size={12} className="text-emerald-400" />
                    <span className="text-[10px] text-white/50 uppercase">Time</span>
                  </div>
                  <span className="text-lg font-bold text-white font-mono">
                    {formatTime(elapsed)}
                  </span>
                </div>
              </div>
            )}

            {/* Current page (Bonus context for all modes) */}
            <div className="flex items-center gap-2 text-[10px] text-white/40">
              <MapPin size={10} className="text-emerald-400 flex-shrink-0" />
              <span className="truncate">Current: {currentPage}</span>
            </div>

            {/* Progress */}
            <div className="text-xs text-emerald-300 font-medium">{progress}</div>

            {/* Action buttons */}
            <div className="flex gap-2">
              {state.evaluationType === "heuristic" && state.phase === "evaluating" && (
                <button
                  onClick={() => setShowHeuristicCard(true)}
                  className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <Eye size={14} />
                  Rate Heuristic #{state.heuristicCurrentIndex + 1}
                </button>
              )}
              {state.evaluationType === "accessibility" && state.phase === "evaluating" && (
                <button
                  onClick={() => {/* Accessibility already has a flow, this button could just be a visual reminder or re-open the flow if closed */}}
                  className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <Accessibility size={14} />
                  Audit WCAG
                </button>
              )}
              {state.phase === "evaluating" && (
                <button
                  onClick={goToSummary}
                  className="flex-1 py-2 px-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <Square size={12} />
                  Finish
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
