import { createContext, useContext, useState, ReactNode } from "react";

// Definindo o tipo do contexto
interface ModalContextType {
  isModalOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
  setSelectedVideo: (video: string | null) => void;
  selectedVideo: string | null;
}

// Criando o contexto com um valor padrão
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Provedor do contexto
export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const setModalOpen = (isOpen: boolean) => setIsModalOpen(isOpen);

  return (
    <ModalContext.Provider
      value={{ isModalOpen, setModalOpen, setSelectedVideo, selectedVideo }}
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
