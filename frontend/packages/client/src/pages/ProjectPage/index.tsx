import { Project } from "types";

import React, { FC, useState, useEffect } from "react";
import { Pitchdeck } from "components/Pitchdeck";
import { finalogo, finaCard } from "@project/libs/assets/images";
import { toast } from "react-toastify";
import { Loader, Text } from "@project/libs/components";

import { ProjectContainer } from "containers/ProjectContainer";
import { TokenEconomicsContainer } from "containers/TokenEconomicsContainer";
import { MediaContainer } from "containers/MediaContainer";
import { NotifyMeContainer } from "containers/InputContainers/NotifyMeContainer";
import {
  pitch_1,
  pitch_2,
  pitch_3,
  pitch_4,
  pitch_5,
  pitch_6,
  pitch_7,
  pitch_8,
  pitch_9,
  pitch_10,
  pitch_11,
  pitch_12,
  pitch_13,
  pitch_14,
  pitch_15,
  pitch_16,
  pitch_17,
} from "@project/libs/assets/images/Fina-pitchdeck";
import styles from "./styles.module.scss";
import { getIDOInfo } from "api/secret/secret";
import { useSelector } from "react-redux";
import { selectKeplr } from "store/keplr/selectors";

export const ProjectPage: FC = () => {
  const { address } = useSelector(selectKeplr);
  const statsAt = 0,
    end_time = 0;
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState<Project>({
    name: "FINA",
    shortName: "FINA",
    description:
      "Fina VISA Prepaid Card, top up with any cryptocurrency, through any crypto network, all with a single on-chain transaction",
    slogan: "FINA - Web3 VISA Prepaid Card.",
    totalRize: `6 SCRT`,
    price: "0",
    targetAmount: `12000 SCRT`,
    participants: 0,
    progress: 0,
    softcap: 30,
    remaining_per_tiers: [],
    end_time: 0,
    statsAt: 0,
    vestingSchedule: "5% at TGE, 6 months lock-up, 12 months linear vesting.",
    logoUrl: finalogo,
    imageUrl: finaCard,
    id: "1",
    button:
      statsAt < new Date().getTime() / 1000 &&
      end_time > new Date().getTime() / 1000,
    buttonActive:
      end_time > new Date().getTime() / 1000
        ? statsAt < new Date().getTime() / 1000
          ? "Active"
          : "Soon"
        : "Ended",
    connect: true,
    buttonTheme: "secondary",
    socialMedia: "https://twitter.com/FinaCash",
    whitePaper:
      "https://docs.google.com/document/d/1ALZCtjaRuFS-mfddl5eutwr5ZjYCBKy0lI-6UHiOhhc/edit",
    website: "https://fina.cash/",
    contractAddress: "",
    pitchdeck: [
      pitch_1,
      pitch_2,
      pitch_3,
      pitch_4,
      pitch_5,
      pitch_6,
      pitch_7,
      pitch_8,
      pitch_9,
      pitch_10,
      pitch_11,
      pitch_12,
      pitch_13,
      pitch_14,
      pitch_15,
      pitch_16,
      pitch_17,
    ],
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (!window.keplr) {
        toast.error("Please install Keplr!");
      }
      const listing = await getIDOInfo();
      const {
        // eslint-disable-next-line
        id,
        total_tokens_amount: totalTokenAmount,
        soft_cap,
        sold_amount,
        total_payment,
        participants,
        price,
        end_time,
        remaining_per_tiers,
        start_time: statsAt,
        token_contract: contractAddress,
      } = listing;

      const progress = Number(totalTokenAmount)
        ? Number(sold_amount) / Number(totalTokenAmount)
        : 0;
      setProject({
        name: "FINA",
        shortName: "FINA",
        description:
          "Fina VISA Prepaid Card, top up with any cryptocurrency, through any crypto network, all with a single on-chain transaction",
        slogan: "FINA - Web3 VISA Prepaid Card.",
        totalRize: `${Number(total_payment) / Math.pow(10, 6)} SCRT`,
        price,
        targetAmount: `${Math.ceil(
          Number(totalTokenAmount) / (Math.pow(10, 6) * Number(price))
        )} SCRT`,
        participants,
        progress,
        softcap: (Number(soft_cap) / Number(totalTokenAmount)) * 100,
        remaining_per_tiers,
        end_time,
        statsAt,
        vestingSchedule:
          "5% at TGE, 6 months lock-up, 12 months linear vesting.",
        logoUrl: finalogo,
        imageUrl: finaCard,
        id: String(id),
        button:
          statsAt < new Date().getTime() / 1000 &&
          end_time > new Date().getTime() / 1000,
        buttonActive:
          end_time > new Date().getTime() / 1000
            ? statsAt < new Date().getTime() / 1000
              ? "Active"
              : "Soon"
            : "Ended",
        connect: true,
        buttonTheme: "secondary",
        socialMedia: "https://twitter.com/FinaCash",
        whitePaper:
          "https://docs.google.com/document/d/1ALZCtjaRuFS-mfddl5eutwr5ZjYCBKy0lI-6UHiOhhc/edit",
        website: "https://fina.cash/",
        contractAddress,
        pitchdeck: [
          pitch_1,
          pitch_2,
          pitch_3,
          pitch_4,
          pitch_5,
          pitch_6,
          pitch_7,
          pitch_8,
          pitch_9,
          pitch_10,
          pitch_11,
          pitch_12,
          pitch_13,
          pitch_14,
          pitch_15,
          pitch_16,
          pitch_17,
        ],
      });
      setLoading(false);
    })();
  }, []);

  return !address ? (
    <div className={styles.loading_screen}>
      <Loader size={100} />
      <Text type="h2">Please ensure that your wallet is connected</Text>
    </div>
  ) : (
    <div className={styles.project_page_conatiner}>
      <ProjectContainer project={project} />
      <NotifyMeContainer projectId={project.id} />
      <TokenEconomicsContainer project={project} />
      <MediaContainer project={project} />
      <Pitchdeck slides={project.pitchdeck} />
    </div>
  );
};
