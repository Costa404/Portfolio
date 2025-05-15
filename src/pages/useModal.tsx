import { createContext, useContext, useState, ReactNode } from "react";

interface ProjectData {
  title: string;
  description: string;
  backend?: string;
  frontend?: string;
}

interface ModalContextType {
  isModalOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
  isModalOpenDetails: boolean;
  setIsModalOpenDetails: (isOpen: boolean) => void;
  setSelectedVideo: (video: string | null) => void;
  selectedVideo: string | null;
  projectData: ProjectData | null;
  setProjectData: (data: ProjectData | null) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDetails, setIsModalOpenDetails] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [projectData, setProjectData] = useState<ProjectData | null>(null);

  const setModalOpen = (isOpen: boolean) => setIsModalOpen(isOpen);

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        setModalOpen,
        setSelectedVideo,
        selectedVideo,
        isModalOpenDetails,
        setIsModalOpenDetails,
        projectData,
        setProjectData,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
