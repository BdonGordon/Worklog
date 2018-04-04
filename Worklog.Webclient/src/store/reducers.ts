import { combineReducers } from 'redux';
import { worklogReducer } from '../modules/worklog';

const makeRootReducer = combineReducers({
    worklog: worklogReducer
});

export default makeRootReducer;