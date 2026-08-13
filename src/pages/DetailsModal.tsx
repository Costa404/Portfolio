import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { FaTimes, FaServer, FaLaptopCode, FaProjectDiagram, FaInfoCircle } from "react-icons/fa";

interface DetailsModalProps {
  title: string;
  description: string;
  backend?: string;
  frontend?: string;
  architecture?: string;
  onClose: () => void;
}

const DetailsModal: React.FC<DetailsModalProps> = ({
  title,
  description,
  backend,
  frontend,
  architecture,
  onClose,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const targetElement = document.getElementById("modal-Details") || document.body;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl p-6 sm:p-8 bg-zinc-950/90 border border-white/15 text-zinc-200 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 pr-8">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <FaInfoCircle className="text-xl" />
            </span>
            <h2 className="font-heading text-2xl font-bold text-white">
              {title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full glass-card hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close details"
          >
            <FaTimes className="text-lg" />
          </button>
        </div>

        {/* Overview */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
            Overview & Specifications
          </h3>
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            {description}
          </p>
        </div>

        {/* Architecture */}
        {architecture && (
          <div className="space-y-2 p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/20">
            <div className="flex items-center gap-2 text-indigo-300 font-heading font-semibold text-sm">
              <FaProjectDiagram />
              <span>System Architecture & Data Flow</span>
            </div>
            <p className="text-zinc-300 text-xs font-mono leading-relaxed">
              {architecture}
            </p>
          </div>
        )}

        {/* Frontend Section */}
        {frontend && (
          <div className="space-y-2 p-4 rounded-2xl glass-card border border-white/10">
            <div className="flex items-center gap-2 text-white font-heading font-semibold text-sm">
              <FaLaptopCode className="text-cyan-400" />
              <span>Frontend Architecture</span>
            </div>
            <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
              {frontend}
            </p>
          </div>
        )}

        {/* Backend Section */}
        {backend && (
          <div className="space-y-2 p-4 rounded-2xl glass-card border border-white/10">
            <div className="flex items-center gap-2 text-white font-heading font-semibold text-sm">
              <FaServer className="text-purple-400" />
              <span>Backend Architecture & APIs</span>
            </div>
            <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
              {backend}
            </p>
          </div>
        )}

        {/* Footer Close Action */}
        <div className="pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition-colors cursor-pointer"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>,
    targetElement
  );
};

export default DetailsModal;
