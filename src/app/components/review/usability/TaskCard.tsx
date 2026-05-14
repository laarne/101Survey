import { useState, useEffect } from "react";
import { useReview, TaskResult } from "../../../contexts/ReviewContext";
import { usabilityTasks } from "../../../data/reviewData";
import { Play, CheckCircle, XCircle, HelpCircle, Clock, MousePointerClick } from "lucide-react";

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
    <div className="fixed bottom-4 left-4 z-[9988] w-[360px]">
      <div
        className="rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
        style={{
          background: "rgba(2, 44, 34, 0.95)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Header */}
        <div className="px-5 pt-4 pb-2 flex items-center justify-between">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
            Task {taskIndex + 1} of 10
          </span>
          {isActive && (
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs text-red-400 font-medium">Recording</span>
            </div>
          )}
        </div>

        {/* Task description */}
        <div className="px-5 pb-3">
          <p className="text-white font-semibold text-sm leading-relaxed">
            "{task?.description}"
          </p>
        </div>

        {/* Metrics */}
        {isActive && (
          <div className="px-5 pb-3 flex gap-3">
            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 flex-1">
              <Clock size={14} className="text-emerald-400" />
              <span className="text-white font-mono text-sm font-bold">{formatTime(taskTime)}</span>
              <span className="text-white/40 text-[10px]">sec</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 flex-1">
              <MousePointerClick size={14} className="text-emerald-400" />
              <span className="text-white font-mono text-sm font-bold">
                {state.metrics.totalClicks}
              </span>
              <span className="text-white/40 text-[10px]">clicks</span>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="px-5 pb-4">
          {!isActive ? (
            <button
              onClick={handleStart}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Play size={16} />
              Start Task
            </button>
          ) : (
            <div className="space-y-3">
              {/* Result buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedResult("pass")}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all border-2 ${
                    selectedResult === "pass"
                      ? "bg-green-500 text-white border-green-500"
                      : "bg-white/5 text-white/70 border-white/10 hover:border-green-400"
                  }`}
                >
                  <CheckCircle size={14} /> Pass
                </button>
                <button
                  onClick={() => setSelectedResult("fail")}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all border-2 ${
                    selectedResult === "fail"
                      ? "bg-red-500 text-white border-red-500"
                      : "bg-white/5 text-white/70 border-white/10 hover:border-red-400"
                  }`}
                >
                  <XCircle size={14} /> Fail
                </button>
                <button
                  onClick={() => setSelectedResult("assist")}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all border-2 ${
                    selectedResult === "assist"
                      ? "bg-amber-500 text-white border-amber-500"
                      : "bg-white/5 text-white/70 border-white/10 hover:border-amber-400"
                  }`}
                >
                  <HelpCircle size={14} /> Assist
                </button>
              </div>

              {/* Notes */}
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Think-aloud observation notes..."
                rows={2}
                className="w-full px-3 py-2 text-sm rounded-lg bg-white/10 text-white placeholder-white/30 border border-white/10 focus:border-emerald-400 outline-none resize-none"
              />

              {/* Complete */}
              <button
                onClick={handleComplete}
                disabled={selectedResult === null}
                className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all ${
                  selectedResult !== null
                    ? "bg-emerald-600 text-white hover:bg-emerald-500"
                    : "bg-white/10 text-white/30 cursor-not-allowed"
                }`}
              >
                Complete Task →
              </button>
            </div>
          )}
        </div>

        {/* Result legend */}
        <div className="px-5 pb-3 text-[10px] text-white/30 space-y-0.5">
          <div>• <b>Pass:</b> Completed without help</div>
          <div>• <b>Fail:</b> Could not complete / gave up</div>
          <div>• <b>Assist:</b> Completed only after the observer gave a hint</div>
        </div>
      </div>
    </div>
  );
}
