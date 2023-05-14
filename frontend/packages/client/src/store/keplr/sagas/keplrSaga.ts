import * as secret from "api/secret/secret";
import { call, put, takeLeading } from "redux-saga/effects";
import { Unwrap } from "types/store";

import { sagaExceptionHandler } from "utils";

import { keplrConnect, keplrSetState } from "../actionCreators";
import { KeplrActionTypes } from "../actionTypes";

// eslint-disable-next-line no-empty-pattern
export function* keplrConnectSaga({ }: ReturnType<typeof keplrConnect>) {
  try {
    // eslint-disable-next-line
    // @ts-ignore
    const res: Unwrap<typeof secret.secretJsKeplr> = yield call(
      secret.secretJsKeplr
    );

    if (res) {
      yield put(
        keplrSetState({
          name: res.name,
          address: res.address,
          balance: "",
        })
      );
    }
  } catch (e) {
    sagaExceptionHandler(e);
  }
}

export function* keplrDisConnectSaga() {
  localStorage.clear();
  yield put(
    keplrSetState({
      name: "",
      address: "",
      balance: "",
    })
  );
}

export default function* keplrSaga() {
  yield takeLeading(KeplrActionTypes.Connect, keplrConnectSaga);
  yield takeLeading(KeplrActionTypes.Disconnect, keplrDisConnectSaga);
}
