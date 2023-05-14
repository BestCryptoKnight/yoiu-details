import React from 'react';
import cx from 'classnames';

import styles from './styles.module.scss';

interface Props {
  label: string
  color?: 'green' | 'gray' | 'purple' | 'blue'
}

export const Status = (props: Props) => {
  const { label, color = 'gray' } = props;

  return <div className={cx(styles[color], styles.status)}>{label}</div>;
};
