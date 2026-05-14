import { useReview } from "../../../contexts/ReviewContext";
import { susStatements, calculateSUSScore, getSUSGrade } from "../../../data/reviewData";
import { ArrowRight } from "lucide-react";

export function SUSForm() {
  const { state, setSusResponse, setUsabilityPhase } = useReview();

  if (state.usabilityPhase !== "sus") return null;

  const allFilled = state.susResponses.every((r) => r > 0);
  const score = allFilled ? calculateSUSScore(state.susResponses) : null;
  const grade = score !== null ? getSUSGrade(score) : null;

  return (
    <div className="fixed inset-0 z-[9995] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white dark:bg-gray-900">
        {/* Header */}
        <div className="px-8 pt-8 pb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Section C: System Usability Scale (SUS)
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Please mark how much you agree with the following statements about the app you just used.
          </p>
          <div className="flex gap-4 mt-3 text-xs text-gray-400">
            <span>1 = Strongly Disagree</span>
            <span>5 = Strongly Agree</span>
          </div>
        </div>

        {/* Statements */}
        <div className="px-8 pb-4 space-y-4">
          {susStatements.map((statement, i) => (
            <div
              key={i}
              className={`p-4 rounded-xl border transition-colors ${
                state.susResponses[i] > 0
                  ? "border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/10"
                  : "border-gray-200 dark:border-gray-700"
              }`}
            >
              <p className="text-sm text-gray-800 dark:text-gray-200 mb-3">
                <span className="font-bold text-gray-500 mr-2">{i + 1}.</span>
                {statement}
              </p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => setSusResponse(i, value)}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
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

        {/* Score preview */}
        {allFilled && score !== null && grade !== null && (
          <div className="mx-8 mb-4 p-4 rounded-xl border-2" style={{ borderColor: grade.color, background: `${grade.color}10` }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider">SUS Score</p>
                <p className="text-3xl font-bold" style={{ color: grade.color }}>
                  {score.toFixed(1)}
                  <span className="text-lg ml-1">/ 100</span>
                </p>
              </div>
              <div className="text-right">
                <div
                  className="text-2xl font-bold"
                  style={{ color: grade.color }}
                >
                  {grade.grade}
                </div>
                <p className="text-xs text-gray-500">{grade.label}</p>
              </div>
            </div>
          </div>
        )}

        {/* Next button */}
        <div className="px-8 pb-8">
          <button
            onClick={() => setUsabilityPhase("qualitative")}
            disabled={!allFilled}
            className={`w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              allFilled
                ? "bg-green-600 text-white hover:bg-green-700 shadow-lg"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Continue to Qualitative Insights
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
