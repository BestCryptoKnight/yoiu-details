import { StylesConfig } from 'react-select';

import { Color } from 'global';

import { SelectOption } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const customStyles: StylesConfig<SelectOption<any>, false> = {
  option: (provided, { isSelected, isFocused }) => {
    let color = Color.black1;
    if (isFocused || isSelected) {
      color = Color.grey;
    }

    return {
      ...provided,
      color: 'white',
      backgroundColor: color,
      ':active': {
        backgroundColor: Color.grey,
      },
    };
  },

  control: (provided) => ({
    ...provided,
    backgroundColor: Color.black1,
    borderColor: Color.grey,
    borderRadius: 0,
    boxShadow: 'none',
    width: '100%',
    ':hover': { borderColor: Color.grey },
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 15,
    cursor: 'text',
    color: Color.white,
  }),
  input: (provided) => ({
    ...provided,
    color: Color.white,
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: 'none',
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    cursor: 'pointer',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    width: 10,
    height: 10,
    padding: 0,
    margin: '0 20px 11px 0',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: Color.black1,
    color: Color.white,
    width: '100%',
    marginTop: 0,
  }),
  placeholder: (provided) => ({
    ...provided,
    color: Color.white,
  }),
  singleValue: (provided) => ({ ...provided, color: Color.white }),
};
