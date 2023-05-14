import React, { useContext } from 'react';

import { Modal } from '@project/libs/components';
import { ModalContext } from '@project/libs/context';

export const ModalLayer: React.FC = () => {
  const {
    isModalOpen,
    closeModal,
    currentModal,
  } = useContext(ModalContext);

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
    >
      {currentModal}
    </Modal>
  );
};
