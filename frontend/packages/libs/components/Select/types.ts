export type SelectOption<T> = {
  value: T;
  label: string;
};

export type SelectProps<T> = {
  label: string;
  className?: string;
  onChange: (selectedOption: SelectOption<T>) => void;
  options: SelectOption<T>[];
  value?: SelectOption<T>;
  placeHolder?: string;
};
