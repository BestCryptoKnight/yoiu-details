/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { memo } from "react";

import { strings } from "global";

import { Image, Text } from "@project/libs/components";

import styles from "./styles.module.scss";

type StepCardProps = {
  index: number;
  description: string;
  imageUrl: string;
  onClick?: () => void;
};

export const StepCard = memo<StepCardProps>(
  ({ index, description, imageUrl, onClick }) => (
    <div className={styles.step_card_container} onClick={onClick}>
      <Image className={styles.step_card_image} url={imageUrl} />
      <Text type="h2" className={styles.step_title}>
        {strings.step(index)}
      </Text>
      <Text className={styles.step_description} type="h3">
        {description}
      </Text>
    </div>
  )
);
