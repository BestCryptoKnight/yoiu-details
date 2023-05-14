import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  LegacyRef,
  MouseEventHandler,
  PropsWithChildren,
} from 'react';

import { Color } from 'global';

export type ButtonRef = LegacyRef<HTMLButtonElement> | undefined;

export type ButtonProps = PropsWithChildren<
  DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & {
    theme?: ButtonTheme
    gradientBackgroundColor?: Color
    isBiggerText?: boolean
    isFullWidth?: boolean
    onClick?: MouseEventHandler<HTMLButtonElement>
    iconClassName?: string
    edgingClassName?: string
    isLoading?: boolean
    withoutOuterBorder?: boolean
  }
>;

export type ButtonTheme =
  'text'
  | 'primary'
  | 'outline'
  | 'outline-white'
  | 'gradient'
  | 'secondary'
  | 'opacity'
  | 'gray';
