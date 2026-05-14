import { useReview } from "../../contexts/ReviewContext";
import {
  heuristics,
  severityScale,
  uxHealthRatings,
  calculateSUSScore,
  getSUSGrade,
  pourCategories,
  accessibilityRatings,
} from "../../data/reviewData";
import { generateReport } from "../../utils/reportGenerator";
import { Download, RotateCcw, X, Send, Check, AlertCircle, Loader2 } from "lucide-react";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

export function ReviewSummary() {
  const { state, resetReview, getElapsedTime, submitReview } = useReview();

  if (state.phase !== "summary" || !state.evaluationType) return null;

  const elapsed = getElapsedTime();

  const handleAutoSubmit = async () => {
    const html = generateReport(state);
    await submitReview(html);
  };

  const handleDownload = () => {
    const html = generateReport(state);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const typeLabel = state.evaluationType === "heuristic"
      ? "Heuristic"
      : state.evaluationType === "usability"
      ? "Usability"
      : "Accessibility";
    a.download = `${typeLabel}_Evaluation_${state.evaluatorInfo.name.replace(/\s+/g, "_")}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const isSubmitting = state.submissionStatus === "submitting";
  const isSuccess = state.submissionStatus === "success";
  const isError = state.submissionStatus === "error";

  return (
    <div 
      className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={isSubmitting ? undefined : resetReview}
    >
      <div 
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white dark:bg-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-8 pt-8 pb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Evaluation Complete
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {state.evaluatorInfo.name} — {state.evaluatorInfo.date}
            </p>
          </div>
          <button
            onClick={resetReview}
            disabled={isSubmitting}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Session info */}
        <div className="px-8 pb-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white font-mono">{formatTime(elapsed)}</p>
              <p className="text-xs text-gray-500 mt-1">Total Time</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white font-mono">{state.metrics.totalClicks}</p>
              <p className="text-xs text-gray-500 mt-1">Total Clicks</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white font-mono">{state.metrics.navigationLog.length}</p>
              <p className="text-xs text-gray-500 mt-1">Pages Visited</p>
            </div>
          </div>
        </div>

        {/* Submission Feedback */}
        {(isSuccess || isError) && (
          <div className={`mx-8 mb-4 p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 ${
            isSuccess ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}>
            {isSuccess ? <Check size={20} /> : <AlertCircle size={20} />}
            <span className="text-sm font-medium">
              {isSuccess ? "Report successfully uploaded to Google Drive!" : state.submissionError}
            </span>
          </div>
        )}

        {/* Type-specific summary */}
        <div className="px-8 pb-4">
          {state.evaluationType === "heuristic" && <HeuristicSummary />}
          {state.evaluationType === "usability" && <UsabilitySummary />}
          {state.evaluationType === "accessibility" && <AccessibilitySummary />}
        </div>

        {/* Action buttons */}
        <div className="px-8 pb-8 flex flex-col gap-3">
          <div className="flex gap-3">
            <button
              onClick={handleAutoSubmit}
              disabled={isSubmitting || isSuccess}
              className={`flex-[2] py-3 rounded-xl text-sm font-bold shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
                isSuccess 
                  ? "bg-green-100 text-green-700 cursor-default" 
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? (
                <Loader2 size={16} className="animate-spin" />
              ) : isSuccess ? (
                <Check size={16} />
              ) : (
                <Send size={16} />
              )}
              {isSubmitting ? "Submitting to Drive..." : isSuccess ? "Submitted to Drive" : "Auto-Submit to Drive"}
            </button>
            
            <button
              onClick={handleDownload}
              className="flex-1 py-3 rounded-xl text-sm font-bold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <Download size={16} />
              Download HTML
            </button>
          </div>
          
          <button
            onClick={resetReview}
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl text-sm font-medium border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            <RotateCcw size={16} />
            Start New Evaluation
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Heuristic Summary ──
function HeuristicSummary() {
  const { state } = useReview();
  const totalScore = state.heuristicObservations.flat().reduce((sum, obs) => sum + obs.severity, 0);
  const rating = uxHealthRatings.find((r) => totalScore >= r.min && totalScore <= r.max);

  return (
    <div className="space-y-4">
      <div className="p-5 rounded-xl border-2 text-center" style={{ borderColor: rating?.color, background: `${rating?.color}10` }}>
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">UX Health Score</p>
        <p className="text-4xl font-bold" style={{ color: rating?.color }}>
          {totalScore}
        </p>
        <p className="text-sm font-medium mt-1" style={{ color: rating?.color }}>{rating?.label}</p>
        <p className="text-xs text-gray-400 mt-2">The lower the score, the better.</p>
      </div>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left py-2 text-gray-500 font-medium">Heuristic</th>
            <th className="text-center py-2 text-gray-500 font-medium w-20">Issues</th>
            <th className="text-center py-2 text-gray-500 font-medium w-20">Score</th>
          </tr>
        </thead>
        <tbody>
          {heuristics.map((h, i) => {
            const obs = state.heuristicObservations[i];
            const score = obs.reduce((s, o) => s + o.severity, 0);
            return (
              <tr key={i} className="border-b border-gray-100 dark:border-gray-800">
                <td className="py-2 text-gray-700 dark:text-gray-300">{h.id}. {h.name}</td>
                <td className="py-2 text-center text-gray-500">{obs.length}</td>
                <td className="py-2 text-center font-bold" style={{ color: score > 3 ? "#ef4444" : score > 1 ? "#f97316" : "#22c55e" }}>{score}</td>
              </tr>
            );
          })}
          <tr className="bg-gray-50 dark:bg-gray-800 font-bold">
            <td className="py-2 text-gray-900 dark:text-white">Total</td>
            <td className="py-2 text-center">{state.heuristicObservations.flat().length}</td>
            <td className="py-2 text-center" style={{ color: rating?.color }}>{totalScore}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// ── Usability Summary ──
function UsabilitySummary() {
  const { state } = useReview();
  const susScore = calculateSUSScore(state.susResponses);
  const grade = getSUSGrade(susScore);

  return (
    <div className="space-y-4">
      <div className="p-5 rounded-xl border-2 text-center" style={{ borderColor: grade.color, background: `${grade.color}10` }}>
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">SUS Score</p>
        <p className="text-4xl font-bold" style={{ color: grade.color }}>
          {susScore.toFixed(1)} <span className="text-lg">/ 100</span>
        </p>
        <p className="text-sm font-medium mt-1" style={{ color: grade.color }}>
          Grade {grade.grade} — {grade.label}
        </p>
      </div>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left py-2 text-gray-500 font-medium">#</th>
            <th className="text-left py-2 text-gray-500 font-medium">Task</th>
            <th className="text-center py-2 text-gray-500 font-medium w-16">Time</th>
            <th className="text-center py-2 text-gray-500 font-medium w-16">Result</th>
            <th className="text-center py-2 text-gray-500 font-medium w-16">Errors</th>
          </tr>
        </thead>
        <tbody>
          {state.usabilityTasks.map((task, i) => (
            <tr key={i} className="border-b border-gray-100 dark:border-gray-800">
              <td className="py-2 text-gray-400">{i + 1}</td>
              <td className="py-2 text-gray-700 dark:text-gray-300">{task.description}</td>
              <td className="py-2 text-center font-mono text-gray-500">{task.timeSeconds}s</td>
              <td className="py-2 text-center">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  task.result === "pass" ? "bg-green-100 text-green-700" :
                  task.result === "fail" ? "bg-red-100 text-red-700" :
                  task.result === "assist" ? "bg-amber-100 text-amber-700" :
                  "bg-gray-100 text-gray-400"
                }`}>
                  {task.result?.toUpperCase() || "—"}
                </span>
              </td>
              <td className="py-2 text-center text-gray-500">{task.errorClicks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Accessibility Summary ──
function AccessibilitySummary() {
  const { state } = useReview();
  const overallTotal = state.accessibilityScores.flat().reduce((sum, item) => sum + item.score, 0);
  const rating = accessibilityRatings.find((r) => overallTotal >= r.min && overallTotal <= r.max);

  return (
    <div className="space-y-4">
      <div className="p-5 rounded-xl border-2 text-center" style={{ borderColor: rating?.color, background: `${rating?.color}10` }}>
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Accessibility Score</p>
        <p className="text-4xl font-bold" style={{ color: rating?.color }}>
          {overallTotal} <span className="text-lg">/ 63</span>
        </p>
        <p className="text-sm font-medium mt-1" style={{ color: rating?.color }}>{rating?.label}</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {pourCategories.map((cat, i) => {
          const catTotal = state.accessibilityScores[i].reduce((s, item) => s + item.score, 0);
          const pct = Math.round((catTotal / cat.maxScore) * 100);
          return (
            <div key={i} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{cat.name}</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{catTotal}/{cat.maxScore}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${pct}%`, backgroundColor: pct >= 80 ? "#22c55e" : pct >= 50 ? "#eab308" : "#ef4444" }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
