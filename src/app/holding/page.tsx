"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const HELD_TASKS = [
  { id: 1, title: "Reply to investors", postponed: 4, originalDue: "Mon Mar 11" },
  { id: 2, title: "Update website copy", postponed: 3, originalDue: "Tue Mar 12" },
  { id: 3, title: "Tax documents", postponed: 5, originalDue: "Wed Mar 6" },
];

export default function Holding() {
  const [tasks, setTasks] = useState(HELD_TASKS);
  const [breaking, setBreaking] = useState<number | null>(null);
  const [tapCount, setTapCount] = useState(0);
  const [freed, setFreed] = useState<number | null>(null);
  const [killed, setKilled] = useState<number | null>(null);
  const TAP_THRESHOLD = 15;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTap = (id: number) => {
    if (breaking !== id) {
      setBreaking(id);
      setTapCount(1);
      return;
    }

    const next = tapCount + 1;
    setTapCount(next);

    // Vibrate if available
    if (navigator.vibrate) navigator.vibrate(20);

    if (next >= TAP_THRESHOLD) {
      setFreed(id);
      setBreaking(null);
      setTapCount(0);
      setTimeout(() => {
        setTasks(t => t.filter(task => task.id !== id));
        setFreed(null);
      }, 1200);
    }

    // Reset if too slow
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setBreaking(null);
      setTapCount(0);
    }, 2000);
  };

  const handleKill = (id: number) => {
    setKilled(id);
    setTimeout(() => {
      setTasks(t => t.filter(task => task.id !== id));
      setKilled(null);
    }, 600);
  };

  return (
    <div className="max-w-md mx-auto px-5 pt-10 pb-10 min-h-screen">
      <div className="flex items-center justify-between mb-2">
        <Link href="/timeline" className="text-zinc-400 text-sm">← back</Link>
        <div className="font-bold text-zinc-900 text-lg">Holding Zone</div>
        <div className="w-10" />
      </div>

      <div className="text-xs text-zinc-400 text-center mb-8">
        Tasks stuck in avoidance limbo. Tap fast to break free.
      </div>

      {tasks.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 text-zinc-300 space-y-2"
        >
          <div className="text-4xl">🕊️</div>
          <div className="text-sm">Nothing in holding. You're free.</div>
        </motion.div>
      )}

      <div className="space-y-4">
        <AnimatePresence>
          {tasks.map(task => {
            const isBreaking = breaking === task.id;
            const isFreed = freed === task.id;
            const isKilled = killed === task.id;
            const progress = isBreaking ? (tapCount / TAP_THRESHOLD) : 0;

            return (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: isKilled ? 0 : 1,
                  y: isKilled ? 20 : 0,
                  scale: isFreed ? 1.02 : isBreaking ? 1 + progress * 0.02 : 1,
                }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="relative"
              >
                {/* Cage bars */}
                <div
                  className={`absolute inset-0 rounded-2xl pointer-events-none z-10 overflow-hidden transition-opacity ${isBreaking ? "opacity-100" : "opacity-30"}`}
                >
                  {[0, 1, 2, 3, 4].map(i => (
                    <motion.div
                      key={i}
                      className="absolute top-0 bottom-0 w-[2px] bg-zinc-400"
                      style={{ left: `${15 + i * 17}%` }}
                      animate={isBreaking ? {
                        scaleY: [1, 0.95 + progress * 0.05, 1],
                        opacity: Math.max(0, 1 - progress * 1.2),
                      } : {}}
                      transition={{ duration: 0.1 }}
                    />
                  ))}
                </div>

                {/* Freed flash */}
                <AnimatePresence>
                  {isFreed && (
                    <motion.div
                      initial={{ opacity: 1 }}
                      animate={{ opacity: 0 }}
                      className="absolute inset-0 rounded-2xl bg-emerald-100 z-20 flex items-center justify-center"
                    >
                      <span className="text-2xl">🔓</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div
                  onClick={() => handleTap(task.id)}
                  className={`bg-white border rounded-2xl px-4 py-4 cursor-pointer select-none transition-all ${
                    isBreaking ? "border-zinc-400 bg-zinc-50 shadow-lg" : "border-zinc-200 shadow-sm"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold text-zinc-900">{task.title}</div>
                      <div className="text-xs text-zinc-400 mt-1">
                        Due {task.originalDue} · postponed {task.postponed}×
                      </div>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleKill(task.id); }}
                      className="text-zinc-300 hover:text-zinc-500 text-xs px-2 py-1 rounded-lg hover:bg-zinc-100 transition-all"
                    >
                      ✕ kill
                    </button>
                  </div>

                  {/* Progress bar */}
                  {isBreaking && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-3"
                    >
                      <div className="h-1 bg-zinc-100 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-zinc-900 rounded-full"
                          animate={{ width: `${progress * 100}%` }}
                          transition={{ duration: 0.05 }}
                        />
                      </div>
                      <div className="text-[10px] text-zinc-400 mt-1.5 text-center">
                        {tapCount < TAP_THRESHOLD
                          ? `Keep tapping! ${TAP_THRESHOLD - tapCount} more...`
                          : "Breaking free!"}
                      </div>
                    </motion.div>
                  )}

                  {!isBreaking && (
                    <div className="mt-3 text-[11px] text-zinc-300 text-center">
                      tap to break free →
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {tasks.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-zinc-900 text-white rounded-2xl px-4 py-3 flex gap-3"
        >
          <span>✦</span>
          <div className="text-sm">
            <span className="font-semibold">Kai: </span>
            "Tax documents" has been here 5 times. Be honest — is this actually happening?
          </div>
        </motion.div>
      )}
    </div>
  );
}
