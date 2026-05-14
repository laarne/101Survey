import { useState } from "react";
import { useReview } from "../../../contexts/ReviewContext";
import { susStatements, calculateSUSScore, getSUSGrade } from "../../../data/reviewData";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";

export function SUSForm() {
  const { state, setSusResponse, setUsabilityPhase } = useReview();
  const [isMinimized, setIsMinimized] = useState(false);

  if (state.usabilityPhase !== "sus") return null;

  const allFilled = state.susResponses.every((r) => r > 0);
  const score = allFilled ? calculateSUSScore(state.susResponses) : null;
  const grade = score !== null ? getSUSGrade(score) : null;

  return (
    <div 
      className={`fixed bottom-24 right-4 z-[9995] flex flex-col bg-white dark:bg-gray-900 shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 ${
        isMinimized ? "h-14 w-64" : "h-[500px] w-[400px]"
      }`}
    >
      {/* Header */}
      <div 
        className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 cursor-pointer bg-gray-50/50 dark:bg-gray-800/50 rounded-t-2xl"
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-green-600 flex items-center justify-center text-white text-[10px] font-bold">
            SUS
          </div>
          <span className="text-sm font-bold text-gray-900 dark:text-white">
            System Usability Scale
          </span>
        </div>
        <button className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500">
          {isMinimized ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {!isMinimized && (
        <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
          <p className="text-[11px] text-gray-500 dark:text-gray-400">
            Rate how much you agree (1 = Disagree, 5 = Agree)
          </p>

          <div className="space-y-4">
            {susStatements.map((statement, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl border transition-colors ${
                  state.susResponses[i] > 0
                    ? "border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/10"
                    : "border-gray-200 dark:border-gray-700"
                }`}
              >
                <p className="text-[11px] text-gray-800 dark:text-gray-200 mb-2">
                  <span className="font-bold text-gray-400 mr-1">{i + 1}.</span>
                  {statement}
                </p>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      onClick={() => setSusResponse(i, value)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        state.susResponses[i] === value
                          ? "bg-green-600 text-white shadow-md scale-105"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Score Preview */}
          {allFilled && score !== null && grade !== null && (
            <div className="p-3 rounded-xl border-2" style={{ borderColor: grade.color, background: `${grade.color}10` }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">SUS Score</p>
                  <p className="text-xl font-bold" style={{ color: grade.color }}>
                    {score.toFixed(1)} <span className="text-xs">/ 100</span>
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold" style={{ color: grade.color }}>{grade.grade}</div>
                  <p className="text-[10px] text-gray-500">{grade.label}</p>
                </div>
              </div>
            </div>
          )}

          {/* Footer Action */}
          <div className="sticky bottom-0 pt-2 bg-white dark:bg-gray-900">
            <button
              onClick={() => setUsabilityPhase("qualitative")}
              disabled={!allFilled}
              className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                allFilled
                  ? "bg-green-600 text-white hover:bg-green-700 shadow-lg"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Next: Qualitative Insights
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
