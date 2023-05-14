import React, { FC, useState } from 'react';
import cx from 'classnames';
import { SlideDown } from 'react-slidedown';

import 'react-slidedown/lib/slidedown.css';
import { Image, Text } from '@project/libs/components';
import { arrowIcon } from '@project/libs/assets/images';

import styles from './styles.module.scss';

export type AccardionProps = {
  title:string;
  description:any;
};

export const Accardion: FC<AccardionProps> = ({ title, description }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className={styles.accardion_container}
    >
      <div className={styles.accardion_title}>
        <Text type="h6">{title}</Text>
        <Image
          url={arrowIcon}
          className={cx(styles.arrow, { [styles.rotate]: isOpen })}
        />
      </div>
      <SlideDown className="my-dropdown-slidedown">
        {isOpen && (
        <div className={styles.accardion_description}>
          <Text type="p">{description}</Text>
        </div>
        )}
      </SlideDown>
    </button>
  );
};
