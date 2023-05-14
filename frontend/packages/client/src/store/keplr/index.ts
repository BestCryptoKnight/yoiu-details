import createReducer from 'utils/createReducer';
import { KeplrState } from 'types/store/wallet';

import { keplrHandler } from './handlers';

export const keplrInitialState: Readonly<KeplrState> = {
  name: '',
  address: '',
  balance: '',
};

export default createReducer(keplrInitialState, keplrHandler);
