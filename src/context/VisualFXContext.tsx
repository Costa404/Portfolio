import React, { createContext, useContext, useState, useEffect } from "react";

export type FXMode = "nebula" | "hyperdrive" | "aurora" | "plasma";
export type ColorTheme = "cosmic" | "cyberpunk" | "matrix" | "solar";

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  glow: string;
  rgbPrimary: [number, number, number];
  rgbSecondary: [number, number, number];
}

export const COLOR_PALETTES: Record<ColorTheme, ColorPalette> = {
  cosmic: {
    primary: "#818cf8", // Soft Ice Indigo
    secondary: "#c084fc", // Soft Violet
    accent: "#38bdf8", // Ice Blue
    background: "#05060a", // Deepest Onyx Void
    glow: "rgba(129, 140, 248, 0.2)",
    rgbPrimary: [0.5, 0.55, 0.97],
    rgbSecondary: [0.75, 0.52, 0.98],
  },
  cyberpunk: {
    primary: "#6366f1", // Electric Indigo
    secondary: "#a855f7", // Royal Purple
    accent: "#06b6d4", // Deep Teal Glow
    background: "#040508",
    glow: "rgba(99, 102, 241, 0.22)",
    rgbPrimary: [0.38, 0.4, 0.94],
    rgbSecondary: [0.65, 0.33, 0.96],
  },
  matrix: {
    primary: "#14b8a6", // Sleek Teal
    secondary: "#06b6d4", // Ice Cyan
    accent: "#10b981", // Emerald Glow
    background: "#030807",
    glow: "rgba(20, 184, 166, 0.2)",
    rgbPrimary: [0.08, 0.72, 0.65],
    rgbSecondary: [0.02, 0.71, 0.83],
  },
  solar: {
    primary: "#fbbf24", // Champagne Gold
    secondary: "#f59e0b", // Amber Glow
    accent: "#d97706", // Bronze Accent
    background: "#080604",
    glow: "rgba(251, 191, 36, 0.18)",
    rgbPrimary: [0.98, 0.75, 0.14],
    rgbSecondary: [0.96, 0.62, 0.04],
  },
};

interface VisualFXContextType {
  mode: FXMode;
  setMode: (mode: FXMode) => void;
  theme: ColorTheme;
  setTheme: (theme: ColorTheme) => void;
  particleSpeed: number;
  setParticleSpeed: (speed: number) => void;
  particleDensity: "low" | "medium" | "high";
  setParticleDensity: (density: "low" | "medium" | "high") => void;
  mouseInteraction: boolean;
  setMouseInteraction: (enabled: boolean) => void;
  mouseGlowEnabled: boolean;
  setMouseGlowEnabled: (enabled: boolean) => void;
  autoCycle: boolean;
  setAutoCycle: (enabled: boolean) => void;
  triggerShockwave: (x: number, y: number) => void;
  clickRipple: { x: number; y: number; id: number } | null;
  palette: ColorPalette;
}

const VisualFXContext = createContext<VisualFXContextType | undefined>(undefined);

export const VisualFXProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<FXMode>("nebula");
  const [theme, setTheme] = useState<ColorTheme>("cosmic");
  const [particleSpeed, setParticleSpeed] = useState<number>(1);
  const [particleDensity, setParticleDensity] = useState<"low" | "medium" | "high">("high");
  const [mouseInteraction, setMouseInteraction] = useState<boolean>(true);
  const [mouseGlowEnabled, setMouseGlowEnabled] = useState<boolean>(true);
  const [autoCycle, setAutoCycle] = useState<boolean>(false);
  const [clickRipple, setClickRipple] = useState<{ x: number; y: number; id: number } | null>(null);

  const palette = COLOR_PALETTES[theme];

  const triggerShockwave = (x: number, y: number) => {
    setClickRipple({ x, y, id: Date.now() });
  };

  // Auto-cycle through modes if enabled
  useEffect(() => {
    if (!autoCycle) return;
    const modes: FXMode[] = ["nebula", "hyperdrive", "aurora", "plasma"];
    const themes: ColorTheme[] = ["cosmic", "cyberpunk", "matrix", "solar"];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % modes.length;
      setMode(modes[index]);
      setTheme(themes[index % themes.length]);
    }, 12000);

    return () => clearInterval(interval);
  }, [autoCycle]);

  return (
    <VisualFXContext.Provider
      value={{
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
        triggerShockwave,
        clickRipple,
        palette,
      }}
    >
      {children}
    </VisualFXContext.Provider>
  );
};

export const useVisualFX = () => {
  const context = useContext(VisualFXContext);
  if (!context) {
    throw new Error("useVisualFX must be used within a VisualFXProvider");
  }
  return context;
};
