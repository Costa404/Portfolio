import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Props for the MagneticButton component.
 */
export interface MagneticButtonProps {
  /** Elements to be wrapped and given magnetic attraction behavior */
  children: React.ReactNode;
  /** Optional custom styling classes for the wrapper */
  className?: string;
  /** Attraction strength multiplier from 0 to 1 (default: 0.5) */
  strength?: number;
  /** Radius in pixels within which cursor proximity activates attraction (default: 80) */
  radius?: number;
  /** Whether the magnetic attraction effect is disabled */
  disabled?: boolean;
}

/** Spring physics configuration for smooth, elastic cursor tracking */
const SPRING_CONFIG = { stiffness: 150, damping: 15, mass: 0.1 };

/** Maximum physical pixel displacement in any direction */
const MAX_DISPLACEMENT = 8;

/**
 * MagneticButton
 *
 * A lightweight wrapper component that makes child elements "magnetic" by subtly
 * attracting them toward the mouse cursor when it is nearby.
 *
 * Features:
 * - High-performance document-level pointer tracking
 * - Smooth spring physics with Framer Motion `useMotionValue` and `useSpring`
 * - Automatic touch/pointer capability detection (renders as a no-op wrapper on touch devices)
 * - Transparent layout footprint
 * - Clean listener lifecycle management
 */
export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = "inline-block",
  strength = 0.5,
  radius = 80,
  disabled = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  // Motion values to drive animated coordinates
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring values for fluid, elastic movement
  const x = useSpring(rawX, SPRING_CONFIG);
  const y = useSpring(rawY, SPRING_CONFIG);

  // Detect touch-capable devices on mount to avoid unnecessary event listeners and strange mobile gestures
  useEffect(() => {
    const checkTouch = () => {
      return (
        typeof window !== "undefined" &&
        ("ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          window.matchMedia("(pointer: coarse)").matches ||
          window.matchMedia("(hover: none)").matches)
      );
    };

    setIsTouchDevice(checkTouch());
  }, []);

  useEffect(() => {
    // If disabled or on touch devices, ensure spring values are reset and don't register listeners
    if (disabled || isTouchDevice) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    /**
     * Calculates distance between cursor and element center.
     * If within detection radius, displaces element toward cursor proportionally to strength.
     */
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.hypot(dx, dy);

      if (distance < radius && distance > 0) {
        // Calculate offset displacement capped at MAX_DISPLACEMENT
        const pull = Math.min(distance * strength, MAX_DISPLACEMENT);
        const angle = Math.atan2(dy, dx);

        rawX.set(Math.cos(angle) * pull);
        rawY.set(Math.sin(angle) * pull);
      } else {
        rawX.set(0);
        rawY.set(0);
      }
    };

    /**
     * Resets the magnetic element back to origin when cursor exits window or viewport.
     */
    const handleMouseLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("blur", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("blur", handleMouseLeave);
      rawX.set(0);
      rawY.set(0);
    };
  }, [disabled, isTouchDevice, radius, strength, rawX, rawY]);

  // If touch device or disabled, render as a standard transparent container without motion transforms
  if (isTouchDevice || disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ x, y }} className={className}>
      {children}
    </motion.div>
  );
};

export default MagneticButton;
