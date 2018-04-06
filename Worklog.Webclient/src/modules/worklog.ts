import { IWorklog, IWorklogState, initialState, WorklogAction, WorklogsAction } from '../models/Worklog';
import { CALL_API } from 'redux-api-middleware';
import { IConfig, ISetting } from '../config/config';

/*START: API STUFF PART 1 HERE*/
const config: IConfig = require('../config/config.json');
const settings: ISetting = config.settings[config.env];

/*END: API DECLARATIONS*/
export const ADD_WORKLOG_REQUEST = "worklog/ADD_WORKLOG_REQUEST";
export const ADD_WORKLOG_RESPONSE = "worklog/ADD_WORKLOG_RESPONSE";
export const ADD_WORKLOG_ERROR = 'worklog/ADD_WORKLOG_ERROR';

export const GET_WORKLOG_REQUEST = "worklog/GET_WORKLOG_REQUEST";
export const GET_WORKLOG_RESPONSE = "worklog/GET_WORKLOG_RESPONSE";
export const GET_WORKLOG_ERROR = 'worklog/GET_ADDWORKLOG_ERROR';


type WorklogActions = WorklogAction & WorklogsAction;

export function addWorklog(worklog: IWorklog): ICallApiAction {
    return {
        [CALL_API]: {
            endpoint: `${settings.baseURL}:${settings.port}${settings.baseRoutePath}/worklog/addWorklog`,
            method: 'POST',
            types: [ADD_WORKLOG_REQUEST, ADD_WORKLOG_RESPONSE, ADD_WORKLOG_ERROR],
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'worklog': worklog
            })
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
        case ADD_WORKLOG_REQUEST: {
            return Object.assign({}, state, {
                isFetching: true,
                hasError: false,
                message: null
            });
        }

        case ADD_WORKLOG_RESPONSE:
            let list = state.worklogList.slice();
            list.unshift(action.payload.addedWorklog);

            return Object.assign({}, state, {
                isFetching: false,
                hasError: false,
                message: null,
                worklog: action.payload, 
                worklogList: list
            });

        case ADD_WORKLOG_ERROR: {
            return Object.assign({}, state, {
                isFetching: false,
                hasError: true,
                message: !!action.payload.response ? action.payload.response.message: 'Unknown error'
            });
        }

        default:
            return state;
    }
}
