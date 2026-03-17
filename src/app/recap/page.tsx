"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const STATS = [
  { label: "Completed", value: 14, emoji: "✅", color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Killed", value: 3, emoji: "⚔️", color: "text-zinc-600", bg: "bg-zinc-50" },
  { label: "Postponed", value: 6, emoji: "→", color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Hours focused", value: "8.5h", emoji: "⏱️", color: "text-blue-600", bg: "bg-blue-50" },
];

const TOP_TASKS = [
  "Reply to investors",
  "Write product spec",
  "Review Q1 metrics",
];

export default function Recap() {
  const [revealed, setRevealed] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);

  const cards = [
    {
      type: "intro",
      content: (
        <div className="text-center space-y-3">
          <div className="text-5xl">📊</div>
          <div className="text-2xl font-bold text-zinc-900">Week of Mar 10</div>
          <div className="text-zinc-500">Your weekly unwrap is ready</div>
        </div>
      ),
    },
    {
      type: "stats",
      content: (
        <div className="space-y-3">
          <div className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">By the numbers</div>
          {STATS.map(s => (
            <div key={s.label} className={`${s.bg} rounded-2xl px-4 py-3 flex items-center justify-between`}>
              <span className={`font-medium ${s.color} flex items-center gap-2`}>
                <span>{s.emoji}</span>{s.label}
              </span>
              <span className={`text-xl font-bold ${s.color}`}>{s.value}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      type: "wins",
      content: (
        <div className="space-y-4">
          <div className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Top wins</div>
          {TOP_TASKS.map((t, i) => (
            <motion.div
              key={t}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12 }}
              className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 border border-zinc-100 shadow-sm"
            >
              <span className="text-emerald-500 font-bold">#{i + 1}</span>
              <span className="text-zinc-900 font-medium">{t}</span>
            </motion.div>
          ))}
        </div>
      ),
    },
    {
      type: "kai",
      content: (
        <div className="space-y-5">
          <div className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Kai's take</div>
          <div className="bg-zinc-900 text-white rounded-2xl px-5 py-5 space-y-4">
            <div className="text-base leading-relaxed">
              "Strong week on execution — you cleared all your high-priority items by Wednesday. 
              The 6 postponed tasks are mostly admin work. 
              <span className="text-zinc-300"> Consider: do they actually need doing, or are they just hanging around?</span>"
            </div>
            <div className="border-t border-zinc-700 pt-4 space-y-2">
              <div className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Next week, focus on</div>
              <div className="text-sm text-zinc-300">→ Clear the admin backlog Monday morning</div>
              <div className="text-sm text-zinc-300">→ Block 2h deep work daily (your sweet spot is 9–11am)</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      type: "share",
      content: (
        <div className="text-center space-y-6">
          <div className="text-4xl">🎄</div>
          <div className="text-xl font-bold text-zinc-900">Week in a card</div>
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-700 rounded-3xl p-6 text-white space-y-3 shadow-xl">
            <div className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Week of Mar 10</div>
            <div className="text-4xl font-bold">14</div>
            <div className="text-zinc-300 text-sm">tasks crushed</div>
            <div className="border-t border-zinc-700 pt-3 grid grid-cols-3 gap-2 text-center">
              <div><div className="text-lg font-bold">3</div><div className="text-xs text-zinc-400">killed</div></div>
              <div><div className="text-lg font-bold">8.5h</div><div className="text-xs text-zinc-400">focused</div></div>
              <div><div className="text-lg font-bold">82%</div><div className="text-xs text-zinc-400">hit rate</div></div>
            </div>
            <div className="text-xs text-zinc-500 pt-1">made with Kai ✦</div>
          </div>
          <button className="w-full bg-zinc-900 text-white font-semibold py-4 rounded-2xl text-sm">
            Share this week →
          </button>
        </div>
      ),
    },
  ];

  if (!revealed) {
    return (
      <div className="max-w-md mx-auto px-5 pt-10 pb-10 min-h-screen flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <Link href="/timeline" className="text-zinc-400 text-sm">← back</Link>
          <div className="font-bold text-zinc-900 text-lg">Weekly Recap</div>
          <div className="w-10" />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl"
          >
            📦
          </motion.div>
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-zinc-900">Your week is ready</div>
            <div className="text-zinc-400 text-sm">Week of Mar 10–16 · 14 tasks completed</div>
          </div>
          <button
            onClick={() => setRevealed(true)}
            className="bg-zinc-900 text-white font-semibold px-8 py-4 rounded-2xl text-sm"
          >
            Unwrap →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-5 pt-10 pb-10 min-h-screen flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <Link href="/timeline" className="text-zinc-400 text-sm">← back</Link>
        <div className="flex gap-1">
          {cards.map((_, i) => (
            <div key={i} className={`h-1 rounded-full transition-all ${i === cardIndex ? "w-6 bg-zinc-900" : "w-1.5 bg-zinc-200"}`} />
          ))}
        </div>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={cardIndex}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="h-full"
          >
            {cards[cardIndex].content}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-3 mt-8">
        {cardIndex > 0 && (
          <button
            onClick={() => setCardIndex(i => i - 1)}
            className="flex-1 bg-zinc-100 text-zinc-600 font-semibold py-3.5 rounded-2xl text-sm"
          >
            ← Back
          </button>
        )}
        {cardIndex < cards.length - 1 && (
          <button
            onClick={() => setCardIndex(i => i + 1)}
            className="flex-1 bg-zinc-900 text-white font-semibold py-3.5 rounded-2xl text-sm"
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
}
