import { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
  isModalOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
  isModalOpenDetails: boolean;
  setIsModalOpenDetails: (isOpen: boolean) => void;
  setSelectedVideo: (video: string | null) => void;
  selectedVideo: string | null;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDetails, setIsModalOpenDetails] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

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
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
