import React, { memo } from "react";
import cx from "classnames";

import { Image, Text } from "@project/libs/components";

import styles from "./styles.module.scss";

export type NFRTierCardProps = {
  image: string;
  cardTitle: string;
  amount: string;
  leftBottomImage: string;
  rightUpperImage: string;
  nftTier?: number;
  selected?: boolean;
  className?: string;
};

export const NFRTierCard = memo<NFRTierCardProps>(
  ({ image, cardTitle, amount, className, selected }) => (
    <div
      className={cx(styles.nft_tier_card_container, className, {
        [styles.nft_hover]: selected,
      })}
    >
      <Image url={image} className={styles.nft_tier_card_image} />
      <Text type="p" className={styles.card_title}>
        {cardTitle}
      </Text>
      <Text type="p" className={styles.card_description}>
        Possible Allocation <b>${amount}</b>
      </Text>
    </div>
  )
);
