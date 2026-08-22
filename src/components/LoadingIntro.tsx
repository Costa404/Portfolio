import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface LoadingIntroProps {
  /** Callback fired when the intro animation finishes or is skipped */
  onComplete: () => void;
}

/**
 * Full-screen preloader/intro animation shown on first visit.
 * Orchestrates a 3-phase cinematic reveal.
 */
const LoadingIntro: React.FC<LoadingIntroProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<1 | 2 | 3>(1);
  const [skipped, setSkipped] = useState(false);

  const finish = useCallback(() => {
    setSkipped(true);
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const handleSkip = () => finish();
    // Allow clicking or pressing any key to skip the animation immediately
    window.addEventListener('keydown', handleSkip);
    window.addEventListener('click', handleSkip);

    return () => {
      window.removeEventListener('keydown', handleSkip);
      window.removeEventListener('click', handleSkip);
    };
  }, [finish]);

  // Handle animation phases timing
  useEffect(() => {
    if (skipped) return;
    
    // Phase 2 starts at 0.6s
    const t1 = setTimeout(() => setPhase(2), 600);
    // Phase 3 starts at 1.4s
    const t2 = setTimeout(() => setPhase(3), 1400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [skipped]);

  if (skipped) return null;

  const nameCharacters = "NUNO COSTA".split("");

  return (
    <AnimatePresence>
      {!skipped && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020304]"
          initial={{ y: 0 }}
          animate={{ y: phase === 3 ? "-100vh" : 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          onAnimationComplete={(definition) => {
            // Check if the exit translation has completed
            if (
              definition === "-100vh" ||
              (typeof definition === 'object' && 'y' in definition && definition.y === "-100vh")
            ) {
              finish();
            }
          }}
        >
          <motion.div 
            className="flex flex-col items-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: phase === 3 ? 0 : 1 }}
            transition={{ duration: 0.4 }}
          >
            {/* Phase 1 & 2: Monogram with pulsing cyan glow */}
            <motion.div
              className="font-heading text-4xl font-bold text-white mb-6"
              initial={{ opacity: 0, scale: 0.9, textShadow: '0 0 0px rgba(6, 182, 212, 0)' }}
              animate={{ 
                opacity: phase >= 2 ? 0.7 : 1, 
                scale: phase >= 2 ? 0.9 : 1,
                textShadow: phase >= 2 
                  ? '0 0 10px rgba(6, 182, 212, 0.2)' 
                  : ['0 0 10px rgba(6, 182, 212, 0.3)', '0 0 25px rgba(6, 182, 212, 0.7)', '0 0 10px rgba(6, 182, 212, 0.3)']
              }}
              transition={{ 
                duration: 0.5, 
                textShadow: { repeat: phase === 1 ? Infinity : 0, duration: 1.5, ease: "easeInOut" }
              }}
            >
              NC
            </motion.div>

            {/* Phase 2: Letter-by-letter Name Reveal */}
            <motion.div
              className="flex font-heading text-xl tracking-[0.3em] text-zinc-300 mb-6"
              initial="hidden"
              animate={phase >= 2 ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.05 }
                }
              }}
            >
              {nameCharacters.map((char, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.div>

            {/* Phase 2: Expanding Gradient Line */}
            <motion.div
              className="h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
              initial={{ width: 0, opacity: 0 }}
              animate={{ 
                width: phase >= 2 ? 200 : 0, 
                opacity: phase >= 2 ? 1 : 0 
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingIntro;
