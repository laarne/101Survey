import { useState } from "react";
import { useReview } from "../../../contexts/ReviewContext";
import {
  pourCategories,
  accessibilityScale,
  accessibilityRatings,
  accessibilityReflectionQuestions,
} from "../../../data/reviewData";
import { ChevronRight, ChevronLeft, ArrowRight } from "lucide-react";

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

  // ── CHECKLIST PHASE ──
  if (phase === "checklist") {
    return (
      <div className="fixed inset-0 z-[9995] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white dark:bg-gray-900">
          {/* Header */}
          <div className="px-8 pt-8 pb-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {category.id}. {category.name}
              </h2>
              <span className="text-sm font-mono text-green-600 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">
                {categoryTotal} / {category.maxScore}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
              {category.description}
            </p>
            <div className="flex gap-1.5 mt-3">
              {pourCategories.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    i === catIndex ? "bg-green-600" : i < catIndex ? "bg-green-300" : "bg-gray-200 dark:bg-gray-700"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Scale legend */}
          <div className="px-8 pb-3">
            <div className="flex gap-2 flex-wrap">
              {accessibilityScale.map((s) => (
                <div
                  key={s.value}
                  className="flex items-center gap-1.5 text-[10px] text-gray-500"
                >
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: s.color }} />
                  {s.value} = {s.label}
                </div>
              ))}
            </div>
          </div>

          {/* Criteria */}
          <div className="px-8 pb-4 space-y-3">
            {category.criteria.map((criteria, itemIndex) => {
              const itemScore = categoryScores[itemIndex];
              return (
                <div
                  key={itemIndex}
                  className="p-4 rounded-xl border border-gray-200 dark:border-gray-700"
                >
                  <p className="text-sm text-gray-800 dark:text-gray-200 mb-3 font-medium">
                    {criteria.label}
                  </p>
                  <div className="flex gap-2 mb-2">
                    {accessibilityScale.map((s) => (
                      <button
                        key={s.value}
                        onClick={() =>
                          setAccessibilityScore(catIndex, itemIndex, s.value, itemScore.notes)
                        }
                        className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all border-2 ${
                          itemScore.score === s.value
                            ? "text-white shadow-md"
                            : "bg-white dark:bg-gray-800 text-gray-500 border-gray-200 dark:border-gray-700"
                        }`}
                        style={
                          itemScore.score === s.value
                            ? { backgroundColor: s.color, borderColor: s.color }
                            : {}
                        }
                      >
                        {s.value}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={itemScore.notes}
                    onChange={(e) =>
                      setAccessibilityScore(catIndex, itemIndex, itemScore.score, e.target.value)
                    }
                    placeholder="Notes (optional)"
                    className="w-full px-3 py-1.5 text-xs border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-gray-50 dark:bg-gray-800 dark:text-white"
                  />
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="px-8 pb-8 flex gap-3">
            <button
              onClick={() => {
                if (catIndex > 0) setAccessibilityCategory(catIndex - 1);
              }}
              disabled={catIndex === 0}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-30 transition-colors flex items-center justify-center gap-1"
            >
              <ChevronLeft size={16} /> Previous
            </button>
            <button
              onClick={() => {
                if (catIndex < 3) {
                  setAccessibilityCategory(catIndex + 1);
                } else {
                  setPhase("issues");
                }
              }}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-green-600 text-white hover:bg-green-700 transition-colors flex items-center justify-center gap-1"
            >
              {catIndex < 3 ? (
                <>
                  Next Category <ChevronRight size={16} />
                </>
              ) : (
                <>
                  Continue <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── ISSUES & IMPROVEMENTS PHASE ──
  if (phase === "issues") {
    return (
      <div className="fixed inset-0 z-[9995] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white dark:bg-gray-900">
          <div className="px-8 pt-8 pb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Key Findings
            </h2>
            <div className="mt-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-between">
              <span className="text-sm text-gray-500">Overall Accessibility Score</span>
              <span className="text-lg font-bold" style={{ color: rating?.color }}>
                {overallTotal} / 63 — {rating?.label}
              </span>
            </div>
          </div>

          <div className="px-8 pb-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
              F. Key Accessibility Issues Identified
            </h3>
            <div className="space-y-2">
              {state.accessibilityIssues.map((issue, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-xs text-gray-400 mt-2 w-4">{i + 1}.</span>
                  <textarea
                    value={issue}
                    onChange={(e) => setAccessibilityIssue(i, e.target.value)}
                    placeholder={`Issue ${i + 1}...`}
                    rows={2}
                    className="flex-1 px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white dark:bg-gray-800 dark:text-white resize-none"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="px-8 pb-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
              G. Recommended UX Improvements
            </h3>
            <div className="space-y-2">
              {state.accessibilityImprovements.map((imp, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-xs text-gray-400 mt-2 w-4">{i + 1}.</span>
                  <textarea
                    value={imp}
                    onChange={(e) => setAccessibilityImprovement(i, e.target.value)}
                    placeholder={`Improvement ${i + 1}...`}
                    rows={2}
                    className="flex-1 px-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white dark:bg-gray-800 dark:text-white resize-none"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="px-8 pb-8">
            <button
              onClick={() => setPhase("reflection")}
              className="w-full py-3 rounded-xl text-sm font-bold bg-green-600 text-white hover:bg-green-700 shadow-lg flex items-center justify-center gap-2 transition-all"
            >
              Continue to Reflection <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── REFLECTION PHASE ──
  return (
    <div className="fixed inset-0 z-[9995] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white dark:bg-gray-900">
        <div className="px-8 pt-8 pb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            H. Evaluator Reflection
          </h2>
        </div>

        <div className="px-8 pb-4 space-y-5">
          {accessibilityReflectionQuestions.map((question, i) => (
            <div key={i}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <span className="text-green-600 font-bold mr-1">{i + 1}.</span>
                {question}
              </label>
              <textarea
                value={state.accessibilityReflection[i]}
                onChange={(e) => setAccessibilityReflection(i, e.target.value)}
                placeholder="Type your answer..."
                rows={4}
                className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 outline-none bg-white dark:bg-gray-800 dark:text-white resize-none"
              />
            </div>
          ))}
        </div>

        <div className="px-8 pb-8">
          <button
            onClick={goToSummary}
            className="w-full py-3 rounded-xl text-sm font-bold bg-green-600 text-white hover:bg-green-700 shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            Finish Evaluation <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
