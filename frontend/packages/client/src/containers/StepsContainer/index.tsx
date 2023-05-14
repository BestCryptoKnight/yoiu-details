import React, {
  memo,
  useMemo,
} from 'react';
import cx from 'classnames';

import { strings } from 'global';

import {
  step1Icon,
  step2Icon,
  step3Icon,
  step4Icon,
} from '@project/libs/assets/images';
import { Text } from '@project/libs/components';

import { StepCard } from './StepCard';

import styles from './styles.module.scss';

type StepContainerProps = {
  classNameTitle?:string;
};

export const StepsContainer = memo<StepContainerProps>(({ classNameTitle }) => {
  const steps = useMemo(
    () => [
      {
        description: strings.chooseListing,
        imageUrl: step1Icon,
      },
      {
        description: strings.gainInsights,
        imageUrl: step2Icon,
      },
      {
        description: strings.interactWithTheProject,
        imageUrl: step3Icon,
      },
      {
        description: strings.receiveTokens,
        imageUrl: step4Icon,
      },
    ],
    [],
  );

  return (
    <div className={styles.steps_container}>
      <Text
        type="h2"
        className={cx(styles.steps_title, classNameTitle)}
      >
        {strings.step_by_step}
      </Text>
      <div className={styles.steps_cards_list}>
        {steps.map(({ description, imageUrl }, index) => (
          <StepCard
            description={description}
            imageUrl={imageUrl}
            index={index}
            key={imageUrl}
          />
        ))}
      </div>
    </div>
  );
});
