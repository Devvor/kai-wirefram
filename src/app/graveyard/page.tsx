"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const DEAD_TASKS = [
  { id: 1, title: "Learn guitar", killedOn: "Mar 14", postponed: 7, reason: "never actually wanted to" },
  { id: 2, title: "Read Atomic Habits", killedOn: "Mar 10", postponed: 3, reason: null },
  { id: 3, title: "Cold outreach to 20 VCs", killedOn: "Mar 8", postponed: 5, reason: "strategy changed" },
  { id: 4, title: "Redesign landing page", killedOn: "Mar 3", postponed: 2, reason: null },
  { id: 5, title: "Morning meditation", killedOn: "Feb 28", postponed: 9, reason: "not for me" },
];

export default function Graveyard() {
  return (
    <div className="max-w-md mx-auto px-5 pt-10 pb-10 min-h-screen">
      <div className="flex items-center justify-between mb-2">
        <Link href="/timeline" className="text-zinc-400 text-sm">← back</Link>
        <div className="font-bold text-zinc-900 text-lg">Graveyard</div>
        <div className="w-10" />
      </div>

      <div className="text-xs text-zinc-400 text-center mb-8">
        Things you had the courage to kill. Rest in peace.
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Killed", value: "23", emoji: "⚔️" },
          { label: "Avg postpones", value: "4.2", emoji: "🔄" },
          { label: "Hours saved", value: "~11h", emoji: "⏱️" },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-2xl px-3 py-3 text-center border border-zinc-100 shadow-sm">
            <div className="text-lg mb-0.5">{stat.emoji}</div>
            <div className="font-bold text-zinc-900 text-base">{stat.value}</div>
            <div className="text-[10px] text-zinc-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Kai observation */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-zinc-900 text-white rounded-2xl px-4 py-3 flex gap-3 mb-6"
      >
        <span>✦</span>
        <div className="text-sm">
          <span className="font-semibold">Kai: </span>
          You've killed 8 tasks that started with "learn". Maybe explore why before adding more.
        </div>
      </motion.div>

      {/* Task tombstones */}
      <div className="space-y-3">
        {DEAD_TASKS.map((task, i) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-white rounded-2xl px-4 py-4 border border-zinc-100 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <span className="text-base mt-0.5">🪦</span>
                <div>
                  <div className="font-medium text-zinc-500 line-through">{task.title}</div>
                  <div className="text-xs text-zinc-400 mt-0.5">
                    Killed {task.killedOn} · {task.postponed} postpones
                  </div>
                  {task.reason && (
                    <div className="text-xs text-zinc-400 mt-1 italic">"{task.reason}"</div>
                  )}
                </div>
              </div>
              <button className="text-[10px] text-zinc-300 hover:text-zinc-500 bg-zinc-50 px-2 py-1 rounded-lg transition-colors">
                revive
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-8 text-xs text-zinc-300">
        Letting go is also progress.
      </div>
    </div>
  );
}
