import React from 'react';
import cx from 'classnames';
import { Outlet } from 'react-router-dom';

import { AppHeader } from 'containers/Headers/AppHeader';

import styles from './styles.module.scss';

export const ProjectLayout = () => (
  <div className={cx(styles.layout_wrapper)}>
    <AppHeader isProjectPage />
    <Outlet />
  </div>
);
