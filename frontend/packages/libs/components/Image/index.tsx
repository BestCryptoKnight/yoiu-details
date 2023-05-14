import React, { CSSProperties, forwardRef, LegacyRef } from "react";
import classNames from "classnames/bind";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

type ImageProps = {
  className?: string;
  url: string;
  sizes?: string;
  style?: CSSProperties;
};

const Image = forwardRef(
  (
    { className = "", url, sizes, style }: ImageProps,
    ref: LegacyRef<HTMLImageElement> | undefined
  ) => (
    <img
      ref={ref}
      style={style}
      sizes={sizes}
      loading="lazy"
      src={url}
      alt="fox"
      className={cx(styles.image, className)}
    />
  )
);

export { Image };
