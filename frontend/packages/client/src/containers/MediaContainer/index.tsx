/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import { Project } from "types";

import React, { memo, useMemo } from "react";
import cx from "classnames";

import { strings } from "global";

import { Text, Image } from "@project/libs/components";
import {
  clockIcon,
  socialIcon,
  websiteIcon,
} from "@project/libs/assets/images";

import styles from "./styles.module.scss";

interface Props {
  project: Project;
}

export const MediaContainer = memo<Props>((props: Props) => {
  const { project } = props;
  const icons = useMemo(
    () => [
      {
        iconUrl: clockIcon,
        title: strings.whitePaper,
        className: styles.alarm,
        url: project.whitePaper,
      },
      {
        iconUrl: socialIcon,
        title: strings.socialMedia,
        className: styles.cube,
        url: project.socialMedia,
      },
      {
        iconUrl: websiteIcon,
        title: strings.website,
        className: styles.clip,
        url: project.website,
      },
    ],
    []
  );

  return (
    <div className={styles.media_container}>
      {icons.map(({ iconUrl, title, className, url }) => (
        <div className={cx(styles.media_card, className)} key={title}>
          <Image url={iconUrl} className={styles.icon} />
          <Text type="h2" className={styles.title}>
            {title}
          </Text>
        </div>
      ))}
    </div>
  );
});
