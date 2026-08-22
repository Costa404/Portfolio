import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: "blur(4px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: "blur(4px)",
  },
};

const pageTransition = {
  type: "tween",
  ease: [0.16, 1, 0.3, 1], // custom cubic-bezier for smooth feel
  duration: 0.4,
};

/**
 * Wraps page content to add cinematic enter/exit transitions.
 * Used inside AnimatePresence in App.tsx for route-based animation.
 */
const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
