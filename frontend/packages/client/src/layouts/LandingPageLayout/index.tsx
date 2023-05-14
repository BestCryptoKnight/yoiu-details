import React from 'react';
import cx from 'classnames';
import { Outlet } from 'react-router-dom';

import { Footer } from 'containers/Footer';
import { LandingPageHeader } from 'containers/Headers';

import styles from './styles.module.scss';

export const LandingPageLayout = () => (
  <div className={cx(styles.layout_wrapper)}>
    <LandingPageHeader />
    <Outlet />
    <Footer />
  </div>
);
