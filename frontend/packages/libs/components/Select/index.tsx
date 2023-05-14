import React, { useCallback } from 'react';
import SelectInput, { OnChangeValue } from 'react-select';
import cx from 'classnames';

import { customStyles } from './customStyles';
import { SelectProps, SelectOption } from './types';

import styles from './styles.module.scss';

const Select = <T extends number | string>({
  label,
  className,
  onChange,
  value,
  placeHolder,
  options,
}:SelectProps<T>) => {
  const onHandlerChange = useCallback(
    (option: OnChangeValue<SelectOption<T>, false>) => {
      if (option !== null) {
        onChange(option);
      }
    },
    [onChange],
  );
  return (

    <div className={cx(styles.select_container, className)}>
      <div className={styles.select_container_title}>{label}</div>
      <SelectInput
        onChange={onHandlerChange}
        options={options}
        isSearchable={false}
        placeholder={placeHolder}
        pageSize={100}
        styles={customStyles}
        value={value}
      />
    </div>
  );
};

export { Select };
