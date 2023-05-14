import React, { memo, useCallback, useMemo } from "react";
import cx from "classnames";
import { useNavigate } from "react-router-dom";
import { PolicyAndTermsAgreementModal } from "components/PolicyAndTermsAgreementModal";
import { ConnectionModal } from "components/ConnectionModal";
import { useSelector } from "react-redux";

import { useModal, useUserAggreement } from "hooks";
import { Color, PathName, strings } from "global";
import { selectKeplr } from "store/keplr/selectors";

import { Button, Image, Text } from "@project/libs/components";
import {
  btcImage,
  joystick2Image,
  keyImage,
} from "@project/libs/assets/images";

import styles from "./styles.module.scss";

type Card = {
  imageUrl: string;
  title: string;
  description: string;
  buttonName: string;
  onButtonClick: () => void;
  isSmallerTextPart?: boolean;
};

export const GridContainer = memo(() => {
  const [conenctionModal, setConenctionModal] = React.useState<boolean>(false);
  const [agreed] = useUserAggreement("yoiu-agreement");

  const [isOpen, onToggle] = useModal();
  const { address } = useSelector(selectKeplr);
  const navigate = useNavigate();

  const handleListingClick = useCallback(() => {
    if (agreed) {
      navigate(PathName.listings);
      return;
    }
    onToggle();
  }, [onToggle, agreed, navigate]);

  const handleChekItOutClick = useCallback(() => {
    if (!address) {
      setConenctionModal(true);
      return;
    }
    if (agreed) {
      navigate(PathName.user + "#NFT");
      return;
    }
    onToggle();
  }, [onToggle, agreed, navigate, address]);

  const navigateToReferenceLink = useCallback(
    () =>
      window.open(
        "https://medium.com/@yoiu/yoiu-a-gateway-to-the-future-of-blockchain-f06d636eefc6"
      ),
    []
  );

  const onCloseConnectionModal = () => {
    setConenctionModal(false);
  };

  const cards: Card[] = useMemo(
    () => [
      {
        imageUrl: btcImage,
        title: strings.earlyAdoptionMadeEasy,
        description: strings.beInvolvedInTheMetaverse,
        buttonName: strings.listingItems,
        onButtonClick: handleListingClick,
      },
      {
        imageUrl: keyImage,
        title: strings.weTakeTheOwnershipToTheNextLevel,
        description: strings.useYourNFTsAsGateaway,
        buttonName: strings.checkItOut,
        onButtonClick: handleChekItOutClick,
      },
      {
        imageUrl: joystick2Image,
        title: strings.proofOfPassionPoP,
        description: strings.youAreJustStarting,
        buttonName: strings.yoiuNfts,
        onButtonClick: navigateToReferenceLink,
        isSmallerTextPart: true,
      },
    ],
    [navigateToReferenceLink, handleListingClick, handleChekItOutClick]
  );

  const renderCard = useCallback((card: Card, index: number) => {
    const {
      imageUrl,
      title,
      description,
      buttonName,
      onButtonClick,
      isSmallerTextPart,
    } = card;

    const isOdd = index % 2;

    return (
      <div
        key={index}
        className={cx(styles.grid_content_wrapper, {
          [styles.grid_content_wrapper_odd]: isOdd,
        })}
      >
        <div
          className={cx(styles.grid_content, {
            [styles.grid_content_odd]: isOdd,
          })}
        >
          <div className={styles.grid_image_part}>
            <Image url={imageUrl} className={styles.image} />
          </div>
          <div
            className={cx(styles.grid_text_part, {
              [styles.grid_text_part_smaller]: isSmallerTextPart,
            })}
          >
            <Text className={styles.grid_title} type="h2">
              {title}
            </Text>

            <Text className={styles.grid_description} type="h3">
              {description}
            </Text>
            <Button
              theme="gradient"
              onClick={onButtonClick}
              className={styles.grid_button}
              gradientBackgroundColor={isOdd ? Color.white : Color.white2}
            >
              {buttonName}
            </Button>
          </div>
        </div>
      </div>
    );
  }, []);

  return (
    <div className={styles.grid_container}>
      {cards.map((card, index) => renderCard(card, index))}
      <PolicyAndTermsAgreementModal isOpen={isOpen} onClose={onToggle} />
      <ConnectionModal
        isOpen={conenctionModal}
        onClose={onCloseConnectionModal}
      />
    </div>
  );
});
