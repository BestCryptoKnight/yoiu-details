import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import { PathName } from 'global';

import { Text, Image } from '@project/libs/components';
import { ball, twitterIcon, logoBlue } from '@project/libs/assets/images';

import { links } from './links';

import styles from './styles.module.scss';

export const Footer = memo(() => (
  <div className={styles.footer_container}>
    <div className={styles.footer_content}>
      <div className={styles.logo}>
        <Link to={PathName.home}>
          <Image
            url={logoBlue}
            className={styles.header_logo}
          />
        </Link>
        <Text
          type="p"
          className={styles.footer_all_rights}
        >
          © YOIU 2023. All Rights Reserved.
        </Text>
      </div>

      <div className={styles.footer_icons_container}>
        <a
          href={links.twitter}
          target="_blank"
          rel="noreferrer"
        >
          <Image url={twitterIcon} />
        </a>
        <a
          href={links.ball}
          target="_blank"
          rel="noreferrer"
        >
          <Image url={ball} />
        </a>
      </div>
      <div className={styles.links}>
        <a
          href="https://docs.yoiu.io/yoiu/privacy-policy"
          target="_blank"
          rel="noreferrer"
        >
          Privacy Policy
        </a>
        <a
          href="https://docs.yoiu.io/yoiu/terms-and-conditions"
          target="_blank"
          rel="noreferrer"
        >
          Terms & Conditions
        </a>
        <a
          href="https://docs.yoiu.io"
          target="_blank"
          rel="noreferrer"
        >
          Docs
        </a>
      </div>
    </div>
  </div>
));
