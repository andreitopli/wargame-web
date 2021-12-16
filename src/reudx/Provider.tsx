import React from 'react';
import {Provider} from 'react-redux';
import { store } from './store';

type Props = {};

export const ReduxProvider: React.FC<Props> = (props) => {
  return (
    <Provider store={store}>
    {props.children}
    </Provider>
  );
};

export type AppDispatch = typeof store.dispatch