import React, { memo, useEffect, useState } from "react";

import { Modal, Text, Image } from "@project/libs/components";
import { fail } from "@project/libs/assets/images";

import styles from "../styles.module.scss";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const FailureModal = memo<Props>(({ onClose, isOpen }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className={styles.success_modal}>
      <div className={styles.success_content}>
        <Image url={fail} />
        <div>
          <Text type="p" className={styles.labels_notification}>
            Oops! Something went wrong.
          </Text>
          <Text type="p" className={styles.labels_notification}>
            Please try again later
          </Text>
        </div>
      </div>
    </Modal>
  );
});
