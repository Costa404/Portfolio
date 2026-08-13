import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";

interface VideoModalProps {
  videoPath: string;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ videoPath, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const targetElement = document.getElementById("modal-root") || document.body;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md transition-all duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl rounded-3xl overflow-hidden glass-card border border-white/20 shadow-2xl bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 hover:bg-white/20 text-white backdrop-blur-md transition-colors cursor-pointer"
          aria-label="Close video"
        >
          <FaTimes className="text-base" />
        </button>

        <div className="aspect-video w-full">
          <video
            src={videoPath}
            controls
            autoPlay
            className="w-full h-full object-contain bg-black"
          />
        </div>
      </div>
    </div>,
    targetElement
  );
};

export default VideoModal;
