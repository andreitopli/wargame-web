import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';

export const enhancers = composeWithDevTools(applyMiddleware(logger));