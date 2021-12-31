import React from 'react';
import {Provider} from 'react-redux';
import { createPersistedStore } from './store';
import {enhancers} from './enhancers/enhancers'
import { PersistGate } from 'redux-persist/integration/react';

type Props = {};

const { store, persistor } = createPersistedStore(enhancers);

export const ReduxProvider: React.FC<Props> = (props) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {(bootstraped) => {
          // Hack: For some reason the persistor doens't set the bootstrapped flag to true
          //  when prerednering via react-snapshot, which in turn always return the Loader State
          // This workaround makes sure that the children are always rendered during prerendering
          if (bootstraped) {
            return props.children;
          }
          return null;
        }}
      </PersistGate>
    </Provider>
  );
};

export type AppDispatch = typeof store.dispatch