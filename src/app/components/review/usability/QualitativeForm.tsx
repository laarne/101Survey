import { useReview } from "../../../contexts/ReviewContext";
import { qualitativeQuestions } from "../../../data/reviewData";
import { ArrowRight } from "lucide-react";

export function QualitativeForm() {
  const { state, setQualitativeAnswer, setUsabilityPhase, goToSummary } = useReview();

  if (state.usabilityPhase !== "qualitative") return null;

  const allFilled = state.qualitativeAnswers.every((a) => a.trim() !== "");

  const handleFinish = () => {
    setUsabilityPhase("done");
    goToSummary();
  };

  return (
    <div className="fixed inset-0 z-[9995] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl bg-white dark:bg-gray-900">
        {/* Header */}
        <div className="px-8 pt-8 pb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Section D: Qualitative Insights
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            To be filled out by the participant. Please share your honest feedback.
          </p>
        </div>

        {/* Questions */}
        <div className="px-8 pb-4 space-y-5">
          {qualitativeQuestions.map((question, i) => (
            <div key={i}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <span className="text-green-600 font-bold mr-1">{i + 1}.</span>
                {question}
              </label>
              <textarea
                value={state.qualitativeAnswers[i]}
                onChange={(e) => setQualitativeAnswer(i, e.target.value)}
                placeholder="Type your answer..."
                rows={3}
                className="w-full px-4 py-3 text-sm border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 outline-none bg-white dark:bg-gray-800 dark:text-white resize-none transition-colors"
              />
            </div>
          ))}
        </div>

        {/* Finish button */}
        <div className="px-8 pb-8">
          <button
            onClick={handleFinish}
            className="w-full py-3 rounded-xl text-sm font-bold bg-green-600 text-white hover:bg-green-700 shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            Finish Evaluation
            <ArrowRight size={16} />
          </button>
          {!allFilled && (
            <p className="text-center text-xs text-gray-400 mt-2">
              Some questions are unanswered, but you can still finish.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
