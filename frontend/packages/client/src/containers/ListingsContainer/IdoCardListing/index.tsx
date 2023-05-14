import { Project } from "types";

import React, { memo, useCallback } from "react";
import cx from "classnames";
import { useDispatch, useSelector } from "react-redux";

import { keplrConnect } from "store/keplr/actionCreators";
import { strings } from "global";
import { selectKeplr } from "store/keplr/selectors";

import {
  Button,
  Image,
  Text,
  ProgressWithLabels,
} from "@project/libs/components";
import { arrowRightIcon, SpartaLogo } from "@project/libs/assets/images";
import * as secret from "api/secret/secret";

import styles from "./styles.module.scss";
import { toast } from "react-toastify";
import { isAdminApi, loginAdminApi } from "api/wallet";
import { TEST_CHAIN_ID } from "global/chaindId";

type IdoCardListingProps = {
  listingItem: Project;
  onJoinClick?: (id: string) => void;
};

export const IdoCardListing = memo<IdoCardListingProps>(
  ({ listingItem, onJoinClick }) => {
    const { address } = useSelector(selectKeplr);
    const dispatch = useDispatch();
    const {
      logoUrl,
      name,
      shortName,
      description,
      totalRize,
      participants,
      targetAmount,
      progress,
      id,
      price,
      button,
      buttonActive,
      connect,
      className,
      opacityClassName,
      spartaOpacityClassName,
      buttonTheme,
      softcap,
    } = listingItem;

    const onJoinButtonClick = useCallback(async () => {
      if (!address) {
        const balance = await secret.balance();
        if (balance < 70000) {
          toast.error("Please ensure that your balance is over 0.1 SCRT");
          return;
        }
        await secret.setViewingKey();
        // const keplrOfflineSigner =
        //   window.keplr.getOfflineSignerOnlyAmino(TEST_CHAIN_ID);
        // const [{ address: myAddress }] = await keplrOfflineSigner.getAccounts();
        // const isAdmin = await isAdminApi(myAddress);
        // if (isAdmin?.data) {
        //   const signatureKey = await secret.signature();
        //   const result = await loginAdminApi(
        //     myAddress,
        //     signatureKey.signature,
        //     signatureKey.pub_key.value
        //   );
        //   console.log({ result });
        // }
        dispatch(keplrConnect());
        return;
      }
      if (onJoinClick !== undefined) onJoinClick(id);
    }, [id, onJoinClick, dispatch, address]);

    return (
      <div className={cx(styles.listing_card_container, className)}>
        <div className={styles.listing_header}>
          <div className={styles.listing_image_container}>
            {logoUrl && (
              <Image
                className={cx(styles.listing_card_image, opacityClassName)}
                url={logoUrl}
              />
            )}
            <Image
              className={cx(
                styles.listing_currency_icon,
                spartaOpacityClassName
              )}
              url={SpartaLogo}
            />
          </div>
          <div
            className={cx(styles.listing_titles_container, opacityClassName)}
          >
            <Text className={cx(styles.listing_title, opacityClassName)}>
              {name}
            </Text>
            <Text className={cx(styles.listing_short_name, opacityClassName)}>
              {`$${shortName}`}
            </Text>
          </div>
          {!button && <div className={cx(styles.active_badge)} />}
          <Button
            theme={buttonTheme}
            className={cx(styles.active_button, opacityClassName)}
            disabled={!button}
          >
            {buttonActive}
          </Button>
        </div>
        <Text className={cx(styles.listing_description, opacityClassName)}>
          {description}
        </Text>
        <div className={cx(styles.table, opacityClassName)}>
          <div className={cx(styles.table_item, opacityClassName)}>
            <Text className={cx(styles.label, opacityClassName)} type="h3">
              {strings.targetAmount}
            </Text>
            <Text
              className={cx(styles.raise_value, opacityClassName)}
              type="h3"
            >
              {strings.TBA}
            </Text>
          </div>

          <div className={cx(styles.table_item, opacityClassName)}>
            <Text className={cx(styles.label, opacityClassName)} type="h3">
              {strings.participants}
            </Text>
            <Text
              className={cx(styles.participants_value, opacityClassName)}
              type="h3"
            >
              {strings.TBA}
            </Text>
          </div>

          <div className={cx(styles.table_item, opacityClassName)}>
            <Text className={cx(styles.label, opacityClassName)} type="h3">
              {strings.swapPrice}
            </Text>
            <Text
              className={cx(styles.participants_value, opacityClassName)}
              type="h3"
            >
              {strings.TBA}
            </Text>
          </div>
        </div>
        <ProgressWithLabels
          softcap={softcap}
          progress={progress}
          label="TBA"
          subLabel={totalRize}
          subValue={targetAmount}
          opacityClassName={opacityClassName}
        />
        {connect && (
          <Button
            theme="text"
            className={cx(styles.join_button, opacityClassName)}
            onClick={onJoinButtonClick}
          >
            <Text className={cx(styles.join_text, opacityClassName)}>
              {address ? "More" : strings.connect}
            </Text>
            <Image url={arrowRightIcon} />
          </Button>
        )}
      </div>
    );
  }
);
