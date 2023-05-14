import React, { useEffect } from 'react';
import cx from 'classnames';
import { Outlet, useLocation } from 'react-router-dom';
import { PolicyAndTermsAgreementModal } from 'components/PolicyAndTermsAgreementModal';

import { Footer } from 'containers/Footer';
import { AppHeader } from 'containers/Headers';
import { useModal } from 'hooks';

import styles from './styles.module.scss';

export const AppLayout = () => {
  const [isOpen, onToggle] = useModal();
  const { pathname } = useLocation();

  useEffect(() => {
    if (window !== undefined) {
      const isAggreed = localStorage.getItem('yoiu-agreement');
      if (!isAggreed) {
        onToggle();
      }
    }
  }, [pathname]);

  return (

    <div className={cx(styles.layout_wrapper)}>
      <PolicyAndTermsAgreementModal closeBtn isOpen={isOpen} onClose={onToggle} />
      <AppHeader isImageBlue />
      <Outlet />
      <Footer />
    </div>
  );
};
