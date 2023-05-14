import React from 'react';

import { strings } from 'global';

import { Image, Text } from '@project/libs/components';
import { BlockChainLogo } from '@project/libs/assets/images';

import styles from './styles.module.scss';

export const YourStats = () => (
  <div className={styles.your_stats_container}>
    {' '}
    <div className={styles.your_stats_content}>
      <Text
        type="h2"
        className={styles.stats_title}
      >
        {strings.yourStats}
      </Text>

      <div className={styles.stats_container}>
        <div className={styles.staked}>
          <Text
            type="p"
            className={styles.staked_title}
          >
            {strings.staked}
          </Text>
          <Text
            type="p"
            className={styles.staked_description}
          >
            0000
            {' '}
            {strings.SCRT}
          </Text>
        </div>
        <div className={styles.rank}>
          <Text
            type="p"
            className={styles.rank_title}
          >
            {strings.TIER_rank}
          </Text>
          <Text
            type="p"
            className={styles.staked_description}
          >
            TIER 3
          </Text>
        </div>
        <div className={styles.tier}>
          <Text
            type="p"
            className={styles.tier_title}
          >
            {strings.NFT_tier}
          </Text>
          <Text
            type="p"
            className={styles.staked_description}
          >
            ACTIVE
          </Text>
        </div>
        <div className={styles.kyc}>
          <Text
            type="p"
            className={styles.kyc_title}
          >
            {strings.optional_kyc}
          </Text>
          <Text
            type="p"
            className={styles.staked_description}
          >
            ACTIVE
          </Text>
        </div>
      </div>
    </div>
    <div className={styles.stats_logo_container}>
      <Image
        url={BlockChainLogo}
        className={styles.stats_logo}
      />
    </div>
  </div>
);
