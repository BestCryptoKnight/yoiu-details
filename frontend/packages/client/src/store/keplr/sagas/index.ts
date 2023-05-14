import { fork } from 'redux-saga/effects';

import keplrSaga from './keplrSaga';

export const keplrEffects = [
  fork(keplrSaga),
];
