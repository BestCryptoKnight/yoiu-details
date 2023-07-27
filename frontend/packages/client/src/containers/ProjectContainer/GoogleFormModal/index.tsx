import React, {memo} from "react";

import { Modal, Text, Image } from "@project/libs/components";

import styles from "../styles.module.scss";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleFormModal = memo<Props>(
  ({onClose, isOpen}) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose} className={styles.google_form_modal}>
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSd9imUKjzZBQrYqWd7z_rWYOpkQx02vvh8--usoWg7bvVFvjw/viewform?embedded=true" title="YOIU" width="100%" height="100%" frameBorder="0" />
      </Modal>
    )
  }
);