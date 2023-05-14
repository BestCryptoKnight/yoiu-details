import React, { memo, useCallback, useEffect, useState } from "react";
import * as dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { Color, strings } from "global";

import {
  Button,
  Loader,
  Text,
  Modal,
  CountDownTimer,
} from "@project/libs/components";

import styles from "./styles.module.scss";

export type UpgradeCardItem = {
  title: string;
  stake: string;
  staked: string;
  allocation: string;
  unbonding: string;
  tierStatus: number;
  freeze: string;
};

type UpgradeCardItemProps = {
  tier: string;
  upgradeItem: UpgradeCardItem;
  status: number;
  disabledStatus: boolean;
  onGoClick: () => void;
  remainTime: number;
  onEndToggle: () => void;
};
dayjs.extend(duration);

export const UpgradeCard = ({
  tier,
  upgradeItem,
  onGoClick,
  status,
  disabledStatus,
  remainTime,
  onEndToggle,
}: UpgradeCardItemProps) => {
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { allocation, freeze, stake, title, unbonding, staked } = upgradeItem;
  const buttonStatus = [
    "Go",
    "Unbond",
    <CountDownTimer remainingTime={remainTime} onEnd={onEndToggle} />,
    "Withdraw",
  ];

  const onGoButtonClick = async () => {
    if (status === 1) {
      setDialogOpen(true);
      return;
    }
    setLoading(true);
    await onGoClick();
    setLoading(false);
  };

  const onUnbondClick = async () => {
    setDialogOpen(false);
    setLoading(true);
    await onGoClick();
    setLoading(false);
  };

  return (
    <>
      <div className={styles.upgrade_card_container}>
        <Text type="h3" className={styles.upgrade_card_title}>
          {title}
        </Text>
        <ul className={styles.upgrade_description_part_1}>
          <li className={styles.upgrade_description_li}>{stake}</li>
          <li className={styles.upgrade_description_li}>{staked}</li>
          <li>
            {strings.allocation}${allocation}
          </li>
        </ul>
        <ul className={styles.upgrade_description_part_2}>
          <li className={styles.upgrade_description_li}>
            {unbonding}
            {strings.unbording}
          </li>
          <li>
            {freeze}
            {strings.freeze}
          </li>
        </ul>
        <Button
          disabled
          className={styles.go_button}
          theme={status !== 1 ? "gradient" : "outline"}
          gradientBackgroundColor={Color.white3}
          onClick={onGoButtonClick}
        >
          {loading ? <Loader size={60} /> : buttonStatus[status]}
        </Button>
      </div>
      <Modal
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        className={styles.success_modal}
      >
        <div className={styles.success_content}>
          <div className={styles.labels_container}>
            <Text type="h2" className={styles.labels_notification}>
              Do you confirm unbonding from this tier?
            </Text>
            <Text type="p" className={styles.labels_notification}>
              You won't be able to withdraw your stakings until 21 days later.
            </Text>
            {tier === "1" && (
              <Text
                type="p"
                className={styles.labels_notification}
                style={{ marginTop: "-20px" }}
              >
                You will lose privilege of getting reward tokens in 10 days.
              </Text>
            )}
          </div>
          <div className={styles.button_container}>
            <Button
              className={styles.button_style}
              theme={status !== 1 ? "gradient" : "outline"}
              gradientBackgroundColor={Color.white3}
              onClick={onUnbondClick}
            >
              Yes
            </Button>
            <Button
              className={styles.button_style}
              theme={status !== 1 ? "gradient" : "outline"}
              gradientBackgroundColor={Color.white3}
              onClick={() => setDialogOpen(false)}
            >
              No
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
// );
