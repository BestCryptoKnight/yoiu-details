import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames';

import { strings } from 'global';
import { selectKeplr } from 'store/keplr/selectors';
import { shortenPhrase } from 'utils';

import {
  Text, Button, Image,
} from '@project/libs/components';
import { AvatarImage } from '@project/libs/assets/images';

import styles from './style.module.scss';

type Props = {
  isOpen: boolean

  onDisconnect: () => void
  isImageBlue?: boolean
};

export const DisconnectWalletModal = memo<Props>(
  ({ onDisconnect, isOpen }) => {
    const { address } = useSelector(selectKeplr);

    if (isOpen) {
      return (
        <div className={cx(styles.disconnect_modal)}>
          <Image
            url={AvatarImage}
            className={styles.button_logo}
          />
          <Text
            type="p"
            className={styles.disconnect_modal_title}
          >
            {shortenPhrase(address)}
          </Text>
          <Button
            className={styles.disconnect_modal_disconnect_button}
            onClick={onDisconnect}
            theme="secondary"
          >
            {strings.disconnect}
          </Button>
        </div>
      );
    }
    return null;
  },
);
