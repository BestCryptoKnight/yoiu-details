import { Project } from "types";

import React, { memo } from "react";

import { strings } from "global";
import { formatTimeStampToMonthAndYear } from "utils";

import {
  Text,
  ProgressWithLabels,
  Image,
  Button,
} from "@project/libs/components";
import {
  projectGradientBackgroundImage,
  SpartaLogo,
} from "@project/libs/assets/images";

import styles from "./styles.module.scss";

export type ProjectItem = {
  logoUrl?: string;
  slogan?: string;
  name: string;
  shortName: string;
  description: string;
  totalRize: number;
  participants: number;
  progress: number;
  id: string;
};

type ProjectCardProps = {
  project: Project;
};

export const ProjectCard = memo<ProjectCardProps>((props: ProjectCardProps) => {
  const {
    name,
    shortName,
    totalRize,
    targetAmount,
    progress,
    softcap,
    logoUrl,
    participants,
    end_time,
    buttonTheme,
    price,
    vestingSchedule,
    button,
    buttonActive,
    contractAddress,
  } = props.project;
  console.log(props.project);

  return (
    <div className={styles.project_card_container}>
      <Image
        url={projectGradientBackgroundImage}
        className={styles.backgroundImage}
      />

      <div className={styles.listing_header}>
        <div className={styles.listing_image_container}>
          {logoUrl && (
            <Image className={styles.listing_card_image} url={logoUrl} />
          )}
          <Image className={styles.listing_currency_icon} url={SpartaLogo} />
        </div>
        <div className={styles.listing_titles_container}>
          <Text className={styles.listing_title}>{name}</Text>
          <Text className={styles.listing_short_name}>{`$${shortName}`}</Text>
        </div>
        {!button && <div className={styles.active_badge} />}
        <Button
          disabled={!button}
          theme={buttonTheme}
          className={styles.active_button}
        >
          {buttonActive}
        </Button>
      </div>

      <ProgressWithLabels
        softcap={softcap}
        progress={progress}
        label={`Ends in ${formatTimeStampToMonthAndYear(end_time)}`}
      />

      <Text type="h4">
        <span className={styles.funded}>{totalRize}</span> of {targetAmount}{" "}
        {strings.funded}
      </Text>

      <div className={styles.table}>
        <div className={styles.table_item}>
          <Text className={styles.label} type="h3">
            {strings.targetAmount}
          </Text>
          <Text className={styles.amount} type="h3">
            {targetAmount}
          </Text>
        </div>

        <div className={styles.table_item}>
          <Text className={styles.label} type="h3">
            {strings.participants}
          </Text>
          <Text className={styles.swap_price} type="h3">
            {participants}
          </Text>
        </div>

        <div className={styles.table_item}>
          <Text className={styles.label} type="h3">
            {strings.swapPrice}
          </Text>
          <Text className={styles.swap_price} type="h3">
            1 SCRT = {price} {shortName}
          </Text>
        </div>

        <div className={styles.table_item}>
          <Text className={styles.label} type="h3">
            {strings.vestingSchedule}
          </Text>
          <Text className={styles.swap_price} type="h3">
            Yes - Check down below
          </Text>
        </div>

        <div className={styles.table_item}>
          <Text className={styles.label} type="h3">
            Token Frozen Until
          </Text>
          <Text className={styles.swap_price} type="h3">
            T5-2: 12h. T1 Immediately
          </Text>
        </div>

        <div className={styles.table_item}>
          <Text className={styles.label} type="h3">
            Softcap
          </Text>
          <Text className={styles.swap_price} type="h3">
            {`${softcap}%`}
          </Text>
        </div>

        <div className={styles.smart_contract_address}>
          <Text type="h3">Token contract address</Text>
          <Text type="p">{contractAddress}</Text>
        </div>
      </div>
    </div>
  );
});
