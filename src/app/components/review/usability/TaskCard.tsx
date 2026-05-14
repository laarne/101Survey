import { useState, useEffect } from "react";
import { useReview, TaskResult } from "../../../contexts/ReviewContext";
import { usabilityTasks } from "../../../data/reviewData";
import { Play, CheckCircle, XCircle, HelpCircle, Clock, MousePointerClick, ChevronDown, ChevronUp } from "lucide-react";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export function TaskCard() {
  const { state, startTask, completeTask, getTaskElapsedTime } = useReview();
  const [taskTime, setTaskTime] = useState(0);
  const [notes, setNotes] = useState("");
  const [selectedResult, setSelectedResult] = useState<TaskResult>(null);
  const [isMinimized, setIsMinimized] = useState(false);

  const taskIndex = state.usabilityCurrentTask;
  const isActive = state.usabilityTaskActive;
  const task = usabilityTasks[taskIndex];

  // Update task timer
  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setTaskTime(getTaskElapsedTime());
    }, 100);
    return () => clearInterval(interval);
  }, [isActive, getTaskElapsedTime]);

  // Don't show if not in task phase or all tasks done
  if (state.usabilityPhase !== "tasks" || taskIndex >= 10) return null;

  const handleStart = () => {
    setNotes("");
    setSelectedResult(null);
    setTaskTime(0);
    startTask();
  };

  const handleComplete = () => {
    if (selectedResult === null) return;
    completeTask(selectedResult, notes);
    setNotes("");
    setSelectedResult(null);
    setTaskTime(0);
  };

  return (
    <div 
      className={`fixed bottom-24 right-4 z-[9995] flex flex-col bg-white dark:bg-gray-900 shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700 transition-all duration-300 ${
        isMinimized ? "h-14 w-64" : "h-auto w-80"
      }`}
    >
      {/* Header */}
      <div 
        className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 cursor-pointer bg-gray-50/50 dark:bg-gray-800/50 rounded-t-2xl"
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded-lg ${isActive ? "bg-red-500 animate-pulse" : "bg-green-600"} flex items-center justify-center text-white text-[10px] font-bold`}>
            {taskIndex + 1}
          </div>
          <span className="text-sm font-bold text-gray-900 dark:text-white">
            Task {taskIndex + 1}
          </span>
        </div>
        <button className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500">
          {isMinimized ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {!isMinimized && (
        <div className="p-5 space-y-4">
          <p className="text-[11px] text-gray-700 dark:text-gray-300 font-medium leading-relaxed italic">
            "{task?.description}"
          </p>

          {isActive && (
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-800 rounded-lg px-2 py-1.5 flex-1 border border-gray-100 dark:border-gray-700">
                <Clock size={12} className="text-red-500" />
                <span className="text-xs font-mono font-bold text-gray-900 dark:text-white">{formatTime(taskTime)}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-800 rounded-lg px-2 py-1.5 flex-1 border border-gray-100 dark:border-gray-700">
                <MousePointerClick size={12} className="text-blue-500" />
                <span className="text-xs font-mono font-bold text-gray-900 dark:text-white">{state.metrics.totalClicks}</span>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {!isActive ? (
              <button
                onClick={handleStart}
                className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Play size={14} /> Start Task
              </button>
            ) : (
              <div className="space-y-3">
                <div className="flex gap-1">
                  <button
                    onClick={() => setSelectedResult("pass")}
                    className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                      selectedResult === "pass" ? "bg-green-600 text-white border-green-600" : "bg-white dark:bg-gray-800 text-gray-400 border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    Pass
                  </button>
                  <button
                    onClick={() => setSelectedResult("fail")}
                    className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                      selectedResult === "fail" ? "bg-red-600 text-white border-red-600" : "bg-white dark:bg-gray-800 text-gray-400 border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    Fail
                  </button>
                  <button
                    onClick={() => setSelectedResult("assist")}
                    className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                      selectedResult === "assist" ? "bg-amber-500 text-white border-amber-500" : "bg-white dark:bg-gray-800 text-gray-400 border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    Assist
                  </button>
                </div>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Observations..."
                  rows={2}
                  className="w-full px-3 py-2 text-xs border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 resize-none outline-none"
                />
                <button
                  onClick={handleComplete}
                  disabled={selectedResult === null}
                  className={`w-full py-2 rounded-lg text-xs font-bold transition-all ${
                    selectedResult !== null ? "bg-green-600 text-white shadow-md" : "bg-gray-100 dark:bg-gray-800 text-gray-400"
                  }`}
                >
                  Complete Task
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
