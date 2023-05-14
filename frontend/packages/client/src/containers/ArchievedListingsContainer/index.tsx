import React, { memo, useMemo } from "react";
import { IDOInfo } from "pages/ListingsPage";

import { strings } from "global";

import { Text } from "@project/libs/components";
import { AcmeLogo, finalogo } from "@project/libs/assets/images";

import { ArchievedListingCard, IdoListingItem } from "./ArchievedListingCard";

import styles from "./styles.module.scss";

type Props = {
  archivedListing: IDOInfo[];
};

export const ArchievedListingsContainer = memo(({ archivedListing }: Props) => {
  const archievedListingItems: IdoListingItem[] = archivedListing.map(
    (listing) => ({
      ...listing,
      id: listing.id,
      name: "FINA",
      shortName: "FINA",
      description:
        "Fina VISA prepaid card allows you to connect with any wallet, top up with any cryptocurrency, through any crypto network, all with a single on-chain transaction",
      totalRize: Number(listing.total_tokens_amount),
      sold_amount: Number(listing.sold_amount),
      participants: listing.participants,
      progress:
        Number(listing.sold_amount) / Number(listing.total_tokens_amount),
      logoUrl: finalogo,
      end_time: listing.end_time,
      price: listing.price,
      softcap:
        (Number(listing.soft_cap) / Number(listing.total_tokens_amount)) * 100,
    })
  );

  return (
    <div className={styles.listings_container}>
      <div className={styles.listings_content}>
        <Text type="h2" className={styles.listings_title}>
          {strings.archievedListings}
        </Text>
        <div className={styles.listings_cards_list}>
          {archievedListingItems.map((idoListingItem: IdoListingItem, idx) => (
            <ArchievedListingCard listingItem={idoListingItem} key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
});
