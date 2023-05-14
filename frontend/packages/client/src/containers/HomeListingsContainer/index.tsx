import { Project } from "types";

import React, { memo, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { PolicyAndTermsAgreementModal } from "components/PolicyAndTermsAgreementModal";

import { useModal, useUserAggreement } from "hooks";
import { PathName, strings } from "global";

import { Button, Loader, Text } from "@project/libs/components";
import { AcmeLogo, finaCard, finalogo } from "@project/libs/assets/images";
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

import { CardListing } from "./CardListing";

import styles from "./styles.module.scss";

interface Props {
  landing: any;
  loading: boolean;
}

export const HomeListingsContainer = memo((props: Props) => {
  const { landing, loading } = props;
  const [isOpen, onToggle] = useModal();
  const [agreed] = useUserAggreement("yoiu-agreement");
  const navigate = useNavigate();

  const onViewListingsClick = useCallback(() => {
    if (agreed) {
      navigate(PathName.listings);
      return;
    }
    onToggle();
  }, [onToggle, navigate, agreed]);
  const listingItems: Project[] = useMemo(
    () => [
      {
        name: "FINA",
        shortName: "FINA",
        description: `FINA - Web3 VISA Prepaid Card,
               top up with any cryptocurrency, through any crypto network,
               all with a single on-chain transaction`,
        briefDescription: `${"On-chain Fiat Off-ramp"}`,
        slogan: `${"FINA - Spend Your Crypto Anywhere"}`,
        urlName: `${"Web3 Visa Prepaid Card"}`,
        totalRize: "0",
        // price: `${
        //   landing.price ? `1 SCRT = ${landing.price} FINA` : "1 SCRT = 50 FINA"
        // }`,
        price: `${"1 SCRT = 33 FINA"}`,
        // targetAmount: `${landing.target || "100,000"} SCRT`,
        targetAmount: `${"1'200'000"} SCRT`,
        participants: 0,
        progress: 0,
        // statsAt: new Date(`${landing.starts || "2023-04-08"}`).getTime() / 1000,
        statsAt: new Date(`${landing.starts || "2023-04-08"}`).getTime() / 1000,
        end_time: new Date("2023-04-20").getTime() / 1000,
        vestingSchedule:
          "5% at TGE, 6 months lock-up, 12 months linear vesting.",
        logoUrl: finalogo,
        // imageUrl: landing.image || finaCard,
        imageUrl: finaCard,
        id: "ff2f2f2f2f2gvbhbg",
        button: true,
        buttonActive: "Active",
        connect: true,
        softcap: 40,
        contractAddress: "",
        buttonTheme: "secondary",
        socialMedia: "https://twitter.com/FinaCash",
        whitePaper:
          "https://docs.google.com/document/d/1ALZCtjaRuFS-mfddl5eutwr5ZjYCBKy0lI-6UHiOhhc/edit",
        website: "https://fina.cash/",
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
      },
    ],
    [landing]
  );

  return (
    <div className={styles.listings_container}>
      <Text type="h2" className={styles.listings_title}>
        {strings.listings}
      </Text>
      <div className={styles.listings_cards_list}>
        {loading ? (
          <Loader size={60} />
        ) : (
          listingItems.map((listingItem) => (
            <CardListing
              handleCardClick={onViewListingsClick}
              listingItem={listingItem}
              key={listingItem.slogan}
            />
          ))
        )}
      </div>
      <Button
        theme="gradient"
        className={styles.listings_button}
        onClick={onViewListingsClick}
      >
        {strings.viewAllListings}
      </Button>
      <PolicyAndTermsAgreementModal isOpen={isOpen} onClose={onToggle} />
    </div>
  );
});
