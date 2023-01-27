import { createStore, combineReducers, applyMiddleware } from 'redux'; // npm install redux --save
import {Reducer , NumberReducer} from './AppReducer';

const reduces = combineReducers({defRe: Reducer,  numberRe: NumberReducer });
const AppStore = createStore(reduces);
export default AppStore;