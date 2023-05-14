/* eslint-disable react/jsx-no-useless-fragment */
import React, { forwardRef, memo, useMemo } from 'react';
import cx from 'classnames';

import { useHoverEvent } from '@project/libs/hooks';

import { Loader } from '../Loader';

import { ButtonProps, ButtonRef } from './types';

import styles from './styles.module.scss';

const Button = memo(
  forwardRef(
    (
      {
        theme = 'primary',
        gradientBackgroundColor,
        isBiggerText,
        isFullWidth,
        onClick,
        className,
        children,
        disabled,
        isLoading,
      }: ButtonProps,
      ref: ButtonRef,
    ) => {
      const { onMouseEnter, onMouseLeave } = useHoverEvent();

      const gradientBackgroundStyle = useMemo(
        () =>
          (gradientBackgroundColor !== undefined
            ? { backgroundColor: gradientBackgroundColor }
            : undefined),
        [gradientBackgroundColor],
      );

      const buttonContent = useMemo(() => {
        if (isLoading) {
          return <Loader />;
        }
        if (theme === 'gradient' && typeof children === 'string') {
          return (
            <div
              className={styles.gradient_background_layer}
              style={gradientBackgroundStyle}
            >
              <div className={styles.gradient_text}>{children}</div>
            </div>
          );
        }
        return <>{children}</>;
      }, [children, gradientBackgroundStyle, isLoading, theme]);

      return (
        <button
          ref={ref}
          type="button"
          className={cx(
            styles.button,
            styles[theme],
            {
              [styles.full_width]: isFullWidth,
              [styles.bigger_text]: isBiggerText,
              [styles.disabled]: disabled,
            },
            className,
          )}
          onClick={onClick}
          disabled={disabled || isLoading}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {buttonContent}
        </button>
      );
    },
  ),
);

export { Button };
