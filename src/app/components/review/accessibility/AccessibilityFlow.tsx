import { useState } from "react";
import { useReview } from "../../../contexts/ReviewContext";
import {
  pourCategories,
  accessibilityScale,
  accessibilityRatings,
  accessibilityReflectionQuestions,
} from "../../../data/reviewData";
import { ChevronRight, ChevronLeft, ArrowRight, ChevronDown, ChevronUp, X } from "lucide-react";

type AccessibilityPhase = "checklist" | "issues" | "reflection";

export function AccessibilityFlow() {
  const {
    state,
    setAccessibilityCategory,
    setAccessibilityScore,
    setAccessibilityIssue,
    setAccessibilityImprovement,
    setAccessibilityReflection,
    goToSummary,
  } = useReview();

  const [phase, setPhase] = useState<AccessibilityPhase>("checklist");
  const [isMinimized, setIsMinimized] = useState(false);

  if (state.evaluationType !== "accessibility" || state.phase !== "evaluating") return null;

  const catIndex = state.accessibilityCurrentCategory;
  const category = pourCategories[catIndex];
  const categoryScores = state.accessibilityScores[catIndex];

  // Calculate totals
  const categoryTotal = categoryScores.reduce((sum, item) => sum + item.score, 0);
  const overallTotal = state.accessibilityScores.flat().reduce((sum, item) => sum + item.score, 0);
  const rating = accessibilityRatings.find(
    (r) => overallTotal >= r.min && overallTotal <= r.max
  );

  return (
    <div 
      className={`fixed bottom-24 right-4 z-[9995] flex flex-col bg-white dark:bg-gray-900 shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 ${
        isMinimized ? "h-14 w-64" : "h-[550px] w-[450px]"
      }`}
    >
      {/* Header */}
      <div 
        className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 cursor-pointer bg-gray-50/50 dark:bg-gray-800/50 rounded-t-2xl"
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-green-600 flex items-center justify-center text-white text-[10px] font-bold">
            ACC
          </div>
          <span className="text-sm font-bold text-gray-900 dark:text-white truncate max-w-[150px]">
            {phase === "checklist" ? category.name : phase === "issues" ? "Key Findings" : "Reflection"}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500">
            {isMinimized ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {!isMinimized && (
        <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
          {phase === "checklist" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                  Category {catIndex + 1} of 4
                </span>
                <span className="text-xs font-mono text-green-600 font-bold bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded">
                  {categoryTotal} / {category.maxScore}
                </span>
              </div>

              <div className="space-y-4">
                {category.criteria.map((criteria, itemIndex) => {
                  const itemScore = categoryScores[itemIndex];
                  return (
                    <div key={itemIndex} className="p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-800/30">
                      <p className="text-[11px] text-gray-800 dark:text-gray-200 mb-2 font-medium">
                        {criteria.label}
                      </p>
                      <div className="flex gap-1 mb-2">
                        {accessibilityScale.map((s) => (
                          <button
                            key={s.value}
                            onClick={() => setAccessibilityScore(catIndex, itemIndex, s.value, itemScore.notes)}
                            className={`flex-1 py-1 rounded-md text-[10px] font-bold border ${
                              itemScore.score === s.value
                                ? "text-white"
                                : "bg-white dark:bg-gray-800 text-gray-500 border-gray-200 dark:border-gray-700"
                            }`}
                            style={itemScore.score === s.value ? { backgroundColor: s.color, borderColor: s.color } : {}}
                          >
                            {s.value}
                          </button>
                        ))}
                      </div>
                      <input
                        type="text"
                        value={itemScore.notes}
                        onChange={(e) => setAccessibilityScore(catIndex, itemIndex, itemScore.score, e.target.value)}
                        placeholder="Notes (optional)"
                        className="w-full px-2 py-1 text-[10px] border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-800 outline-none"
                      />
                    </div>
                  );
                })}
              </div>

              <div className="sticky bottom-0 pt-2 bg-white dark:bg-gray-900 flex gap-2">
                <button
                  onClick={() => catIndex > 0 && setAccessibilityCategory(catIndex - 1)}
                  disabled={catIndex === 0}
                  className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-30"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => catIndex < 3 ? setAccessibilityCategory(catIndex + 1) : setPhase("issues")}
                  className="flex-1 py-2 bg-green-600 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1"
                >
                  {catIndex < 3 ? "Next Category" : "Continue Findings"}
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}

          {phase === "issues" && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">Overall Score</p>
                <p className="text-xl font-bold" style={{ color: rating?.color }}>
                  {overallTotal} / 63 <span className="text-xs">— {rating?.label}</span>
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase mb-2">Accessibility Issues</h3>
                  <div className="space-y-2">
                    {state.accessibilityIssues.map((issue, i) => (
                      <textarea
                        key={i}
                        value={issue}
                        onChange={(e) => setAccessibilityIssue(i, e.target.value)}
                        placeholder={`Issue ${i + 1}...`}
                        rows={2}
                        className="w-full px-3 py-2 text-xs border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 resize-none"
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase mb-2">UX Improvements</h3>
                  <div className="space-y-2">
                    {state.accessibilityImprovements.map((imp, i) => (
                      <textarea
                        key={i}
                        value={imp}
                        onChange={(e) => setAccessibilityImprovement(i, e.target.value)}
                        placeholder={`Improvement ${i + 1}...`}
                        rows={2}
                        className="w-full px-3 py-2 text-xs border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 resize-none"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setPhase("reflection")}
                className="w-full py-2.5 bg-green-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2"
              >
                Go to Reflection <ArrowRight size={14} />
              </button>
            </div>
          )}

          {phase === "reflection" && (
            <div className="space-y-5">
              <h3 className="text-[10px] font-bold text-gray-400 uppercase">Evaluator Reflection</h3>
              <div className="space-y-4">
                {accessibilityReflectionQuestions.map((question, i) => (
                  <div key={i}>
                    <label className="block text-[11px] font-medium text-gray-700 dark:text-gray-300 mb-2 leading-tight">
                      <span className="text-green-600 font-bold mr-1">{i + 1}.</span>
                      {question}
                    </label>
                    <textarea
                      value={state.accessibilityReflection[i]}
                      onChange={(e) => setAccessibilityReflection(i, e.target.value)}
                      placeholder="Your reflection..."
                      rows={3}
                      className="w-full px-3 py-2 text-xs border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 resize-none"
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={goToSummary}
                className="w-full py-2.5 bg-green-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2"
              >
                Finish Evaluation <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
