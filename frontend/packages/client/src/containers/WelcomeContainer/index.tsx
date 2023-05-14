import React, { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PolicyAndTermsAgreementModal } from 'components/PolicyAndTermsAgreementModal';

import { PathName, strings } from 'global';
import { useModal, useUserAggreement } from 'hooks';

import { Button, Image, Text } from '@project/libs/components';
import { cubesImage } from '@project/libs/assets/images';

import styles from './styles.module.scss';

export const WelcomeContainer = memo(() => {
  const [isOpen, onToggle] = useModal();
  const [agreed] = useUserAggreement('yoiu-agreement');
  const navigate = useNavigate();

  const onLaunchClick = useCallback(() => {
    if (agreed) {
      navigate(PathName.listings);
      return;
    }
    onToggle();
  }, [onToggle, navigate, agreed]);

  return (
    <div className={styles.welcome_container}>
      <div className={styles.welcome_content}>
        <div className={styles.welcome_left_part}>
          <div className={styles.welcome_left_part_text}>
            <Text
              className="text-2xl text-white text-bold"
              type="h1"
            >
              {strings.YOIUaGatewayBlockchain}
            </Text>
            <Text
              className={styles.welcome_subtitle}
              type="h2"
            >
              {strings.fueledBySCRT}
            </Text>

            <Text
              className={styles.welcome_description}
              type="h3"
            >
              {strings.thePlatformWhereEarlyAdopters}
            </Text>
          </div>

          <Button
            theme="primary"
            onClick={onLaunchClick}
            className={styles.welcome_join_button}
          >
            {strings.launchApp}
          </Button>
        </div>
        <div className={styles.welcome_right_part}>
          <Image
            url={cubesImage}
            className={styles.cubes}
          />
        </div>
      </div>
      <PolicyAndTermsAgreementModal
        isOpen={isOpen}
        onClose={onToggle}
      />
    </div>
  );
});
