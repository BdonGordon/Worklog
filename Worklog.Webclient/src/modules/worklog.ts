import { IWorklog, IWorklogState, initialState, WorklogAction, WorklogsAction } from '../models/Worklog';
import { CALL_API } from 'redux-api-middleware';
import { IConfig, ISetting } from '../config/config';

/*START: API STUFF PART 1 HERE*/
const config: IConfig = require('../config/config.json');
const settings: ISetting = config.settings[config.env];

/*END: API DECLARATIONS*/
export const WORKLOG_ADD = "WORKLOG_ADD";
export const WORKLOG_LOAD = "WORKLOG_LOAD";

type WorklogActions = WorklogAction & WorklogsAction;

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
