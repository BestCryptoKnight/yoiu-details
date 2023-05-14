import React, {
  ChangeEvent,
  memo,
  useCallback,
} from 'react';
import cx from 'classnames';

import styles from './styles.module.scss';

type TextInputProps = {
  value: string
  defaultValue?: string
  name?: string
  isPassword?: boolean
  label?: string
  labelRight?: string
  tokenSymbol?: string
  classNameInput?: string
  classNameLabel?: string
  classNameContainer?: string
  disabled?: boolean
  isWithClear?: boolean
  onChangeValue?: (text: string, name?: string) => void
  placeholder?: string
  isTextOnly?: boolean
  isNumberOnly?: boolean
  classNameBox?: string
};

export const TextInput = memo<TextInputProps>(
  ({
    value,
    defaultValue,
    name,
    classNameInput,
    classNameContainer,
    disabled = false,
    onChangeValue,
    placeholder = '',
    isNumberOnly,
    classNameBox,
  }) => {
    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        if (onChangeValue !== undefined) {
          onChangeValue(e.target.validity.valid ? e.target.value : value, name);
        }
      },
      [onChangeValue, value, name],
    );

    const pattern = isNumberOnly ? '[0-9]*' : undefined;

    return (
      <div className={cx(styles.input__container, classNameContainer)}>
        <div className={cx(styles.input__box, classNameBox)}>
          <input
            pattern={pattern}
            name={name}
            value={value}
            type="text"
            className={classNameInput}
            disabled={disabled}
            defaultValue={defaultValue}
            onChange={handleChange}
            placeholder={placeholder}
          />
        </div>
      </div>
    );
  },
);
