import React, { memo, useCallback } from 'react';

import { strings } from 'global';

import { Button, Text } from '@project/libs/components';

import styles from './styles.module.scss';

export const StartupContainer = memo(() => {
  const onHereClick = useCallback(() => {
    window.open('https://jcb6ftgawwz.typeform.com/to/SeQzbLky');
  }, []);
  return (
    <div className={styles.startup_container}>
      <div className={styles.startup_content}>
        <Text
          className={styles.startup_title}
          type="h1"
        >
          {strings.areYouStartup}
        </Text>

        <Text
          className={styles.startup_description}
          type="h3"
        >
          {strings.areYouStartupLookingFor}
          <br />
          {strings.getStartesOnYOIU}
        </Text>
        <Button
          theme="primary"
          onClick={onHereClick}
          className={styles.startup_here_button}
        >
          {strings.applyNow}
        </Button>
      </div>
    </div>
  );
});
