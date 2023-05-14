import React, {
  createContext,
  useMemo,
  useState,
  ReactNode,
} from 'react';

type ModalContextProps = {
  isModalOpen: boolean;
  currentModal: ReactNode;
  closeModal: () => void;
  openModal: (modal: ReactNode) => void;
};

export const ModalContext = createContext<ModalContextProps>({
  isModalOpen: false,
  currentModal: undefined,
  closeModal: () => {},
  openModal: () => {},
});

export const ModalProvider = ({ children } : { children: ReactNode }) => {
  const [currentModal, setCurrentModal] = useState<ReactNode | undefined>(undefined);

  const openModal = (modal: ReactNode) => {
    setCurrentModal(modal);
  };

  const closeModal = () => {
    setCurrentModal(undefined);
  };

  const isModalOpen = currentModal !== undefined;

  const value = useMemo(() => ({
    isModalOpen,
    currentModal,
    openModal,
    closeModal,
  }), [currentModal, isModalOpen]);

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};
