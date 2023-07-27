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
          disabled={false}
          theme={buttonTheme}
          className={styles.active_button}
        >
          {/* {buttonActive} */}
          Soon
        </Button>
      </div>

      <ProgressWithLabels
        softcap={0}
        progress={0}
        label='Starts in TBA'
      />

      {/* <Text type="h4">
        <span className={styles.funded}>{totalRize}</span> of {targetAmount}{" "}
        {strings.funded}
      </Text> */}
      <Text type="h4">
        <span className={styles.funded}>0 SCRT </span> of X SCRT funded
      </Text>

      <div className={styles.table}>
        <div className={styles.table_item}>
          <Text className={styles.label} type="h3">
            {strings.targetAmount}
          </Text>
          <Text className={styles.amount} type="h3">
            TBA
          </Text>
        </div>

        <div className={styles.table_item}>
          <Text className={styles.label} type="h3">
            {strings.participants}
          </Text>
          <Text className={styles.swap_price} type="h3">
            0
          </Text>
        </div>

        <div className={styles.table_item}>
          <Text className={styles.label} type="h3">
            {strings.swapPrice}
          </Text>
          <Text className={styles.swap_price} type="h3">
            TBA
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
            12/24 hours after IDO ends
          </Text>
        </div>

        <div className={styles.table_item}>
          <Text className={styles.label} type="h3">
            Softcap
          </Text>
          <Text className={styles.swap_price} type="h3">
            TBA
          </Text>
        </div>

        <div className={styles.smart_contract_address}>
          <Text type="h3">Token contract address</Text>
        </div>
      </div>
    </div>
  );
});
