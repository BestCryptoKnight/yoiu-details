import React from 'react';
import cx from 'classnames';
import { Outlet } from 'react-router-dom';
import { ModalLayer } from 'layouts';

import { Footer } from 'containers/Footer';

import styles from './styles.module.scss';

export const MainLayout = () => (
  <div
    className={cx(
      styles.layout_wrapper,
    )}
  >
    <Outlet />
    <Footer />
    <ModalLayer />
  </div>
);
