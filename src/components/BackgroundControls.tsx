import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Zap,
  Waves,
  Orbit,
  Palette,
  Settings2,
  Shuffle,
  MousePointer,
  Gauge,
  X,
  Sliders,
  Check,
  Layers,
} from "lucide-react";
import { useVisualFX, FXMode, ColorTheme, COLOR_PALETTES } from "../context/VisualFXContext";

export const BackgroundControls: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    mode,
    setMode,
    theme,
    setTheme,
    particleSpeed,
    setParticleSpeed,
    particleDensity,
    setParticleDensity,
    mouseInteraction,
    setMouseInteraction,
    mouseGlowEnabled,
    setMouseGlowEnabled,
    autoCycle,
    setAutoCycle,
    palette,
  } = useVisualFX();

  const modesList: { id: FXMode; label: string; icon: React.ComponentType<{ className?: string }>; desc: string }[] = [
    { id: "nebula", label: "Quantum Mesh", icon: Sparkles, desc: "3D Particle Constellation & Morphing Core" },
    { id: "hyperdrive", label: "Hyperdrive Warp", icon: Zap, desc: "3D Starfield Speed Tunnel & Warp Streaks" },
    { id: "aurora", label: "Aurora Waves", icon: Waves, desc: "3D Undulating Liquid Surface Grid" },
    { id: "plasma", label: "Plasma Orbs", icon: Orbit, desc: "Orbiting Metallic Spheres & Energy Fields" },
  ];

  const themesList: { id: ColorTheme; label: string; colorHex: string }[] = [
    { id: "cyberpunk", label: "Cyberpunk", colorHex: "#6366f1" },
    { id: "cosmic", label: "Cosmic", colorHex: "#8b5cf6" },
    { id: "matrix", label: "Matrix", colorHex: "#10b981" },
    { id: "solar", label: "Solar", colorHex: "#f59e0b" },
  ];

  const densities: ("low" | "medium" | "high")[] = ["low", "medium", "high"];

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating Trigger Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full glass-nav border border-white/20 shadow-2xl text-white font-medium text-xs backdrop-blur-xl transition-all"
            style={{
              boxShadow: `0 0 25px -5px ${palette.primary}60`,
            }}
          >
            <span className="relative flex h-3 w-3">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: palette.primary }}
              />
              <span
                className="relative inline-flex rounded-full h-3 w-3"
                style={{ backgroundColor: palette.primary }}
              />
            </span>
            <span className="font-heading tracking-wide uppercase font-semibold text-[11px] flex items-center gap-1.5">
              <Settings2 className="w-4 h-4 text-indigo-300 group-hover:rotate-45 transition-transform duration-300" />
              Visual FX HUD
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 font-mono">
              {mode}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating HUD Control Panel Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-80 sm:w-96 glass-card rounded-3xl p-5 border border-white/20 shadow-2xl space-y-5 text-white backdrop-blur-2xl"
            style={{
              boxShadow: `0 20px 50px -10px ${palette.primary}30, 0 0 30px -5px ${palette.secondary}20`,
            }}
          >
            {/* HUD Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span
                  className="p-2 rounded-xl text-white shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})` }}
                >
                  <Sliders className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="font-heading font-bold text-sm tracking-wide">3D Visual Engine</h3>
                  <p className="text-[10px] text-zinc-400">Interactive Canvas & Shaders</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Auto Cycle Button */}
                <button
                  onClick={() => setAutoCycle(!autoCycle)}
                  className={`p-2 rounded-xl text-xs flex items-center gap-1 transition-all border ${
                    autoCycle
                      ? "bg-indigo-600/30 border-indigo-400 text-indigo-200"
                      : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
                  }`}
                  title="Auto Cycle Effects & Colors"
                >
                  <Shuffle className={`w-3.5 h-3.5 ${autoCycle ? "animate-spin" : ""}`} />
                  <span className="text-[10px]">Surprise Me</span>
                </button>

                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-all border border-white/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mode Select Grid */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> 3D Preset Mode
              </label>
              <div className="grid grid-cols-2 gap-2">
                {modesList.map((item) => {
                  const Icon = item.icon;
                  const isActive = mode === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setMode(item.id)}
                      className={`relative flex flex-col items-start p-3 rounded-2xl border text-left transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-br from-indigo-900/60 to-purple-900/40 border-indigo-400/80 shadow-lg shadow-indigo-600/20"
                          : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-zinc-300"
                      }`}
                    >
                      {isActive && (
                        <span className="absolute top-2 right-2 flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-400" />
                        </span>
                      )}
                      <Icon className={`w-4 h-4 mb-1.5 ${isActive ? "text-indigo-300" : "text-zinc-400"}`} />
                      <span className="text-xs font-semibold">{item.label}</span>
                      <span className="text-[9px] text-zinc-400 line-clamp-1 mt-0.5">{item.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Theme Color Palette Picker */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5" /> Holographic Theme
              </label>
              <div className="grid grid-cols-4 gap-2">
                {themesList.map((item) => {
                  const isActive = theme === item.id;
                  const p = COLOR_PALETTES[item.id];
                  return (
                    <button
                      key={item.id}
                      onClick={() => setTheme(item.id)}
                      className={`flex flex-col items-center p-2 rounded-xl border text-center transition-all ${
                        isActive
                          ? "border-white/80 bg-white/10 font-semibold shadow-md"
                          : "border-white/10 bg-white/5 hover:bg-white/10 text-zinc-400"
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full mb-1 flex items-center justify-center border border-white/20"
                        style={{
                          background: `linear-gradient(135deg, ${p.primary}, ${p.secondary})`,
                        }}
                      >
                        {isActive && <Check className="w-3 h-3 text-white" />}
                      </span>
                      <span className="text-[10px]">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Performance Controls */}
            <div className="pt-2 border-t border-white/10 space-y-3 text-xs">
              {/* Particle Speed Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Gauge className="w-3.5 h-3.5" /> Motion Speed
                  </span>
                  <span className="text-indigo-300 font-bold">{particleSpeed}x</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="3"
                  step="0.2"
                  value={particleSpeed}
                  onChange={(e) => setParticleSpeed(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              {/* Particle Density */}
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span className="flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5" /> Density
                </span>
                <div className="flex gap-1">
                  {densities.map((d) => (
                    <button
                      key={d}
                      onClick={() => setParticleDensity(d)}
                      className={`px-2 py-0.5 rounded text-[9px] uppercase transition-all ${
                        particleDensity === d
                          ? "bg-indigo-600 text-white font-bold"
                          : "bg-white/5 hover:bg-white/10 text-zinc-400"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => setMouseInteraction(!mouseInteraction)}
                  className={`flex items-center justify-between p-2 rounded-xl border text-[10px] font-mono transition-all ${
                    mouseInteraction
                      ? "bg-indigo-500/20 border-indigo-400/50 text-indigo-200"
                      : "bg-white/5 border-white/10 text-zinc-500"
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <MousePointer className="w-3 h-3" /> Mouse Force
                  </span>
                  <span>{mouseInteraction ? "ON" : "OFF"}</span>
                </button>

                <button
                  onClick={() => setMouseGlowEnabled(!mouseGlowEnabled)}
                  className={`flex items-center justify-between p-2 rounded-xl border text-[10px] font-mono transition-all ${
                    mouseGlowEnabled
                      ? "bg-purple-500/20 border-purple-400/50 text-purple-200"
                      : "bg-white/5 border-white/10 text-zinc-500"
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Cursor Spotlight
                  </span>
                  <span>{mouseGlowEnabled ? "ON" : "OFF"}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
