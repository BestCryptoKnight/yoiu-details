import React, { memo } from "react";
import cx from "classnames";

import { Text, ProgressBar } from "@project/libs/components";

import styles from "./styles.module.scss";

type ProgressWithLabelsProps = {
  progress: number;
  label?: string;
  subLabel?: string;
  subValue?: string;
  className?: string;
  classNameBar?: string;
  classNameProgressText?: string;
  opacityClassName?: string;
  softcap?: number;
};

export const ProgressWithLabels = memo<ProgressWithLabelsProps>(
  ({
    progress,
    label,
    subLabel,
    subValue,
    className,
    classNameBar,
    classNameProgressText,
    opacityClassName,
    softcap,
  }) => (
    <div
      className={cx(styles.progres_bar_container, className, opacityClassName)}
    >
      <div className={cx(styles.label_line, opacityClassName)}>
        {label !== undefined && (
          <Text
            className={cx(styles.top_text, styles.top_label, opacityClassName)}
          >
            {label}
          </Text>
        )}
        <Text
          className={cx(
            styles.top_text,
            classNameProgressText,
            opacityClassName
          )}
        >
          {`${(progress * 100).toFixed(2)}%`}
        </Text>
      </div>
      <ProgressBar
        className={cx(styles.progress_bar, classNameBar, opacityClassName)}
        progress={progress}
        softcap={softcap}
      />
      <div className={cx(styles.label_line, opacityClassName)}>
        {subLabel !== undefined && (
          <Text className={cx(styles.bottom_text, opacityClassName)}>
            {subLabel}
          </Text>
        )}
        {subValue !== undefined && (
          <Text className={cx(styles.bottom_text, opacityClassName)}>
            {subValue}
          </Text>
        )}
      </div>
    </div>
  )
);
