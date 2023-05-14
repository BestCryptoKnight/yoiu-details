import React, { memo, useCallback } from 'react';
import cx from 'classnames';

import styles from './styles.module.scss';

type CheckboxProps = {
  className?: string
  checkboxClassName?: string
  value: boolean
  onChange: (value: boolean) => void;
};

export const Checkbox = memo<CheckboxProps>(({
  onChange,
  value,
  className,
  checkboxClassName,
}) => {
  const onChangeHandler = useCallback(() => {
    onChange(!value);
  }, [onChange, value]);

  return (
    <button
      className={cx(styles.checkbox, className, { [styles.checked]: value })}
      onClick={onChangeHandler}
      type="button"
    >
      <span className={cx(styles.inner, checkboxClassName)} />
    </button>
  );
});
