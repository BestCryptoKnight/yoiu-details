import { Project } from "types";

import React, { memo, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { IDOInfo } from "pages/ListingsPage";

import { PathName, strings } from "global";

import { Loader, Text } from "@project/libs/components";
import { finalogo, finaCard } from "@project/libs/assets/images";
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

import { IdoCardListing } from "./IdoCardListing";

import styles from "./styles.module.scss";

type ListingsContainerProps = {
  listings: IDOInfo[];
  loading: boolean;
};

export const ListingsContainer = memo(
  ({ listings, loading }: ListingsContainerProps) => {
    const idoListingItems: Project[] = useMemo(
      () =>
        listings.map((listing) => {
          const {
            // eslint-disable-next-line
            id,
            total_tokens_amount: totalTokenAmount,
            soft_cap,
            sold_amount,
            total_payment,
            participants,
            price,
            end_time,
            remaining_per_tiers,
            start_time: statsAt,
            token_contract: contractAddress,
          } = listing;

          const progress = Number(totalTokenAmount)
            ? Number(sold_amount) / Number(totalTokenAmount)
            : 0;
          return {
            name: "FINA",
            shortName: "FINA",
            description:
              "Fina VISA Prepaid Card, top up with any cryptocurrency, through any crypto network, all with a single on-chain transaction",
            slogan: "FINA - Web3 VISA Prepaid Card.",
            totalRize: `${Number(total_payment) / Math.pow(10, 6)} SCRT`,
            price,
            targetAmount: `${Math.ceil(
              Number(totalTokenAmount) / (Math.pow(10, 6) * Number(price))
            )} SCRT`,
            participants,
            progress,
            softcap: (Number(soft_cap) / Number(totalTokenAmount)) * 100,
            remaining_per_tiers,
            end_time,
            statsAt,
            vestingSchedule:
              "5% at TGE, 6 months lock-up, 12 months linear vesting.",
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
        }),
      [listings]
    );

    const navigate = useNavigate();

    const onJoinClick = (item: Project) => (projectId: string) => {
      navigate(`${PathName.listings}/${projectId}`, {
        state: item,
      });
    };

    return loading ? (
      <div className={styles.loading_screen}>
        <Loader size={100} />
        <Text type="h2">Please ensure that your wallet is connected</Text>
      </div>
    ) : (
      <div className={styles.listings_container}>
        <div className={styles.listings_content}>
          <Text type="h2" className={styles.listings_title}>
            {strings.listings} {idoListingItems.length === 0 && "(TBA)"}
          </Text>
          <div className={styles.listings_cards_list}>
            {idoListingItems.map((idoListingItem, idx) => (
              <IdoCardListing
                listingItem={idoListingItem}
                onJoinClick={onJoinClick(idoListingItem)}
                key={idx}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
);
