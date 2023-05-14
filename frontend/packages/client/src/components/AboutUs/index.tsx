import React from 'react';

import { strings } from 'global';

import { Text } from '@project/libs/components';

import styles from './styles.module.scss';

export const AboutUs = () => (
  <div className={styles.about_us_container}>
    <div className={styles.about_us_content}>
      <Text
        type="h2"
        className={styles.about_us_title}
      >
        {strings.about_us}
      </Text>

      <div className={styles.about_us_description_container}>
        <Text
          type="h3"
          className={styles.description_text}
        >
          {strings.it_is_a_long}
        </Text>
        <Text
          type="h3"
          className={styles.description_text}
        >
          {strings.many_desktop}
        </Text>
        <Text
          type="h3"
          className={styles.description_text}
        >
          {strings.where_can}
        </Text>
      </div>
    </div>
  </div>
);
