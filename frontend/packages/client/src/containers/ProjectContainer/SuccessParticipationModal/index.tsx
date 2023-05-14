import React, { memo } from "react";

import { Modal, Text, Image } from "@project/libs/components";
import { successParticipation } from "@project/libs/assets/images";

import styles from "../styles.module.scss";

interface Props {
  amount: number;
  isOpen: boolean;
  onClose: () => void;
}

export const SuccessParticipationModal = memo<Props>(
  ({ onClose, isOpen, amount }) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose} className={styles.join_modal}>
        <div className={styles.modal_header}>
          <p>Successful Participation!</p>
        </div>
        <div style={{ margin: "auto" }}>
          <div className={styles.actions_success}>
            <Image url={successParticipation} />
            <div>
              <Text type="p" className={styles.labels_notification}>
                Amount: {amount} FINA Tokens
              </Text>
              <Text type="p" className={styles.labels_notification}>
                Cooldown Period:
              </Text>
              <Text type="p" className={styles.labels_notification}>
                14 Days for Tier 5 - Tier 2, 10 Days for Tier 1
              </Text>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
);
