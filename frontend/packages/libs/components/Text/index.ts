import {
  ReactNode,
  createElement,
  forwardRef,
  CSSProperties,
  memo,
} from 'react';
import classNames from 'classnames/bind';

import styles from './styles.module.scss';

const cx = classNames.bind(styles);

type TextProps = {
  className?: string;
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p';
  children?: ReactNode;
  dangerouslySetInnerHTML?: { __html: string } | undefined;
  style?: CSSProperties;
};

const Text = memo<TextProps>(forwardRef((
  {
    className = '',
    type = 'p',
    children,
    dangerouslySetInnerHTML,
    style,
  },
  ref,
) => {
  const additionalStyle = cx({ [type]: true }, className);
  return createElement(type, {
    className: additionalStyle,
    style,
    dangerouslySetInnerHTML,
    ref,
  }, children);
}));

export { Text };
