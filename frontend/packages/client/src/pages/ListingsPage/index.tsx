import React, { FC, useEffect, useState } from "react";
import { getAllIDOInfo, getAllUserInfo } from "api/secret/secret";

import { ListingsContainer } from "containers/ListingsContainer";
import { StepsContainer } from "containers/StepsContainer";
import { SubscriptionContainer } from "containers/InputContainers/SubscriptionContainer";
import { ArchievedListingsContainer } from "containers/ArchievedListingsContainer";
import { StartupContainer } from "containers/StartupContainer";

import styles from "./styles.module.scss";
import { toast } from "react-toastify";

export type IDOInfo = {
  id: number;
  admin: string;
  start_time: number;
  end_time: number;
  participants: number;
  payment: any;
  price: string;
  shared_whitelist: boolean;
  sold_amount: string;
  token_contract: string;
  token_contract_hash: string;
  total_payment: string;
  total_tokens_amount: string;
  soft_cap: string;
  withdrawn: boolean;
  remaining_per_tiers: Array<string>;
};

export const ListingsPage: FC = () => {
  const [listings, setListings] = useState<IDOInfo[]>([]);
  const [fetchingListings, setFetching] = useState<boolean>(false);

  const archivedListing = listings.filter(
    (listing) => listing.end_time < new Date().getTime() / 1000
  );

  const nonArchivedListing = listings.filter(
    (listing) => listing.end_time >= new Date().getTime() / 1000
  );

  useEffect(() => {
    (async () => {
      setFetching(true);
      if (!window.keplr) {
        toast.error("Please install Keplr!");
      }
      const idoInfos = await getAllIDOInfo();
      setFetching(false);
      setListings(
        idoInfos.map((item, idx) => ({
          ...item,
          id: idx,
        }))
      );
    })();
  }, []);

  return (
    <div className={styles.listings_page_conatiner}>
      <ListingsContainer
        listings={nonArchivedListing}
        loading={fetchingListings}
      />
      <SubscriptionContainer />
      <StepsContainer />
      <StartupContainer />
    </div>
  );
};
