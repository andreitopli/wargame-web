import {createStore} from 'redux'
import { enhancers } from '../enhancers/enhancers'
import {reducer} from '../reducers/reducer'

export const store = createStore(reducer, enhancers);
