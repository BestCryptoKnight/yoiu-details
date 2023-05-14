import React, { memo } from 'react';
import RcSlider, { SliderProps } from 'rc-slider';
import cx from 'classnames';

import 'rc-slider/assets/index.css';
import { Color } from 'global';

import styles from './styles.module.scss';

export const Slider = memo<SliderProps>(({
  className,
  ...props
}) => (
  <RcSlider
    {...props}
    handleStyle={{
      backgroundColor: Color.purple,
      boxShadow: 'none',
    }}
    className={cx(styles.slider_input, className)}
  />
));
