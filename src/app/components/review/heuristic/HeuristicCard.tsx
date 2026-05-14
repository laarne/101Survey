import { useState } from "react";
import { useReview, HeuristicObservation } from "../../../contexts/ReviewContext";
import { heuristics, severityScale } from "../../../data/reviewData";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  X,
  AlertTriangle,
} from "lucide-react";

export function HeuristicCard() {
  const {
    state,
    setHeuristicIndex,
    addHeuristicObservation,
    removeHeuristicObservation,
    setShowHeuristicCard,
  } = useReview();

  const [newObs, setNewObs] = useState("");
  const [newSeverity, setNewSeverity] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [newRef, setNewRef] = useState("");

  if (!state.showHeuristicCard) return null;

  const index = state.heuristicCurrentIndex;
  const heuristic = heuristics[index];
  const observations = state.heuristicObservations[index];

  const handleAdd = () => {
    if (!newObs.trim()) return;
    addHeuristicObservation(index, {
      description: newObs.trim(),
      severity: newSeverity,
      screenshotRef: newRef.trim(),
    });
    setNewObs("");
    setNewSeverity(0);
    setNewRef("");
  };

  const goTo = (i: number) => {
    if (i >= 0 && i < 10) setHeuristicIndex(i);
  };

  return (
    <div 
      className="fixed inset-0 z-[9995] flex items-center justify-end bg-black/40 backdrop-blur-sm"
      onClick={() => setShowHeuristicCard(false)}
    >
      <div
        className="h-full w-full max-w-xl bg-white dark:bg-gray-900 shadow-2xl overflow-y-auto animate-in slide-in-from-right"
        style={{ animationDuration: "300ms" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
              {index + 1} of 10
            </span>
            <button
              onClick={() => goTo(index + 1)}
              disabled={index === 9}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
          <button
            onClick={() => setShowHeuristicCard(false)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-6">
          {/* Heuristic title & description */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {heuristic.id}. {heuristic.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 italic leading-relaxed">
              {heuristic.description}
            </p>
          </div>

          {/* Checklist */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Checklist
            </h4>
            <ul className="space-y-2">
              {heuristic.checklist.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="text-gray-400 mt-0.5">☐</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Add new observation */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-3">
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Add Observation
            </h4>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Observation / Problem Description
              </label>
              <textarea
                value={newObs}
                onChange={(e) => setNewObs(e.target.value)}
                placeholder="Describe what you observed..."
                rows={2}
                className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white dark:bg-gray-800 dark:text-white resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                Severity (0–4)
              </label>
              <div className="flex gap-1.5">
                {severityScale.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setNewSeverity(s.value as 0 | 1 | 2 | 3 | 4)}
                    className={`flex-1 py-2 px-1 rounded-lg text-xs font-bold transition-all border-2 ${
                      newSeverity === s.value
                        ? "text-white shadow-md scale-105"
                        : "bg-white dark:bg-gray-800 text-gray-500 border-gray-200 dark:border-gray-700 hover:border-gray-300"
                    }`}
                    style={
                      newSeverity === s.value
                        ? { backgroundColor: s.color, borderColor: s.color }
                        : {}
                    }
                    title={s.description}
                  >
                    <div>{s.value}</div>
                    <div className="text-[9px] font-normal mt-0.5 opacity-80">{s.label}</div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Screenshot Ref # (optional)
              </label>
              <input
                type="text"
                value={newRef}
                onChange={(e) => setNewRef(e.target.value)}
                placeholder="e.g., Fig 3.1"
                className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white dark:bg-gray-800 dark:text-white"
              />
            </div>
            <button
              onClick={handleAdd}
              disabled={!newObs.trim()}
              className={`w-full py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                newObs.trim()
                  ? "bg-green-600 text-white hover:bg-green-700 shadow-md"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
              }`}
            >
              <Plus size={16} />
              Add Observation
            </button>
          </div>

          {/* Observations list */}
          {observations.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Observations ({observations.length})
              </h4>
              <div className="space-y-2">
                {observations.map((obs, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ backgroundColor: severityScale[obs.severity].color }}
                    >
                      {obs.severity}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800 dark:text-gray-200">{obs.description}</p>
                      {obs.screenshotRef && (
                        <span className="text-xs text-gray-400 mt-1 block">
                          📷 {obs.screenshotRef}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => removeHeuristicObservation(index, i)}
                      className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {observations.length === 0 && (
            <div className="flex items-center gap-2 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-amber-700 dark:text-amber-400 text-sm">
              <AlertTriangle size={16} />
              No observations yet for this heuristic.
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              className="flex-1 py-2.5 rounded-lg text-sm font-medium border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-30 transition-colors flex items-center justify-center gap-1"
            >
              <ChevronLeft size={16} />
              Previous
            </button>
            <button
              onClick={() => {
                if (index < 9) {
                  goTo(index + 1);
                } else {
                  setShowHeuristicCard(false);
                }
              }}
              className="flex-1 py-2.5 rounded-lg text-sm font-bold bg-green-600 text-white hover:bg-green-700 transition-colors flex items-center justify-center gap-1"
            >
              {index < 9 ? (
                <>
                  Next
                  <ChevronRight size={16} />
                </>
              ) : (
                "Done"
              )}
            </button>
          </div>

          {/* Quick nav dots */}
          <div className="flex justify-center gap-1.5 pt-2">
            {heuristics.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === index
                    ? "bg-green-600 scale-125"
                    : state.heuristicObservations[i].length > 0
                    ? "bg-green-300"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
