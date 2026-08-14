import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Waves,
  Box,
  Sparkles,
  Sun,
  Palette,
  Settings2,
  Shuffle,
  MousePointer,
  Gauge,
  X,
  Sliders,
  Check,
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
    mouseInteraction,
    setMouseInteraction,
    mouseGlowEnabled,
    setMouseGlowEnabled,
    autoCycle,
    setAutoCycle,
    palette,
  } = useVisualFX();

  const modesList: { id: FXMode; label: string; icon: React.ComponentType<{ className?: string }>; desc: string }[] = [
    { id: "silk", label: "Topological Silk", icon: Waves, desc: "3D Undulating Dot Matrix Grid" },
    { id: "kinetic", label: "Kinetic Geometry", icon: Box, desc: "Floating Hairline Polyhedron Shapes" },
    { id: "dust", label: "Minimal Dust", icon: Sparkles, desc: "Sparse Cyan Ambient Dust" },
    { id: "horizon", label: "Liquid Horizon", icon: Sun, desc: "Subtle Organic Liquid Waves" },
  ];

  const themesList: { id: ColorTheme; label: string }[] = [
    { id: "cyan", label: "Ice Cyan" },
    { id: "slate", label: "Swiss Slate" },
    { id: "emerald", label: "Mint Teal" },
    { id: "sapphire", label: "Sapphire" },
  ];

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating Trigger Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2 px-3.5 py-2.5 rounded-full glass-nav border border-white/10 shadow-xl text-white font-medium text-xs backdrop-blur-xl transition-all hover:border-cyan-500/40"
          >
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: palette.primary }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: palette.primary }}
              />
            </span>
            <span className="font-heading tracking-tight text-[11px] font-semibold flex items-center gap-1.5 text-zinc-300 group-hover:text-white transition-colors">
              <Settings2 className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-45 transition-transform duration-300" />
              Swiss FX HUD
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 font-mono border border-cyan-500/20">
              {mode}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating HUD Control Panel Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-80 sm:w-88 glass-card rounded-2xl p-4 border border-white/15 shadow-2xl space-y-4 text-white backdrop-blur-2xl"
          >
            {/* HUD Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <Sliders className="w-3.5 h-3.5" />
                </span>
                <div>
                  <h3 className="font-heading font-semibold text-xs tracking-tight text-white">
                    Swiss Clean Tech 3D
                  </h3>
                  <p className="text-[10px] text-zinc-400 font-mono">Precision Charcoal & Ice Cyan</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Auto Cycle Button */}
                <button
                  onClick={() => setAutoCycle(!autoCycle)}
                  className={`p-1.5 rounded-lg text-xs flex items-center gap-1 transition-all border ${
                    autoCycle
                      ? "bg-cyan-500/20 border-cyan-400 text-cyan-200"
                      : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
                  }`}
                  title="Auto Cycle Presets"
                >
                  <Shuffle className={`w-3 h-3 ${autoCycle ? "animate-spin" : ""}`} />
                  <span className="text-[10px]">Surprise Me</span>
                </button>

                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-all border border-white/10"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Mode Select Grid */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-wider text-cyan-300 flex items-center gap-1">
                <Waves className="w-3 h-3 text-cyan-400" /> 3D Minimal Preset
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {modesList.map((item) => {
                  const Icon = item.icon;
                  const isActive = mode === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setMode(item.id)}
                      className={`relative flex flex-col items-start p-2.5 rounded-xl border text-left transition-all duration-200 ${
                        isActive
                          ? "bg-cyan-500/15 border-cyan-400/60 text-white font-medium shadow-sm"
                          : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-zinc-400"
                      }`}
                    >
                      {isActive && (
                        <span className="absolute top-2 right-2 flex h-1.5 w-1.5">
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400" />
                        </span>
                      )}
                      <Icon className={`w-3.5 h-3.5 mb-1 ${isActive ? "text-cyan-400" : "text-zinc-400"}`} />
                      <span className="text-xs font-semibold">{item.label}</span>
                      <span className="text-[9px] text-zinc-500 line-clamp-1 mt-0.5">{item.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Theme Color Palette Picker */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-wider text-teal-300 flex items-center gap-1">
                <Palette className="w-3 h-3 text-teal-400" /> Theme Palette
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {themesList.map((item) => {
                  const isActive = theme === item.id;
                  const p = COLOR_PALETTES[item.id];
                  return (
                    <button
                      key={item.id}
                      onClick={() => setTheme(item.id)}
                      className={`flex flex-col items-center p-2 rounded-xl border text-center transition-all ${
                        isActive
                          ? "border-cyan-400/80 bg-cyan-500/20 text-white font-medium"
                          : "border-white/10 bg-white/5 hover:bg-white/10 text-zinc-400"
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full mb-1 flex items-center justify-center border border-white/20"
                        style={{
                          background: `linear-gradient(135deg, ${p.primary}, ${p.secondary})`,
                        }}
                      >
                        {isActive && <Check className="w-2.5 h-2.5 text-black" />}
                      </span>
                      <span className="text-[9px]">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Performance Controls */}
            <div className="pt-2 border-t border-white/10 space-y-2.5 text-xs">
              {/* Motion Speed Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Gauge className="w-3 h-3" /> Wave Speed
                  </span>
                  <span className="text-cyan-300 font-bold">{particleSpeed}x</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="2"
                  step="0.2"
                  value={particleSpeed}
                  onChange={(e) => setParticleSpeed(parseFloat(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                <button
                  onClick={() => setMouseInteraction(!mouseInteraction)}
                  className={`flex items-center justify-between p-2 rounded-xl border text-[10px] font-mono transition-all ${
                    mouseInteraction
                      ? "bg-cyan-500/20 border-cyan-400/50 text-cyan-200"
                      : "bg-white/5 border-white/10 text-zinc-500"
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <MousePointer className="w-3 h-3" /> Ripple
                  </span>
                  <span>{mouseInteraction ? "ON" : "OFF"}</span>
                </button>

                <button
                  onClick={() => setMouseGlowEnabled(!mouseGlowEnabled)}
                  className={`flex items-center justify-between p-2 rounded-xl border text-[10px] font-mono transition-all ${
                    mouseGlowEnabled
                      ? "bg-cyan-500/20 border-cyan-400/50 text-cyan-200"
                      : "bg-white/5 border-white/10 text-zinc-500"
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Spotlight
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
