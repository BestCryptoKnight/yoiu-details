import { all } from 'redux-saga/effects';

import { keplrEffects } from './keplr/sagas';

export default function* rootSaga() {
  yield all([
    ...keplrEffects,
  ]);
}
