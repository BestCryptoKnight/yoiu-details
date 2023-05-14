import { ActionFn } from 'types';

import { KeplrState } from 'types/store/wallet';

import { keplrSetState } from './actionCreators';
import { KeplrActionTypes } from './actionTypes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type KeplrHandlerFn<F extends (...args: any[]) => any> = ActionFn<
KeplrState,
ReturnType<F>
>;

const setState: KeplrHandlerFn<typeof keplrSetState> = (
  state,
  { payload },
) => ({
  ...state,
  ...payload,
});

export const keplrHandler = {
  [KeplrActionTypes.SetState]: setState,
};
