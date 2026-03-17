"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type ParsedTask = {
  title: string;
  timeEstimate: string;
  dueDate: string;
  priority: string;
  note: string;
};

const MOCK_PARSED: ParsedTask = {
  title: "Call dentist",
  timeEstimate: "20 min",
  dueDate: "Thursday",
  priority: "Medium",
  note: "been putting it off forever",
};

type Stage = "input" | "parsing" | "confirm" | "saved";

export default function Dump() {
  const [stage, setStage] = useState<Stage>("input");
  const [text, setText] = useState("");

  const handleDump = () => {
    if (!text.trim()) return;
    setStage("parsing");
    setTimeout(() => setStage("confirm"), 1800);
  };

  const handleConfirm = () => {
    setStage("saved");
    setTimeout(() => {
      setStage("input");
      setText("");
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto px-5 pt-10 pb-10 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <Link href="/timeline" className="text-zinc-400 text-sm">← back</Link>
        <div className="font-bold text-zinc-900 text-lg">Dump</div>
        <div className="w-10" />
      </div>

      <AnimatePresence mode="wait">
        {/* Input stage */}
        {stage === "input" && (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="space-y-4"
          >
            <div>
              <div className="text-2xl font-bold text-zinc-900 mb-1">What's on your mind?</div>
              <div className="text-sm text-zinc-400">Just type it out. Kai will figure out the rest.</div>
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="call dentist sometime next week maybe thursday, been putting it off forever, 20 mins..."
              className="w-full bg-white border border-zinc-200 rounded-2xl px-4 py-4 text-zinc-900 placeholder:text-zinc-300 text-base resize-none outline-none focus:border-zinc-400 transition-colors min-h-[160px]"
              autoFocus
            />

            <button
              onClick={handleDump}
              disabled={!text.trim()}
              className="w-full bg-zinc-900 text-white font-semibold py-4 rounded-2xl disabled:opacity-30 transition-opacity text-sm"
            >
              ✦ Let Kai parse this
            </button>

            <div className="bg-zinc-50 rounded-2xl px-4 py-3 text-xs text-zinc-400 space-y-1">
              <div className="font-medium text-zinc-500 mb-1">Kai also understands:</div>
              <div>"dentist appt + prep" → creates 2 linked tasks</div>
              <div>"every monday morning, standup" → recurring task</div>
              <div>"urgent: fix the login bug" → high priority flagged</div>
            </div>
          </motion.div>
        )}

        {/* Parsing stage */}
        {stage === "parsing" && (
          <motion.div
            key="parsing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center pt-20 gap-5"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 rounded-full border-2 border-zinc-200 border-t-zinc-900"
            />
            <div className="text-zinc-400 text-sm">Kai is reading between the lines...</div>
            <div className="bg-zinc-50 rounded-2xl px-4 py-3 max-w-xs text-xs text-zinc-400 italic text-center">
              "{text.slice(0, 60)}{text.length > 60 ? '...' : ''}"
            </div>
          </motion.div>
        )}

        {/* Confirm stage */}
        {stage === "confirm" && (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div>
              <div className="text-2xl font-bold text-zinc-900 mb-1">Looks right?</div>
              <div className="text-sm text-zinc-400">Kai's interpretation. Edit anything.</div>
            </div>

            {/* Raw dump */}
            <div className="bg-zinc-50 rounded-2xl px-4 py-3">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-1">Your words</div>
              <div className="text-sm text-zinc-500 italic">"{text}"</div>
            </div>

            {/* AI parsed */}
            <div className="bg-white border border-zinc-200 rounded-2xl px-4 py-4 space-y-3">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Kai parsed this as</div>

              {(Object.entries(MOCK_PARSED) as [keyof ParsedTask, string][]).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-xs text-zinc-400 capitalize">{key === "timeEstimate" ? "Time" : key === "dueDate" ? "Due" : key === "note" ? "Note" : key}</span>
                  <span className={`text-sm font-medium ${key === "title" ? "text-zinc-900" : "text-zinc-600"} bg-zinc-50 px-3 py-1 rounded-lg`}>
                    {val}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStage("input")}
                className="flex-1 bg-zinc-100 text-zinc-600 font-semibold py-3.5 rounded-2xl text-sm"
              >
                Edit
              </button>
              <button
                onClick={handleConfirm}
                className="flex-2 flex-grow-[2] bg-zinc-900 text-white font-semibold py-3.5 rounded-2xl text-sm"
              >
                ✓ Add to Timeline
              </button>
            </div>
          </motion.div>
        )}

        {/* Saved stage */}
        {stage === "saved" && (
          <motion.div
            key="saved"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center pt-24 gap-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-white text-2xl"
            >
              ✓
            </motion.div>
            <div className="text-zinc-900 font-semibold">Task added</div>
            <div className="text-zinc-400 text-sm">Kai slotted it for Thursday</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
