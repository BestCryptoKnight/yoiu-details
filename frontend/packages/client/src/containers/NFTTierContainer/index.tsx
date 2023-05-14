/* eslint-disable no-console */

import React, { memo, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { strings } from "global";

import { Text } from "@project/libs/components";
import {
  LogoAngePasst,
  TIER1Small,
  TIER2Small,
  TIER3Small,
  TIER4Small,
  NFTtier1,
  NFTtier2,
  NFTtier3,
  NFTtier4,
} from "@project/libs/assets/images";

import { NFRTierCard, NFRTierCardProps } from "./NFTTIerCard";
import { breakPoints } from "./breakPoints";

import styles from "./styles.module.scss";

interface Props {
  minNftTier: number;
}

export const NFTTierContainer = memo<Props>(({ minNftTier }) => {
  const NFTTiersCardItems: NFRTierCardProps[] = useMemo(
    () => [
      {
        image: NFTtier4,
        leftBottomImage: TIER4Small,
        rightUpperImage: LogoAngePasst,
        nftTier: 4,
        cardTitle: "NFT Badge TIER 4",
        amount: "250",
      },
      {
        image: NFTtier3,
        leftBottomImage: TIER3Small,
        rightUpperImage: LogoAngePasst,
        nftTier: 3,
        cardTitle: "NFT Badge TIER 3",
        amount: "1500",
      },
      {
        image: NFTtier2,
        leftBottomImage: TIER2Small,
        rightUpperImage: LogoAngePasst,
        nftTier: 2,
        cardTitle: "NFT Badge TIER 2",
        amount: "7500",
      },
      {
        image: NFTtier1,
        leftBottomImage: TIER1Small,
        rightUpperImage: LogoAngePasst,
        nftTier: 1,
        cardTitle: "NFT Badge TIER 1",
        amount: "25000",
      },
    ],
    []
  );

  return (
    <div className={styles.tier_container}>
      <div className={styles.tier_content}>
        <Text type="h2" className={styles.nft_tier_cards_title}>
          {strings.nftTier}
        </Text>
        <div className={styles.nft_tier_cards_content}>
          <Swiper
            spaceBetween={15}
            slidesPerView={4}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
            breakpoints={breakPoints}
            modules={[Navigation]}
            navigation
            style={{ padding: "32px 0px" }}
          >
            {NFTTiersCardItems.map(
              ({
                image,
                cardTitle,
                amount,
                nftTier,
                leftBottomImage,
                rightUpperImage,
              }) => (
                <SwiperSlide
                  key={leftBottomImage}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <NFRTierCard
                    image={image}
                    amount={amount}
                    cardTitle={cardTitle}
                    leftBottomImage={leftBottomImage}
                    rightUpperImage={rightUpperImage}
                    selected={nftTier === minNftTier}
                  />
                </SwiperSlide>
              )
            )}
          </Swiper>
        </div>
      </div>
    </div>
  );
});
