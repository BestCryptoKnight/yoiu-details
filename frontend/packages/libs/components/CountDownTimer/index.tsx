import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import * as dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

type CountDownTimerProps = {
  remainingTime: number;
  onEnd: () => void;
};
const CountDownTimer = ({ remainingTime, onEnd }: CountDownTimerProps) => {
  const [timer, setTimer] = useState<number>(remainingTime);
  const [intervalId, setIntervalId] = useState<number>();

  const remainingTimeDayjs = dayjs.duration(timer, "seconds");
  const day = Math.floor(remainingTimeDayjs.asDays());
  const hours = remainingTimeDayjs.format("HH");
  const minutes = remainingTimeDayjs.format("mm");
  const seconds = remainingTimeDayjs.format("ss");

  useEffect(() => {
    setTimer(remainingTime);
    if (timer > 0) {
      setIntervalId(
        window.setInterval(() => setTimer((prev) => prev - 1), 1000)
      );
      return clearInterval(intervalId);
    }
  }, [remainingTime]);

  if (timer < 0) {
    clearInterval(intervalId);
    onEnd();
    return <></>;
  }

  return (
    <div className={styles.styles_gradient_background_layer}>
      <div className={styles.flex}>
        <div className={styles.time_component}>
          <div className={styles.time_text}>{day}</div>
          <p className={styles.desc_text}>DAYS</p>
        </div>
      </div>
      <p>:</p>
      <div className={styles.flex}>
        <div className={styles.time_component}>
          <div className={styles.time_text}>{hours}</div>
          <p className={styles.desc_text}>HOURS</p>
        </div>
      </div>
      <p>:</p>
      <div className={styles.flex}>
        <div className={styles.time_component}>
          <div className={styles.time_text}>{minutes}</div>
          <p className={styles.desc_text}>MINUTES</p>
        </div>
      </div>
      <p>:</p>
      <div className={styles.flex}>
        <div className={styles.time_component}>
          <div className={styles.time_text}>{seconds}</div>
          <p className={styles.desc_text}>SECONDS</p>
        </div>
      </div>
    </div>
  );
};

export { CountDownTimer };
