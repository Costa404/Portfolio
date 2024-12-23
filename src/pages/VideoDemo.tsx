import VideoModal from "./videoModal";
import { useModal } from "./useModal";
import { useEffect } from "react";
const VideoDemo = () => {
  const { isModalOpen, setModalOpen, setSelectedVideo, selectedVideo } =
    useModal();

  console.log("modalOpen", isModalOpen);
  console.log("selectedVideo", selectedVideo);
  console.log("modalOpen", isModalOpen);

  // useEffect(() => {
  //   console.log("isModalOpen updated in videoDemo ", isModalOpen);
  // }, [isModalOpen]);

  return (
    <div className="text-center p-6">
      {isModalOpen && (
        <VideoModal
          videoPath={selectedVideo || "no video"}
          onClose={() => {
            setModalOpen(false);
            setSelectedVideo(null);
          }}
        />
      )}
    </div>
  );
};

export default VideoDemo;
