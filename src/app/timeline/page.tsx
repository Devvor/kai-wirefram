"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TODAY = 2; // Wednesday

const INITIAL_TASKS = [
  { id: 1, title: "Review Q1 metrics", time: 30, priority: "high", day: 0, status: "pending" },
  { id: 2, title: "Call dentist", time: 20, priority: "med", day: 1, status: "pending" },
  { id: 3, title: "Write product spec", time: 90, priority: "high", day: 2, status: "pending" },
  { id: 4, title: "Reply to investors", time: 45, priority: "high", day: 2, status: "pending" },
  { id: 5, title: "Grocery run", time: 30, priority: "low", day: 3, status: "pending" },
  { id: 6, title: "Gym", time: 60, priority: "med", day: 4, status: "pending" },
  { id: 7, title: "Weekly review", time: 30, priority: "med", day: 4, status: "pending" },
];

const PRIORITY_COLORS: Record<string, string> = {
  high: "bg-red-50 border-red-200 text-red-700",
  med: "bg-amber-50 border-amber-200 text-amber-700",
  low: "bg-zinc-50 border-zinc-200 text-zinc-500",
};

const PRIORITY_DOT: Record<string, string> = {
  high: "bg-red-400",
  med: "bg-amber-400",
  low: "bg-zinc-300",
};

export default function Timeline() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [selected, setSelected] = useState<number | null>(null);
  const [activeDay, setActiveDay] = useState(TODAY);

  const completeTask = (id: number) => {
    setTasks(t => t.map(task => task.id === id ? { ...task, status: "done" } : task));
    setSelected(null);
  };

  const postponeTask = (id: number) => {
    setTasks(t => t.map(task => task.id === id ? { ...task, day: Math.min(task.day + 1, 6) } : task));
    setSelected(null);
  };

  const killTask = (id: number) => {
    setTasks(t => t.map(task => task.id === id ? { ...task, status: "killed" } : task));
    setSelected(null);
  };

  const dayTasks = tasks.filter(t => t.day === activeDay && t.status !== "killed");

  return (
    <div className="max-w-md mx-auto flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-10 pb-4 bg-[#f9f9f7]">
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="text-zinc-400 text-sm">← back</Link>
          <div className="font-bold text-zinc-900 text-lg">This Week</div>
          <Link href="/dump">
            <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center">
              <Plus className="w-4 h-4 text-white" />
            </div>
          </Link>
        </div>

        {/* Day selector */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {DAYS.map((day, i) => {
            const count = tasks.filter(t => t.day === i && t.status === "pending").length;
            const doneCount = tasks.filter(t => t.day === i && t.status === "done").length;
            return (
              <button
                key={day}
                onClick={() => setActiveDay(i)}
                className={`flex-shrink-0 flex flex-col items-center px-3 py-2 rounded-xl transition-all ${
                  activeDay === i
                    ? "bg-zinc-900 text-white"
                    : i === TODAY
                    ? "bg-white border border-zinc-200 text-zinc-900"
                    : "text-zinc-400"
                }`}
              >
                <span className="text-[10px] font-medium uppercase tracking-wide">{day}</span>
                <span className={`text-lg font-bold ${i === TODAY && activeDay !== i ? "text-blue-500" : ""}`}>{i + 9}</span>
                {count > 0 && (
                  <span className={`text-[9px] font-medium mt-0.5 ${activeDay === i ? "text-zinc-300" : "text-zinc-400"}`}>
                    {doneCount > 0 ? `${doneCount}/${count + doneCount}` : count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Task list */}
      <div className="flex-1 overflow-y-auto px-5 pb-32 pt-2 space-y-2">
        <AnimatePresence>
          {dayTasks.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 text-zinc-300 text-sm"
            >
              Nothing here. Enjoy the day.
            </motion.div>
          )}
          {dayTasks.map(task => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: task.status === "done" ? 0.4 : 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              onClick={() => setSelected(selected === task.id ? null : task.id)}
              className={`bg-white rounded-2xl px-4 py-3.5 shadow-sm border cursor-pointer transition-all ${
                selected === task.id ? "border-zinc-300 shadow-md" : "border-zinc-100"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${PRIORITY_DOT[task.priority]}`} />
                <div className="flex-1 min-w-0">
                  <div className={`font-medium text-zinc-900 ${task.status === "done" ? "line-through text-zinc-400" : ""}`}>
                    {task.title}
                  </div>
                  <div className="text-xs text-zinc-400 mt-0.5">{task.time} min</div>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${PRIORITY_COLORS[task.priority]}`}>
                  {task.priority}
                </span>
              </div>

              <AnimatePresence>
                {selected === task.id && task.status === "pending" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 pt-3 border-t border-zinc-100 flex gap-2"
                  >
                    <button onClick={(e) => { e.stopPropagation(); completeTask(task.id); }}
                      className="flex-1 bg-emerald-500 text-white text-xs font-semibold py-2 rounded-xl">
                      ✓ Done
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); postponeTask(task.id); }}
                      className="flex-1 bg-amber-50 text-amber-700 text-xs font-semibold py-2 rounded-xl border border-amber-200">
                      → Later
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); killTask(task.id); }}
                      className="flex-1 bg-zinc-100 text-zinc-500 text-xs font-semibold py-2 rounded-xl">
                      ✕ Kill
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Kai nudge */}
      <div className="absolute bottom-24 left-0 right-0 px-5">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-zinc-900 text-white rounded-2xl px-4 py-3 flex items-start gap-3"
        >
          <span className="text-lg">✦</span>
          <div className="flex-1">
            <div className="text-xs font-semibold text-zinc-300 mb-0.5">Kai</div>
            <div className="text-sm">"Reply to investors" has been here 3 days. Want to tackle it first today?</div>
          </div>
        </motion.div>
      </div>

      {/* Bottom nav */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur border-t border-zinc-100 px-5 py-3 flex justify-around max-w-md mx-auto">
        <span className="text-xs text-zinc-900 font-semibold flex flex-col items-center gap-0.5">
          <span className="text-lg">📅</span>Today
        </span>
        <Link href="/dump" className="text-xs text-zinc-400 flex flex-col items-center gap-0.5">
          <span className="text-lg">🧠</span>Dump
        </Link>
        <Link href="/holding" className="text-xs text-zinc-400 flex flex-col items-center gap-0.5">
          <span className="text-lg">🔒</span>Holding
        </Link>
        <Link href="/graveyard" className="text-xs text-zinc-400 flex flex-col items-center gap-0.5">
          <span className="text-lg">💀</span>Graveyard
        </Link>
      </div>
    </div>
  );
}
