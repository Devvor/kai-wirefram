"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const screens = [
  { href: "/timeline", label: "Timeline", emoji: "📅", desc: "Weekly scroll view + task cards" },
  { href: "/dump", label: "Dump", emoji: "🧠", desc: "Open canvas → AI parses task" },
  { href: "/holding", label: "Holding Zone", emoji: "🔒", desc: "Spam tap to break free" },
  { href: "/graveyard", label: "Graveyard", emoji: "💀", desc: "Killed tasks rest here" },
  { href: "/recap", label: "Weekly Recap", emoji: "🎄", desc: "Kai's weekly summary" },
];

export default function Home() {
  return (
    <div className="max-w-md mx-auto px-5 py-12">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="mb-10">
          <div className="text-3xl font-bold tracking-tight text-zinc-900 mb-1">Kai</div>
          <div className="text-sm text-zinc-400">Interactive wireframe · tap a screen to explore</div>
        </div>

        <div className="space-y-3">
          {screens.map((s, i) => (
            <motion.div
              key={s.href}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Link href={s.href}>
                <div className="bg-white rounded-2xl px-5 py-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-all active:scale-[0.98] border border-zinc-100">
                  <span className="text-2xl">{s.emoji}</span>
                  <div>
                    <div className="font-semibold text-zinc-900">{s.label}</div>
                    <div className="text-xs text-zinc-400 mt-0.5">{s.desc}</div>
                  </div>
                  <span className="ml-auto text-zinc-300">→</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-xs text-zinc-300 text-center">
          Built with love · v0.1 wireframe
        </div>
      </motion.div>
    </div>
  );
}
