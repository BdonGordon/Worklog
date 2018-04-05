import { IWorklog, IWorklogState, initialState, WorklogAction, WorklogsAction } from '../models/Worklog';
import { CALL_API } from 'redux-api-middleware';
import { IConfig, ISetting } from '../config/config';

/*START: API STUFF PART 1 HERE*/
const config: IConfig = require('../config/config.json');
const settings: ISetting = config.settings[config.env];

/*END: API DECLARATIONS*/
export const WORKLOG_REQUEST = "addWorklog/WORKLOG_REQUEST";
export const WORKLOG_ADD = "addWorklog/WORKLOG_ADD";
export const WORKLOG_ERROR = 'addWorklog/ADDWORKLOG_ERROR';

type WorklogActions = WorklogAction & WorklogsAction;

/*
export function addWorklog(worklog: IWorklog): ICallApiAction {
    return {
        [CALL_API]: {
            endpoint: `${settings.baseURL}:${settings.port}${settings.baseRoutePath}/worklog/addWorklog`,
            method: 'GET',
            types: [WORKLOG_REQUEST, WORKLOG_ADD, WORKLOG_ERROR],
            headers: {
                'Content-Type': 'application/json'
            }
        }
    };
}*/


/* OLD addWorklog without API call*/

export function addWorklog(worklog: IWorklog): WorklogAction {
    return {
        type: WORKLOG_ADD,
        payload: {
            addedWorklog: worklog
        }
    };
}


/**
 * Reducer function 
 * @param state
 * @param action
 */
export function worklogReducer(state: IWorklogState = initialState, action: WorklogActions) {
    switch (action.type) {
        case WORKLOG_ADD:
            let list = state.worklogList.slice();
            list.unshift(action.payload.addedWorklog);

            return Object.assign({}, state, {
                worklog: action.payload,
                worklogList: list
            });
            
        default:
            return state;
    } 
}
