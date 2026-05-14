import { useState } from "react";
import { useReview } from "../../../contexts/ReviewContext";
import { heuristics, severityScale } from "../../../data/reviewData";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  X,
  ChevronDown,
  ChevronUp,
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
  const [isMinimized, setIsMinimized] = useState(false);

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
      className={`fixed bottom-24 right-4 z-[9995] flex flex-col bg-white dark:bg-gray-900 shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 ${
        isMinimized ? "h-14 w-64" : "h-[500px] w-96"
      }`}
    >
      {/* Header - Click to toggle minimize */}
      <div 
        className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 cursor-pointer bg-gray-50/50 dark:bg-gray-800/50 rounded-t-2xl"
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-green-600 flex items-center justify-center text-white text-[10px] font-bold">
            {index + 1}
          </div>
          <span className="text-sm font-bold text-gray-900 dark:text-white truncate max-w-[120px]">
            {isMinimized ? heuristic.name : "Heuristic Card"}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized(!isMinimized);
            }}
            className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500"
          >
            {isMinimized ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowHeuristicCard(false);
            }}
            className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar">
          {/* Title & Description */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
              {heuristic.id}. {heuristic.name}
            </h3>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">
              {heuristic.description}
            </p>
          </div>

          {/* Checklist */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 border border-gray-100 dark:border-gray-700">
            <h4 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Checklist
            </h4>
            <ul className="space-y-1.5">
              {heuristic.checklist.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-[11px] text-gray-700 dark:text-gray-300">
                  <div className="w-1 h-1 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Add Observation Form */}
          <div className="space-y-3">
            <div>
              <textarea
                value={newObs}
                onChange={(e) => setNewObs(e.target.value)}
                placeholder="What problem did you find?"
                rows={2}
                className="w-full px-3 py-2 text-xs border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white dark:bg-gray-800 dark:text-white resize-none"
              />
            </div>
            
            <div className="flex gap-1">
              {severityScale.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setNewSeverity(s.value as 0 | 1 | 2 | 3 | 4)}
                  className={`flex-1 py-1 rounded-md text-[10px] font-bold border ${
                    newSeverity === s.value
                      ? "text-white"
                      : "bg-white dark:bg-gray-800 text-gray-500 border-gray-200 dark:border-gray-700"
                  }`}
                  style={newSeverity === s.value ? { backgroundColor: s.color, borderColor: s.color } : {}}
                  title={s.label}
                >
                  {s.value}
                </button>
              ))}
            </div>

            <button
              onClick={handleAdd}
              disabled={!newObs.trim()}
              className={`w-full py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                newObs.trim()
                  ? "bg-green-600 text-white hover:bg-green-700 shadow-md"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
              }`}
            >
              <Plus size={14} />
              Add Observation
            </button>
          </div>

          {/* Observations Summary */}
          {observations.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                Current Observations ({observations.length})
              </h4>
              <div className="space-y-2">
                {observations.map((obs, i) => (
                  <div key={i} className="flex items-start gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 group">
                    <div className="w-5 h-5 rounded flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0" style={{ backgroundColor: severityScale[obs.severity].color }}>
                      {obs.severity}
                    </div>
                    <p className="text-[11px] text-gray-800 dark:text-gray-200 flex-1 leading-tight">{obs.description}</p>
                    <button onClick={() => removeHeuristicObservation(index, i)} className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500">
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Nav */}
          <div className="sticky bottom-0 pt-2 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 mt-4 flex items-center justify-between">
            <div className="flex gap-1">
              <button onClick={() => goTo(index - 1)} disabled={index === 0} className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-30">
                <ChevronLeft size={16} />
              </button>
              <button onClick={() => goTo(index + 1)} disabled={index === 9} className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-30">
                <ChevronRight size={16} />
              </button>
            </div>
            <button
              onClick={() => {
                if (index < 9) goTo(index + 1);
                else setShowHeuristicCard(false);
              }}
              className="px-4 py-1.5 bg-green-600 text-white rounded-lg text-xs font-bold"
            >
              {index < 9 ? "Next" : "Done"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
