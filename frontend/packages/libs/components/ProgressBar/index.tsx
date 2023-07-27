import React, { memo, useMemo } from "react";
import cx from "classnames";

import styles from "./styles.module.scss";

type ProgressBarProps = {
  progress: number;
  softcap: number;
  className?: string;
};

export const ProgressBar = memo<ProgressBarProps>(
  ({ progress, className, softcap }) => {
    const progressWidth = useMemo(() => `${progress * 100}%`, [progress]);

    return (
      <div className={cx(styles.progress_bar_container, className)}>
        <div className={styles.softcap_bar}>
          <div
            className={cx(
              styles.audio_progress_handle,
              styles.tooltip,
              styles.step
            )}
            style={{ left: `${softcap}%` }}
          >
            <div className={styles.tooltiptext}>Softcap</div>
          </div>
        </div>
        <div className={styles.progress_bar} style={{ width: progressWidth }} />
      </div>
    );
  }
);
