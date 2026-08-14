import React, { createContext, useContext, useState, useEffect } from "react";

export type FXMode = "silk" | "kinetic" | "dust" | "horizon";
export type ColorTheme = "cyan" | "slate" | "emerald" | "sapphire";

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
  cyan: {
    primary: "#06b6d4", // Ice Cyan
    secondary: "#10b981", // Emerald Teal
    accent: "#38bdf8", // Ice Blue
    background: "#090b10", // Deep Charcoal Slate
    glow: "rgba(6, 182, 212, 0.25)",
    rgbPrimary: [0.02, 0.71, 0.83],
    rgbSecondary: [0.06, 0.72, 0.5],
  },
  slate: {
    primary: "#f8fafc", // Pure Swiss White
    secondary: "#94a3b8", // Slate Muted
    accent: "#06b6d4", // Ice Cyan Tint
    background: "#08090d", // Charcoal Void
    glow: "rgba(248, 250, 252, 0.15)",
    rgbPrimary: [0.97, 0.98, 0.99],
    rgbSecondary: [0.58, 0.64, 0.72],
  },
  emerald: {
    primary: "#10b981", // Deep Emerald
    secondary: "#34d399", // Mint Teal
    accent: "#06b6d4", // Ice Cyan
    background: "#050b08", // Charcoal Mint
    glow: "rgba(16, 185, 129, 0.22)",
    rgbPrimary: [0.06, 0.72, 0.5],
    rgbSecondary: [0.2, 0.83, 0.6],
  },
  sapphire: {
    primary: "#3b82f6", // Electric Blue
    secondary: "#60a5fa", // Soft Sapphire
    accent: "#06b6d4", // Ice Cyan
    background: "#060812", // Charcoal Navy
    glow: "rgba(59, 130, 246, 0.22)",
    rgbPrimary: [0.23, 0.51, 0.96],
    rgbSecondary: [0.38, 0.65, 0.98],
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
  const [mode, setMode] = useState<FXMode>("silk");
  const [theme, setTheme] = useState<ColorTheme>("cyan");
  const [particleSpeed, setParticleSpeed] = useState<number>(0.8);
  const [particleDensity, setParticleDensity] = useState<"low" | "medium" | "high">("medium");
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
    const modes: FXMode[] = ["silk", "kinetic", "dust", "horizon"];
    const themes: ColorTheme[] = ["cyan", "slate", "emerald", "sapphire"];
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
