import React, { useEffect, useState } from "react";
import { useVisualFX } from "../context/VisualFXContext";

export const MouseSpotlight: React.FC = () => {
  const { mouseGlowEnabled, palette, triggerShockwave } = useVisualFX();
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Update CSS variables globally for card lighting effects
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      triggerShockwave(e.clientX, e.clientY);
      setTimeout(() => setIsClicking(false), 250);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, [triggerShockwave]);

  if (!mouseGlowEnabled) return null;

  return (
    <>
      {/* Subtle Minimal Radial Spotlight Light */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden md:block"
        style={{
          background: `radial-gradient(550px circle at ${pos.x}px ${pos.y}px, ${palette.glow}, transparent 75%)`,
        }}
      />

      {/* Sleek Minimal Precision Cursor Point */}
      <div
        className="pointer-events-none fixed z-50 rounded-full transition-transform duration-75 hidden md:block"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: isClicking ? "28px" : "8px",
          height: isClicking ? "28px" : "8px",
          transform: "translate(-50%, -50%)",
          background: palette.primary,
          boxShadow: `0 0 15px 3px ${palette.primary}`,
          opacity: isClicking ? 0.8 : 0.4,
        }}
      />
    </>
  );
};
