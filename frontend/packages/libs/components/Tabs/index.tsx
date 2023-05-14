import React, {
  memo,
  useCallback,
  ReactElement,
} from 'react';
import cx from 'classnames';

import { Text } from '@project/libs/components';

import styles from './styles.module.scss';

export type TabItem = {
  name: string
  content: ReactElement;
};

type Props = {
  items: TabItem[]
  activeTab: number
  onChange: (num: number) => void
  className?: string;
};

const Tabs = memo<Props>(({
  activeTab = 0,
  items,
  onChange,
  className,
}) => {
  const onTabClick = useCallback((index: number) => () => {
    onChange(index);
  }, [onChange]);

  return (
    <div className={cx(styles.tabs_container, className)}>
      <div className={styles.tabs_header}>
        {items.map(({ name }, index) => (
          <button
            key={name}
            className={styles.tab_name_container}
            onClick={onTabClick(index)}
          >
            <Text
              type="h4"
              className={cx(styles.tab_title, {
                [styles.tab_title_active]: index === activeTab,
              })}
            >
              {name}
            </Text>
          </button>
        ))}
      </div>
      {items[activeTab].content}
    </div>
  );
});

export { Tabs };
