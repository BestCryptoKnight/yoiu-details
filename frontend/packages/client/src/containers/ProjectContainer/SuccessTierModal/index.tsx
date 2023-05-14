import React, { memo } from "react";

import { Modal, Text, Image } from "@project/libs/components";
import { successUpgrade } from "@project/libs/assets/images";

import styles from "../styles.module.scss";

interface Props {
  text: string;
  isOpen: boolean;
  onClose: () => void;
}

export const SuccessTierModal = memo<Props>(({ onClose, isOpen, text }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className={styles.success_modal}>
      <div className={styles.success_content}>
        <Image url={successUpgrade} />
        <div>
          <Text type="p" className={styles.labels_notification}>
            {text}
          </Text>
        </div>
      </div>
    </Modal>
  );
});
