import { useState } from "react";
import { useReview, EvaluationType, EvaluatorInfo } from "../../contexts/ReviewContext";
import { ClipboardCheck, Timer, Accessibility, ArrowRight, X } from "lucide-react";

const evaluationTypes: { id: EvaluationType; label: string; description: string; icon: typeof ClipboardCheck; details: string }[] = [
  {
    id: "heuristic",
    label: "Heuristic Audit",
    description: "10 Nielsen Heuristics",
    icon: ClipboardCheck,
    details: "Rate the app against 10 usability principles. Assign severity scores (0–4) and document observations for each heuristic.",
  },
  {
    id: "usability",
    label: "Usability Evaluation",
    description: "10 Tasks + SUS + Qualitative",
    icon: Timer,
    details: "Observe a participant completing 10 tasks. Track time, clicks, pass/fail. Then fill out the System Usability Scale and qualitative questions.",
  },
  {
    id: "accessibility",
    label: "Accessibility Evaluation",
    description: "WCAG POUR Checklist",
    icon: Accessibility,
    details: "Evaluate the app against 21 WCAG accessibility criteria across 4 categories: Perceivable, Operable, Understandable, and Robust.",
  },
];

interface ReviewSetupHubProps {
  onClose: () => void;
}

export function ReviewSetupHub({ onClose }: ReviewSetupHubProps) {
  const { startReview } = useReview();
  const [selectedType, setSelectedType] = useState<EvaluationType | null>(null);
  const [info, setInfo] = useState<EvaluatorInfo>({
    name: "",
    groupName: "",
    targetApp: "Ourschool (Redesigned)",
    device: "Desktop",
    date: new Date().toLocaleDateString("en-US"),
    evaluationType: "peer-review",
  });

  const canProceed = info.name.trim() !== "" && selectedType !== null;

  const handleBegin = () => {
    if (!selectedType || !info.name.trim()) return;
    startReview(selectedType, info);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
        style={{
          background: "linear-gradient(135deg, #f0fdf4 0%, #ffffff 50%, #ecfdf5 100%)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
        >
          <X size={20} className="text-gray-500" />
        </button>

        {/* Header */}
        <div className="px-8 pt-8 pb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center">
              <ClipboardCheck size={18} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Peer Review Mode</h2>
          </div>
          <p className="text-sm text-gray-500">
            IT 101: Human Computer Interaction — 2nd Semester, SY 2025-2026
          </p>
        </div>

        {/* Evaluator Info */}
        <div className="px-8 pb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
            Evaluator Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Evaluator Name *
              </label>
              <input
                type="text"
                value={info.name}
                onChange={(e) => setInfo({ ...info, name: e.target.value })}
                placeholder="e.g., Juan Dela Cruz"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Group Name
              </label>
              <input
                type="text"
                value={info.groupName}
                onChange={(e) => setInfo({ ...info, groupName: e.target.value })}
                placeholder="e.g., Group 5"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Target App
              </label>
              <input
                type="text"
                value={info.targetApp}
                readOnly
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Date
              </label>
              <input
                type="text"
                value={info.date}
                readOnly
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Device Used
              </label>
              <div className="flex gap-2">
                {(["Desktop", "Mobile", "Tablet"] as const).map((device) => (
                  <button
                    key={device}
                    onClick={() => setInfo({ ...info, device })}
                    className={`flex-1 px-3 py-2 text-sm rounded-lg border transition-all ${
                      info.device === device
                        ? "bg-green-600 text-white border-green-600 shadow-md"
                        : "bg-white text-gray-600 border-gray-200 hover:border-green-300"
                    }`}
                  >
                    {device}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Evaluation Type Selection */}
        <div className="px-8 pb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
            Select Evaluation Type
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {evaluationTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = selectedType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={`relative text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                    isSelected
                      ? "border-green-600 bg-green-50 shadow-lg shadow-green-100 scale-[1.02]"
                      : "border-gray-200 bg-white hover:border-green-300 hover:shadow-md"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                    isSelected ? "bg-green-600" : "bg-gray-100"
                  }`}>
                    <Icon size={20} className={isSelected ? "text-white" : "text-gray-500"} />
                  </div>
                  <h4 className={`font-semibold text-sm mb-1 ${isSelected ? "text-green-800" : "text-gray-800"}`}>
                    {type.label}
                  </h4>
                  <p className="text-xs text-gray-500 mb-2">{type.description}</p>
                  <p className="text-[11px] text-gray-400 leading-relaxed">{type.details}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Begin Button */}
        <div className="px-8 pb-8 pt-2">
          <button
            onClick={handleBegin}
            disabled={!canProceed}
            className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              canProceed
                ? "bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-200 active:scale-[0.98]"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Begin Evaluation
            <ArrowRight size={16} />
          </button>
          {!canProceed && (
            <p className="text-center text-xs text-gray-400 mt-2">
              Fill in your name and select an evaluation type to continue.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
