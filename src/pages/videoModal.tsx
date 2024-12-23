import React from "react";
import ReactDOM from "react-dom";

interface VideoModalProps {
  videoPath: string;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ videoPath, onClose }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="relative bg-black w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 rounded-lg overflow-hidden">
        <video src={videoPath} muted controls className="w-full h-full" />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-600 text-white rounded-full p-2 cursor-pointer"
        >
          X
        </button>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default VideoModal;
