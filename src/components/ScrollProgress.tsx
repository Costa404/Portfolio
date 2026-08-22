import React, { useEffect, useState } from "react";

/**
 * ScrollProgress
 * 
 * A high-performance, lightweight scroll progress indicator fixed at the top of the viewport.
 * Uses requestAnimationFrame throttling and CSS scaleX transforms for optimal 60fps rendering.
 */
export const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollableHeight = documentHeight - windowHeight;

      if (scrollableHeight > 0) {
        const currentProgress = Math.min(Math.max(scrollY / scrollableHeight, 0), 1);
        setProgress(currentProgress);
      } else {
        setProgress(0);
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    // Calculate initial progress on mount
    updateScrollProgress();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[9999] h-[2px] hover:h-[3px] transition-[height] duration-150 ease-out origin-left bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 shadow-[0_0_10px_rgba(6,182,212,0.5)] will-change-transform"
      style={{
        transform: `scaleX(${progress})`,
        transformOrigin: "left",
      }}
    />
  );
};

export default ScrollProgress;
