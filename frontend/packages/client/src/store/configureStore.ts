import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/es/storage';
import { persistStore, persistReducer } from 'redux-persist';
// import { KeplrState } from 'types/store/wallet';

import { configuredReactotron } from '@project/libs/initialImports/reactotron';

import reducer from './rootReducer';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const walletPersistConfig = {
  key: 'keplr',
  storage,
  // whitelist: ['address'] as Array<keyof KeplrState>,
};

const reducers = {
  ...reducer,
  keplr: persistReducer(walletPersistConfig, reducer.keplr),
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
    __REDUX_DEVTOOLS_EXTENSION__: typeof compose;
  }
}

export default (initialState: { [key: string]: never } = {}) => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
    window.__REDUX_DEVTOOLS_EXTENSION__ ||
    compose;

  const store = createStore(
    combineReducers(reducers),
    initialState,
    composeEnhancers(
      applyMiddleware(
        sagaMiddleware,
      ),
      configuredReactotron != null
        ? configuredReactotron.createEnhancer()
        : (nope: unknown) => nope,
    ),
  );

  sagaMiddleware.run(rootSaga);
  const persistor = persistStore(store);

  return { store, persistor };
};
