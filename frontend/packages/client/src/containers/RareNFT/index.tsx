import React, { memo } from "react";

import { Button, Image, Text } from "@project/libs/components";
import { rareNfts } from "@project/libs/assets/images";

import styles from "./styles.module.scss";

export const RareNFT = memo(() => (
  <div className={styles.rare_container}>
    <div className={styles.rare_content}>
      <Text type="h2" className={styles.rare_title}>
        Who is eligible for a YOIU NFT Badge Airdrop?
      </Text>

      <div className={styles.rare_content_description}>
        <Image className={styles.rare_image} url={rareNfts} />
        <div className={styles.rare_description_container}>
          <div>
            <Text className={styles.rare_description_header_title}>
              Owners of a rare NFT collection
            </Text>

            <Text type="p" className={styles.text}>
              If you own a rare NFT, you are eligible for our YOIU NFT - Badge
              Airdrop. Holders of a YOIU NFT Badge have the chance to get
              whitelisted by startups. <br /> <br />
              Apply with a rare NFT and receive up to 3 YOIU NFTs.
            </Text>
            <a
              href="https://jcb6ftgawwz.typeform.com/to/I1UwpRjj"
              target="_blank"
              rel="noreferrer"
            >
              <Button className={styles.rare_button}>Apply</Button>
            </a>
          </div>
          <div>
            <Text className={styles.rare_description_header_title}>
              PoP Protocol Winners
            </Text>
            <Text type="p" className={styles.text}>
              Everyone who is passionate about YOIU can join our Proof of
              Passion (PoP) protocol. We will have many incentives and
              challenges where users can grind their way up and earn one or
              multiple YOIU NFTs. Learn more about{" "}
              <a
                href="https://docs.yoiu.io/yoiu/proof-of-passion-protocol"
                target="_blank"
                rel="noreferrer"
              >
                PoP
              </a>
              .
            </Text>
          </div>
        </div>
      </div>
    </div>
  </div>
));
