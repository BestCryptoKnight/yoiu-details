import React, { useCallback } from 'react';

import {
  Button, Modal, Image, Text,
} from '@project/libs/components';
import checked from '@project/libs/assets/images/checked.png';

import styles from './styles.module.scss';

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const EmailSubscriptionModal = (props: Props) => {
  const { isOpen, onClose } = props;

  const ok = useCallback(() => {
    onClose();
  }, []);

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      className={styles.modal_container}
    >
      <Image url={checked} />
      <div className={styles.actions}>

        <Text>
          A verification email was sent to your inbox, Please verify your email !
        </Text>

      </div>
      <Button
        theme="gradient"
        onClick={ok}

      >
        ok
      </Button>
    </Modal>
  );
};
