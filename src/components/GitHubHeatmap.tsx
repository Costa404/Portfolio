import React, { useState } from "react";
import { motion } from "framer-motion";
import { useGitHubActivity, DayEntry } from "../hooks/useGitHubActivity";
import { FaGithub, FaFire, FaCode, FaExternalLinkAlt } from "react-icons/fa";
import { CONTACT } from "../constants";

const LEVEL_COLORS = [
  "bg-white/[0.04]",  // 0 — empty
  "bg-emerald-900/60", // 1 — low
  "bg-emerald-700/70", // 2 — medium-low
  "bg-emerald-500/80", // 3 — medium-high
  "bg-emerald-400",    // 4 — high
];

const LEVEL_BORDERS = [
  "border-white/[0.06]",
  "border-emerald-800/40",
  "border-emerald-600/40",
  "border-emerald-400/40",
  "border-emerald-300/50",
];

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/**
 * GitHub contribution heatmap displaying real-time public activity.
 * Styled to match the portfolio's Swiss/dark aesthetic.
 */
const GitHubHeatmap: React.FC = () => {
  const { grid, stats, loading, error } = useGitHubActivity();
  const [hoveredCell, setHoveredCell] = useState<DayEntry | null>(null);

  // ──── Loading Skeleton ────
  if (loading) {
    return (
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-white/10 animate-pulse" />
          <div className="h-5 w-48 bg-white/10 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 bg-white/5 rounded-xl animate-pulse" />
          ))}
        </div>
        <div className="h-28 bg-white/5 rounded-xl animate-pulse" />
      </div>
    );
  }

  // ──── Error State ────
  if (error) {
    return (
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-white/10 text-center">
        <FaGithub className="text-3xl text-zinc-500 mx-auto mb-3" />
        <p className="text-zinc-400 text-sm">
          Unable to load GitHub activity right now.
        </p>
      </div>
    );
  }

  // ──── Compute month labels for the header ────
  const monthMarkers: { label: string; col: number }[] = [];
  let lastMonth = -1;
  grid.forEach((week, colIdx) => {
    const firstDayOfWeek = week[0];
    if (!firstDayOfWeek) return;
    const month = new Date(firstDayOfWeek.date).getMonth();
    if (month !== lastMonth) {
      monthMarkers.push({ label: MONTH_LABELS[month], col: colIdx });
      lastMonth = month;
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-emerald-600/8 blur-[100px] pointer-events-none" />

        {/* ──── Header ──── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <FaGithub className="text-xl" />
            </span>
            <div>
              <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
                GitHub Activity
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              </h3>
              <p className="text-[11px] text-zinc-500 font-mono">
                Last ~4 months of public contributions
              </p>
            </div>
          </div>

          <a
            href={CONTACT.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:border-emerald-500/30 text-[11px] font-medium transition-all"
          >
            <FaExternalLinkAlt className="text-[9px]" />
            @Costa404
          </a>
        </div>

        {/* ──── Stats Row ──── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard
            label="Contributions"
            value={stats.totalContributions.toString()}
            icon={<FaCode className="text-emerald-400 text-xs" />}
          />
          <StatCard
            label="Current Streak"
            value={`${stats.currentStreak}d`}
            icon={<FaFire className="text-orange-400 text-xs" />}
          />
          <StatCard
            label="Longest Streak"
            value={`${stats.longestStreak}d`}
            icon={<FaFire className="text-amber-400 text-xs" />}
          />
          <StatCard
            label="Public Repos"
            value={stats.publicRepos.toString()}
            icon={<FaGithub className="text-zinc-400 text-xs" />}
          />
        </div>

        {/* ──── Heatmap Grid ──── */}
        <div className="relative">
          {/* Tooltip */}
          {hoveredCell && hoveredCell.count >= 0 && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/15 text-[11px] font-mono text-zinc-200 whitespace-nowrap shadow-xl pointer-events-none">
              <span className="text-emerald-400 font-bold">{hoveredCell.count}</span>{" "}
              {hoveredCell.count === 1 ? "contribution" : "contributions"} on{" "}
              <span className="text-white">
                {new Date(hoveredCell.date + "T12:00:00").toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          )}

          {/* Month labels */}
          <div
            className="flex mb-1.5 ml-8"
            style={{ gap: 0 }}
          >
            {monthMarkers.map((marker, i) => {
              const nextCol = monthMarkers[i + 1]?.col ?? grid.length;
              const span = nextCol - marker.col;
              return (
                <span
                  key={`${marker.label}-${marker.col}`}
                  className="text-[10px] font-mono text-zinc-500"
                  style={{
                    width: `${(span / grid.length) * 100}%`,
                    minWidth: 0,
                    flexShrink: 0,
                  }}
                >
                  {marker.label}
                </span>
              );
            })}
          </div>

          {/* Grid: day labels + cells */}
          <div className="flex gap-[3px]">
            {/* Day-of-week labels */}
            <div className="flex flex-col gap-[3px] pt-0 shrink-0 w-7">
              {DAY_LABELS.map((label, i) => (
                <div
                  key={label}
                  className="h-[13px] flex items-center"
                >
                  <span className={`text-[9px] font-mono text-zinc-600 ${i % 2 === 0 ? "opacity-0" : ""}`}>
                    {label.slice(0, 2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Week columns */}
            <div className="flex gap-[3px] flex-1 overflow-hidden">
              {grid.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[3px] flex-1 min-w-0">
                  {week.map((day) => (
                    <div
                      key={day.date}
                      onMouseEnter={() => setHoveredCell(day)}
                      onMouseLeave={() => setHoveredCell(null)}
                      className={`
                        aspect-square rounded-[3px] border transition-all duration-150
                        ${day.count === -1
                          ? "bg-transparent border-transparent"
                          : `${LEVEL_COLORS[day.level]} ${LEVEL_BORDERS[day.level]} hover:ring-1 hover:ring-emerald-400/40 hover:scale-125 cursor-pointer`
                        }
                      `}
                      title={
                        day.count >= 0
                          ? `${day.count} contributions on ${day.date}`
                          : undefined
                      }
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-2 mt-3 text-[10px] font-mono text-zinc-500">
            <span>Less</span>
            {LEVEL_COLORS.map((color, i) => (
              <div
                key={i}
                className={`w-[11px] h-[11px] rounded-[2px] border ${color} ${LEVEL_BORDERS[i]}`}
              />
            ))}
            <span>More</span>
          </div>
        </div>

        {/* ──── Top Languages ──── */}
        {stats.topLanguages.length > 0 && (
          <div className="pt-4 border-t border-white/10">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-2 block">
              Most Used Languages
            </span>
            <div className="flex flex-wrap gap-2">
              {stats.topLanguages.map((lang) => (
                <span
                  key={lang}
                  className="text-[11px] font-mono px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ──── Small Stat Card ────
const StatCard: React.FC<{
  label: string;
  value: string;
  icon: React.ReactNode;
}> = ({ label, value, icon }) => (
  <div className="rounded-xl bg-white/[0.03] border border-white/[0.07] p-3 space-y-1">
    <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
      {icon}
      {label}
    </div>
    <p className="font-heading text-xl font-bold text-white">{value}</p>
  </div>
);

export default GitHubHeatmap;
