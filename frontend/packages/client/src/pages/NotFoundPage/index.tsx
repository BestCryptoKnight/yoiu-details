import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

export const NotFoundPage: FC = () => {
  Reactotron.log('RENDER PROJEDT PAGE');
  return (
    <div className={styles.notfound_page_conatiner}>
      <h1>PAGE NOT FOUND</h1>
      <Link to="/">Back Home</Link>
    </div>
  );
};
