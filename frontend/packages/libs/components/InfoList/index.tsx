import React, { memo, ReactNode } from 'react';
import cx from 'classnames';

import { Text, Image, ProgressBar } from '@project/libs/components';

import styles from './styles.module.scss';

export type InfoItem = {
  label: string;
  value: string | ReactNode;
  icon?: string;
  progress?: number;
};

type InfoListProps = {
  items: InfoItem[]
};

export const InfoList = memo<InfoListProps>(({
  items,
}) => (
  <div className={styles.info_list_wrapper}>
    {items.map(({
      label,
      value,
      icon,
      progress,
    }) => (
      <div
        className={styles.info_item_container}
        key={label}
      >
        <div
          key={label}
          className={cx(styles.info_item)}
        >
          <Text className={styles.info_label}>{label}</Text>
          {icon !== undefined && (
          <Image
            url={icon}
          />
          )}
          <Text className={styles.info_value}>{value}</Text>
        </div>
        {progress !== undefined ? (
          <ProgressBar
            className={styles.progress_bar}
            progress={progress}
          />
        ) : <div className={styles.separator} />}

      </div>
    ))}
  </div>
));
