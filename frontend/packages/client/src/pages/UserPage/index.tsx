import React, { FC, useState, useEffect, useMemo } from "react";
import { FAQ } from "components/FAQ";
import { getTier, getAllUserInfo, usdRate } from "api/secret/secret";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as dayjs from "dayjs";

import { selectKeplr } from "store/keplr/selectors";
import { StepsContainer } from "containers/StepsContainer";
import { UpgradeContainer } from "containers/UpgradeContainer";
import { RareNFT } from "containers/RareNFT";
import { NFTTierContainer } from "containers/NFTTierContainer";
import { UserStatsContainer } from "containers/UserStatsContainer";

import styles from "./styles.module.scss";
import { useModal } from "hooks";
import { updateTierApi } from "api/wallet";
import { toast } from "react-toastify";

export const UserPage: FC = () => {
  const [tier, setTier] = useState<string>("Determining...");
  const [minTier, setMinTier] = useState<number>(0);
  const [scrt, setScrt] = useState<number>(0);
  const [dollar, setDollar] = useState<number>(0);
  const [nftStatus, setNftStatus] = useState<boolean>(false);
  const [minNftTier, setMinNftTier] = useState<number>(0);
  const [rate, setRate] = useState(0);
  const [userInfos, setUserInfos] = useState<any[]>([]);
  const { address } = useSelector(selectKeplr);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSuccess, onSuccess] = useModal();
  const navigate = useNavigate();
  if (!address) {
    navigate("/");
  }

  useEffect(() => {
    (async () => {
      if (!window.keplr) {
        toast.error("Please install Keplr!");
        return;
      }
      if (window.location.hash === "#NFT") {
        const element = document.getElementById("NFT");
        element?.scrollIntoView();
      }
      const { userInfo, tier, nftTier } = await getTier();
      await updateTierApi(address, userInfo.user_info.tier.toString());
      const result = await getAllUserInfo();

      if (result) setUserInfos(result);
      const rate = await usdRate();
      setRate(rate);
      setTier(userInfo.user_info.tier.toString());
      setMinTier(tier);
      setMinNftTier(nftTier);
      setScrt(userInfo.user_info.scrt_deposit);
      const allocationSizes = [0, 25000, 7500, 1500, 250, 5];
      setDollar(allocationSizes[tier]);
      if (nftTier < 5) setNftStatus(true);
      setLoading(false);
    })();
  }, [address, tier, isSuccess]);

  const participants: any[] = useMemo(
    () =>
      userInfos.reduce((prev, cur, id) => {
        const temp: any = [...prev];
        let recvMinToken = 0;
        const timeArray = cur[2].map((each: any) => {
          return each.unlock_time;
        });
        const recvTimeMin = timeArray.length > 0 ? Math.min(...timeArray) : 0;
        const recvTimeMax = timeArray.length > 0 ? Math.max(...timeArray) : 0;
        const minTierArray = cur[2].filter((each: any) => {
          return each.unlock_time == recvTimeMin;
        });
        minTierArray.map((each: any) => {
          recvMinToken += Number(each?.tokens_amount);
        });
        if (cur[0].total_payment !== "0") {
          temp.push({
            id,
            invested: Number(cur[0].total_payment) / Math.pow(10, 6),
            purchased: Number(cur[0].total_tokens_bought) / Math.pow(10, 6),
            received: Number(cur[0].total_tokens_received) / Math.pow(10, 6),
            participantsAmount: cur[1].participants,
            startTime: dayjs.unix(cur[1].start_time).format("DD/MMM/YYYY"),
            endTime: cur[1].end_time,
            raise:
              Number(cur[1].total_tokens_amount) /
              (Number(cur[1].price) * Math.pow(10, 6)),
            high: cur[1].price,
            overSoftcap: Number(cur[1].soft_cap) <= Number(cur[1].sold_amount),
            recvTimeMin: recvTimeMin,
            recvTimeMax: recvTimeMax,
            recvMinToken: recvMinToken / Math.pow(10, 6),
          });
        }
        return temp;
      }, []),
    [userInfos]
  );

  return (
    <div className={styles.user_page_conatiner}>
      <UserStatsContainer
        tier={String(minTier)}
        scrt={scrt}
        dollar={dollar}
        nftStatus={nftStatus}
        loading={loading}
      />
      <UpgradeContainer
        tier={tier}
        setTier={(idx) => setTier(idx)}
        rate={rate}
        loading={loading}
      />
      <div id="NFT">
        <NFTTierContainer minNftTier={minNftTier} />
      </div>
      <RareNFT />
      <StepsContainer classNameTitle={styles.step_title} />
      <FAQ />
    </div>
  );
};
