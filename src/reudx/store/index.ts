import { createStore, StoreEnhancer } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import { reducer as rootReducer } from '../reducers/reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'pieces',
    'game'
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const createPersistedStore =  (enhancers: StoreEnhancer) => {
  const store = createStore(persistedReducer, enhancers);

  const persistor = persistStore(store);

  return { store, persistor };
};
