import React, { memo, useMemo, useState } from "react";
import cx from "classnames";
import { PathName } from "global";
import { Project } from "types";

import { Color, strings } from "global";
import { formatTimeStampToMonthYear, formatToDollarWithTopCommas } from "utils";

import {
  Button,
  Image,
  ProgressWithLabels,
  Text,
} from "@project/libs/components";

import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import { finalogo, finaCard, AcmeLogo } from "@project/libs/assets/images";
import {
  pitch_1,
  pitch_2,
  pitch_3,
  pitch_4,
  pitch_5,
  pitch_6,
  pitch_7,
  pitch_8,
  pitch_9,
  pitch_10,
  pitch_11,
  pitch_12,
  pitch_13,
  pitch_14,
  pitch_15,
  pitch_16,
  pitch_17,
} from "@project/libs/assets/images/Fina-pitchdeck";

export type IdoListingItem = {
  id: number;
  logoUrl?: string;
  name?: string;
  shortName?: string;
  description?: string;
  totalRize: number;
  participants: number;
  progress: number;
  softcap: number;
  sold_amount: number;
  end_time: number;
  price: string;
  admin?: string;
  start_time: number;
  payment?: any;
  shared_whitelist?: boolean;
  token_contract: string;
  token_contract_hash?: string;
  total_payment?: string;
  total_tokens_amount?: string;
  withdrawn?: boolean;
};

type ArchievedListingCardProps = {
  listingItem: IdoListingItem;
};

export const ArchievedListingCard = memo<ArchievedListingCardProps>(
  ({ listingItem }) => {
    const navigate = useNavigate();
    const {
      id,
      logoUrl,
      name,
      totalRize,
      sold_amount,
      participants,
      progress,
      softcap,
      end_time,
      total_tokens_amount: totalTokenAmount,
      sold_amount: soldAmount,
      price,
      start_time: statsAt,
      token_contract: contractAddress,
    } = listingItem;

    const project: Project = {
      name: "FINA",
      shortName: "FINA",
      description:
        "Fina VISA prepaid card allows you to connect with any wallet, top up with any cryptocurrency, through any crypto network, all with a single on-chain transaction",
      slogan: "The Next-Gen DEX Protocol For Everyone.",
      totalRize: `${Number(soldAmount) / Math.pow(10, 6) / Number(price)} SCRT`,
      price,
      targetAmount: `${
        Number(totalTokenAmount) / Math.pow(10, 6) / Number(price)
      } SCRT`,
      participants,
      progress,
      softcap,
      end_time,
      statsAt,
      vestingSchedule: "5% at TGE, 6 months lock-up, 12 months linear vesting.",
      logoUrl: finalogo,
      imageUrl: finaCard,
      id: String(id),
      button:
        statsAt < new Date().getTime() / 1000 &&
        end_time > new Date().getTime() / 1000,
      buttonActive:
        end_time > new Date().getTime() / 1000
          ? statsAt < new Date().getTime() / 1000
            ? "Active"
            : "Soon"
          : "Ended",
      connect: true,
      buttonTheme: "secondary",
      socialMedia: "https://twitter.com/FinaCash",
      whitePaper:
        "https://docs.google.com/document/d/1ALZCtjaRuFS-mfddl5eutwr5ZjYCBKy0lI-6UHiOhhc/edit",
      website: "https://fina.cash/",
      contractAddress,
      pitchdeck: [
        pitch_1,
        pitch_2,
        pitch_3,
        pitch_4,
        pitch_5,
        pitch_6,
        pitch_7,
        pitch_8,
        pitch_9,
        pitch_10,
        pitch_11,
        pitch_12,
        pitch_13,
        pitch_14,
        pitch_15,
        pitch_16,
        pitch_17,
      ],
    };

    const labelValues = useMemo(
      () => [
        {
          label: `1 SCRT = ${price} FINA`,
          value: name,
          className: styles.title,
        },
        {
          label: strings.participants,
          value: participants,
          className: styles.participant,
        },
        {
          label: strings.raisedInTotal,
          value: formatToDollarWithTopCommas(totalRize),
          className: styles.price,
        },
        {
          label: strings.presaleEnd,
          value: formatTimeStampToMonthYear(end_time),
          className: styles.date,
        },
      ],
      [name, participants, totalRize]
    );

    const onJoinClick = (item: Project, projectId: number) => {
      navigate(`${PathName.listings}/${projectId}`, {
        state: item,
      });
    };

    return (
      <div className={styles.listing_card_container}>
        <div className={styles.listing_image_container}>
          {logoUrl !== undefined && (
            <Image className={styles.listing_card_image} url={logoUrl} />
          )}
        </div>
        <div className={styles.label_values_container}>
          {labelValues.map(({ label, value, className }) => (
            <div
              className={cx(styles.label_value_container, className)}
              key={label}
            >
              <Text className={styles.value}>{value}</Text>
              <Text className={styles.label}>{label}</Text>
            </div>
          ))}
          <ProgressWithLabels
            className={styles.progress_container}
            classNameBar={styles.progress_bar}
            classNameProgressText={styles.progress_text}
            softcap={softcap}
            progress={progress}
            subLabel={(sold_amount / Math.pow(10, 6)).toString()}
            subValue={(totalRize / Math.pow(10, 6)).toString()}
          />
        </div>

        <Button
          className={styles.more_info_button}
          theme="gradient"
          gradientBackgroundColor={Color.white3}
          onClick={() => onJoinClick(project, id)}
        >
          More Info
        </Button>
      </div>
    );
  }
);
