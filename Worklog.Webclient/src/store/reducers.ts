import { combineReducers } from 'redux';
import { worklogReducer } from '../modules/worklog'; //DOC: Imports the worklogReducer and many other reducers into the file

//simply uses the combineReducers function
const makeRootReducer = combineReducers({
    worklog: worklogReducer
});

export default makeRootReducer;