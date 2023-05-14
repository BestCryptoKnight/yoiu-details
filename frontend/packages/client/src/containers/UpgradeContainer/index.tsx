import React, { memo, useCallback, useMemo, useEffect, useState } from "react";
import { claim, deposit, usdRate, withdraw } from "api/secret/secret";
import { useSelector } from "react-redux";
import {
  getTierApi,
  unbondTierApi,
  upgradeTierApi,
  withdrawApi,
} from "api/wallet";

import { PathName, strings } from "global";
import { useModal } from "hooks";
import { SuccessTierModal } from "containers/ProjectContainer/SuccessTierModal";
import { FailureModal } from "containers/ProjectContainer/FailureModal";
import { selectKeplr } from "store/keplr/selectors";

import { Text } from "@project/libs/components";

import { UpgradeCard, UpgradeCardItem } from "./UpgradeCard";

import styles from "./styles.module.scss";
import { formatSCRTFromUsd } from "utils";

interface Props {
  tier: string;
  rate: number;
  setTier: (idx: string) => void;
  loading: boolean;
}

export const UpgradeContainer = ({ tier, setTier, rate, loading }: Props) => {
  const { address } = useSelector(selectKeplr);
  const [isSuccessOpen, onSuccessToggle] = useModal();
  const [isFailureOpen, onFailureToggle] = useModal();
  const [isEndTime, onEndToggle] = useModal();
  const [tierStatus, setTierStatus] = useState<number[]>([0, 0, 0, 0]);
  const [text, setText] = useState("");
  const [remainTime, setRemainTime] = useState<any>([]);
  useEffect(() => {
    (async () => {
      const { data } = await getTierApi(address);
      setTierStatus(data[0]);
      setRemainTime(data[1]);
    })();
  }, [tier, address, isSuccessOpen, isEndTime]);

  const tierSCRT = [0, 25000, 7500, 1500, 250, 0];
  const getNeededSCRT = (amount: number) =>
    formatSCRTFromUsd(Math.max(amount - tierSCRT[Number(tier)], 0), rate);

  const upgradeCardItems: UpgradeCardItem[] = useMemo(
    () => [
      {
        title: "Tier 4",
        stake: loading
          ? "Loading Stake Value"
          : `Stake ${formatSCRTFromUsd(250, rate)} SCRT`,
        staked: `${getNeededSCRT(250)} SCRT to upgrade`,
        allocation: "250",
        unbonding: "21",
        freeze: "14",
        tierStatus: tierStatus[0],
      },
      {
        title: "Tier 3",
        stake: loading
          ? "Loading Stake Value"
          : `Stake ${formatSCRTFromUsd(1500, rate)} SCRT`,
        staked: `${getNeededSCRT(1500)} SCRT to upgrade`,
        allocation: "1500",
        unbonding: "21",
        freeze: "14",
        tierStatus: tierStatus[1],
      },
      {
        title: "Tier 2",
        stake: loading
          ? "Loading Stake Value"
          : `Stake ${formatSCRTFromUsd(7500, rate)} SCRT`,
        staked: `${getNeededSCRT(7500)} SCRT to upgrade`,
        allocation: "7500",
        unbonding: "21",
        freeze: "14",
        tierStatus: tierStatus[2],
      },
      {
        title: "Tier 1",
        stake: loading
          ? "Loading Stake Value"
          : `Stake ${formatSCRTFromUsd(25000, rate)} SCRT`,
        staked: `${getNeededSCRT(25000)} SCRT to upgrade`,
        allocation: "25000",
        unbonding: "21",
        freeze: "10",
        tierStatus: tierStatus[3],
      },
    ],
    [rate, tierStatus, loading]
  );

  const onGoClick = async (idx: number) => {
    const tierPerUsd = [250, 1500, 7500, 25000];
    let result = false;
    if (tierStatus[3 - idx] === 1) {
      result = (await withdraw()) as boolean;
      if (result) {
        setTierStatus((prev) => {
          const temp = [...prev];
          temp[3 - idx]++;
          return temp;
        });
        await unbondTierApi(address, Number(tier));
        setTier("5");
        setText("Unbond Time Initiated!");
      }
    } else if (tierStatus[3 - idx] === 2) {
      return;
    } else if (tierStatus[3 - idx] === 3) {
      result = (await claim()) as boolean;
      if (result) {
        setTierStatus((prev) => {
          const temp = [...prev];
          temp[3 - idx] = 0;
          return temp;
        });
        await withdrawApi(address, Number(tier));
        setText("Withdraw Successful!");
      }
    } else if (tierStatus[3 - idx] === 0) {
      const oldUsd = Number(tier) <= 4 ? tierPerUsd[4 - Number(tier)] : 0;
      result = await deposit(tierPerUsd[idx] - oldUsd);
      if (result) {
        await upgradeTierApi(address, 4 - idx, tierPerUsd[idx] - oldUsd);
        setTierStatus((prev) => {
          const temp = [...prev];
          temp[3 - idx]++;
          if (Number(tier) < 5 && temp[Number(tier) - 1] === 1)
            temp[Number(tier) - 1] === 0;
          return temp;
        });
        setTier((4 - idx).toString());
        setText("Tier successfully upgraded!");
      }
    }
    if (result === true) {
      onSuccessToggle();
    } else if (result === false) onFailureToggle();
  };

  // TierStatus: 0 for Go, 1, 2, 3 for Unbound, Unbound time, Withdraw
  const getDisabledStatus = useCallback(
    (idx: number) => {
      if (Number(tier) >= 4 - idx) {
        return tierStatus[3 - idx] === 2;
      } else return tierStatus[3 - idx] !== 3;
    },
    [tier, tierStatus]
  );

  const getRemainingTime = (tier: number) => {
    const remainingTime = remainTime.find((each: any) => each.unbond === tier);
    return remainingTime ? remainingTime.remainTime : -1;
  };

  return (
    <>
      <div className={styles.upgrade_container}>
        <div className={styles.upgrade_content}>
          <Text type="h2" className={styles.upgrade_title}>
            {strings.upgrade_title}
          </Text>
          <Text type="p" className={styles.caption}>
            No guaranteed allocation. 0% APY on staking.{" "}
          </Text>
          <div className={styles.upgrade_content_cards}>
            {upgradeCardItems.map((upgradeCardItem, idx) => (
              <UpgradeCard
                tier={tier}
                disabledStatus={getDisabledStatus(idx)}
                status={tierStatus[3 - idx]}
                upgradeItem={upgradeCardItem}
                key={idx}
                onGoClick={() => onGoClick(idx)}
                remainTime={getRemainingTime(4 - idx)}
                onEndToggle={onEndToggle}
              />
            ))}
          </div>
        </div>
      </div>
      <SuccessTierModal
        text={text}
        isOpen={isSuccessOpen}
        onClose={onSuccessToggle}
      />
      <FailureModal isOpen={isFailureOpen} onClose={onFailureToggle} />
    </>
  );
};
