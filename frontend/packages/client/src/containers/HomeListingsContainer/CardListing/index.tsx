import { Project } from "types";

import React, { memo, useMemo } from "react";
import { PolicyAndTermsAgreementModal } from "components/PolicyAndTermsAgreementModal";

import { useModal } from "hooks";
import { strings } from "global";

import { Image, Text } from "@project/libs/components";

import styles from "./styles.module.scss";
import * as dayjs from "dayjs";

type CardListingProps = {
  listingItem: Project;
  handleCardClick: () => void;
};

export const CardListing = memo<CardListingProps>(
  ({ listingItem, handleCardClick }) => {
    const [isOpen, onToggle] = useModal();
    const {
      urlName,
      slogan,
      imageUrl,
      briefDescription,
      targetAmount,
      price,
      statsAt,
    } = listingItem;
    const tableItems = useMemo(
      () => [
        {
          label: strings.targetAmount,
          // value: targetAmount,
          value: strings.TBA,
        },
        {
          label: strings.price,
          // value: price,
          value: strings.TBA,
        },
        {
          label: strings.starts,
          // value: dayjs.unix(statsAt).format("MMMM D, YYYY"),
          value: strings.TBA,
        },
      ],
      [targetAmount, price, statsAt]
    );

    return (
      <>
        <div
          role="button"
          className={styles.listing_card_container}
          onClick={handleCardClick}
          tabIndex={0}
        >
          <Image className={styles.listing_card_image} url={imageUrl} />
          <div className={styles.listing_card_text_container}>
            <Text type="p" className={styles.listing_link}>
              {urlName}
            </Text>
            <Text type="h3" className={styles.listing_slogan}>
              {slogan}
            </Text>
            <Text type="p" className={styles.listing_table_title}>
              {briefDescription}
            </Text>
            <div className={styles.listings_table}>
              {tableItems.map(({ label, value }) => (
                <div className={styles.table_item} key={label}>
                  <Text type="p" className={styles.table_item_label}>
                    {label}
                  </Text>
                  <Text type="p" className={styles.table_item_value}>
                    {value}
                  </Text>
                </div>
              ))}
            </div>
          </div>
        </div>
        <PolicyAndTermsAgreementModal isOpen={isOpen} onClose={onToggle} />
      </>
    );
  }
);
