import { useState } from "react";
import { useReview } from "../../../contexts/ReviewContext";
import { qualitativeQuestions } from "../../../data/reviewData";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";

export function QualitativeForm() {
  const { state, setQualitativeAnswer, setUsabilityPhase, goToSummary } = useReview();
  const [isMinimized, setIsMinimized] = useState(false);

  if (state.usabilityPhase !== "qualitative") return null;

  const allFilled = state.qualitativeAnswers.every((a) => a.trim() !== "");

  const handleFinish = () => {
    setUsabilityPhase("done");
    goToSummary();
  };

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
            Q&A
          </div>
          <span className="text-sm font-bold text-gray-900 dark:text-white">
            Qualitative Insights
          </span>
        </div>
        <button className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500">
          {isMinimized ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {!isMinimized && (
        <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar">
          <p className="text-[11px] text-gray-500 dark:text-gray-400">
            Participant's honest feedback.
          </p>

          <div className="space-y-5">
            {qualitativeQuestions.map((question, i) => (
              <div key={i}>
                <label className="block text-[11px] font-medium text-gray-700 dark:text-gray-300 mb-2 leading-tight">
                  <span className="text-green-600 font-bold mr-1">{i + 1}.</span>
                  {question}
                </label>
                <textarea
                  value={state.qualitativeAnswers[i]}
                  onChange={(e) => setQualitativeAnswer(i, e.target.value)}
                  placeholder="Type answer here..."
                  rows={2}
                  className="w-full px-3 py-2 text-xs border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 outline-none bg-white dark:bg-gray-800 dark:text-white resize-none"
                />
              </div>
            ))}
          </div>

          {/* Finish button */}
          <div className="sticky bottom-0 pt-2 bg-white dark:bg-gray-900 mt-4">
            <button
              onClick={handleFinish}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-green-600 text-white hover:bg-green-700 shadow-lg flex items-center justify-center gap-2"
            >
              Finish Evaluation
              <ArrowRight size={14} />
            </button>
            {!allFilled && (
              <p className="text-center text-[10px] text-gray-400 mt-2">
                Some questions are unanswered.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
