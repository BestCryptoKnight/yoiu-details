import React, { useEffect, useState, memo } from "react";
import { getTier } from "api/secret/secret";

import { strings } from "global";

import { Text, Status, DotLoader } from "@project/libs/components";

import styles from "./styles.module.scss";

interface Props {
  tier: string;
  scrt: number;
  dollar: number;
  nftStatus: boolean;
  loading: boolean;
}

export const UserStatsContainer = ({
  tier,
  scrt,
  dollar,
  nftStatus,
  loading,
}: Props) => {
  return (
    <div className={styles.stats_container}>
      <div className={styles.stats_content}>
        <Text type="h2" className={styles.stats_title}>
          {strings.yourStats}
        </Text>
        <div className={styles.box_container}>
          <div className={styles.box_content}>
            <div>
              {loading ? (
                <DotLoader />
              ) : (
                <Text type="h3">{`${
                  tier === "5" ? "5 (Default)" : tier
                }`}</Text>
              )}
              <Text>TIER rank</Text>
            </div>
            <div>
              {loading ? (
                <DotLoader />
              ) : (
                <Text type="h3">{Math.ceil(scrt / Math.pow(10, 6))} SCRT</Text>
              )}
              <Text>Amount Staked</Text>
            </div>
            <div>
              {loading ? <DotLoader /> : <Text type="h3">${dollar}</Text>}
              <Text>Potential Allocation Size</Text>
            </div>
            <div>
              {loading ? (
                <DotLoader />
              ) : (
                <Text type="h3">{nftStatus ? "Active" : "Inactive"}</Text>
              )}
              <Text>NFT TIER</Text>
            </div>
            {/* <div>
              <div className={styles.status}>
                <Status label="KYC" color="purple" />
                <span>/</span>
                <Status label="KYC" color="green" />
              </div>
              <Text>KYC</Text>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
