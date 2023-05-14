import { KeplrState } from 'types/store/wallet';

import { KeplrActionTypes } from './actionTypes';

export const keplrConnect = () => ({
  type: KeplrActionTypes.Connect,
});

export const keplrDisconnect = () => ({
  type: KeplrActionTypes.Disconnect,
});

export const keplrSetState = (payload: Partial<KeplrState>) => ({
  type: KeplrActionTypes.SetState,
  payload,
});
