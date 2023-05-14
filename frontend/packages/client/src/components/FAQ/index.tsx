import React from 'react';

import { Accardion, Text } from '@project/libs/components';
import { AccardionProps } from '@project/libs/components/Accardion';

import styles from './styles.module.scss';

const accardionItmes: AccardionProps[] = [
  {
    title: 'What is YOIU?',
    description: 'YOIU is an IDO listing platform where user can explore new blockchains startups.',
  },
  {
    title: 'What is Proof of Passion - PoP?',
    description:
  <>
    Proof of Passion gives you the chance to improve your TIER by completing challenges.
    Learn more about PoP here:
    <a href="https://docs.yoiu.io/yoiu/proof-of-passion-protocol" target="_blank" rel="noreferrer">
      Link
    </a>
  </>,

  },
  {
    title: 'How can I use YOIU?',
    description:
  <>
    It&apos;s simple! Start the app and browse our listings, once you find a
    startup that you like you can inform yourself on their detailed listing page.
    More information here:
    <a href="https://docs.yoiu.io/yoiu/manual" target="_blank" rel="noreferrer">
      Link
    </a>
  </>
    ,
  },
  {
    title: 'What are the benefits of participating in an IDO?',
    description: 'Early access to blockchain startups: IDOs give early adopters the opportunity to interact with startups long before they may become mainstream.',
  },
];

export const FAQ = () => (
  <div className={styles.faq_container}>
    <div className={styles.faq_content}>
      <Text
        type="h2"
        className={styles.faq_title}
      >
        FAQ
      </Text>
      {accardionItmes.map(({ title, description }) => (
        <Accardion
          title={title}
          description={description}
          key={title}
        />
      ))}
    </div>
  </div>
);
