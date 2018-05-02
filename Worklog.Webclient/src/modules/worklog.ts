import { IWorklog, IWorklogState, initialState, WorklogAction, WorklogsAction } from '../models/Worklog';
import { CALL_API } from 'redux-api-middleware';
import { IConfig, ISetting } from '../config/config';

/*START: API STUFF PART 1 HERE*/
const config: IConfig = require('../config/config.json');
const settings: ISetting = config.settings[config.env];
/*END: API DECLARATIONS*/

//DOC: The next 6 lines of code are just redux actions that we are defining as constant strings. This is our format
export const ADD_WORKLOG_REQUEST = "worklog/ADD_WORKLOG_REQUEST";
export const ADD_WORKLOG_RESPONSE = "worklog/ADD_WORKLOG_RESPONSE";
export const ADD_WORKLOG_ERROR = 'worklog/ADD_WORKLOG_ERROR';

export const GET_WORKLOG_REQUEST = "worklog/GET_WORKLOG_REQUEST";
export const GET_WORKLOG_RESPONSE = "worklog/GET_WORKLOG_RESPONSE";
export const GET_WORKLOG_ERROR = 'worklog/GET_ADDWORKLOG_ERROR';

export const DELETE_WORKLOG_REQUEST = "worklog/DELETE_WORKLOG_REQUEST";
export const DELETE_WORKLOG_RESPONSE = "worklog/DELETE_WORKLOG_RESPONSE";
export const DELETE_WORKLOG_ERROR = 'worklog/DELETE_ADDWORKLOG_ERROR';


//DOC: This is where we define a type that is of BOTH the actions that we defined in our Worklog model file
type WorklogActions = WorklogAction & WorklogsAction;


/* DOC: OLD addWorklog without the API. READ THIS FIRST. The function just returns the payload which holds the value of the worklog object that is
* defined in the AddWorklog component (we'll see it later on)
*/
/*export function addWorklog(worklog: IWorklog): WorklogAction {
    return {
        type: ADD_WORKLOG_RESPONSE,
        payload: {
            addedWorklog: worklog
        }
    };
}
*/

/** DOC: Will be discussed in API Section Step. If on Webclient still, ignore this. 
 * Adding worklogs
 * @param worklog
 */
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
 * Get all the worklogs from the database
 */
export function getWorklogs(): ICallApiAction {
    return {
        [CALL_API]: {
            endpoint: `${settings.baseURL}:${settings.port}${settings.baseRoutePath}/worklog/getWorklogs`,
            method: 'GET',
            types: [GET_WORKLOG_REQUEST, GET_WORKLOG_RESPONSE, GET_WORKLOG_ERROR],
            headers: {
                'Content-Type': 'application/json'
            }
        }
    };
}

export function deleteWorklog(worklog: IWorklog): WorklogAction {
    return {
        type: DELETE_WORKLOG_RESPONSE,
        payload: {
            worklog: worklog
        }
    };
}

/** DOC: This is the pure reducer function that switches between the application actions that occur.
 * Notice that the state parameter is intialized to the "initialState" and action is that of WorklogActions type
 * Reducer function 
 * @param state
 * @param action
 */
export function worklogReducer(state: IWorklogState = initialState, action: WorklogActions) {
    switch (action.type) {
        //START: Adding a worklog. 
        //DOC: This is typically what our systems' reducer functions look like. Starts with a REQUEST and ends with either a RESPONSE or ERROR
        case ADD_WORKLOG_REQUEST: {
            return Object.assign({}, state, {
                isFetching: true,
                hasError: false,
                message: null
            });
        }

        case ADD_WORKLOG_RESPONSE: {
            let list = state.worklogList.slice();
            list.unshift(action.payload.worklog); //DOC: Just adding to the list of worklog objects (received from the payload) 

            return Object.assign({}, state, {
                isFetching: false,
                hasError: false,
                message: null,
                worklog: action.payload,
                worklogList: list
            });
        }

        case ADD_WORKLOG_ERROR: {
            return Object.assign({}, state, {
                isFetching: false,
                hasError: true,
                message: !!action.payload.response ? action.payload.response.message: 'Unknown error'
            });
        }
        //END: Adding a worklog

        //START: Worklog list
        case GET_WORKLOG_REQUEST: {
            return Object.assign({}, state, {
                isFetching: true,
                hasError: false,
                message: null
            });
        }

        case GET_WORKLOG_RESPONSE: {
            return Object.assign({}, state, {
                isFetching: false,
                hasError: false,
                message: null,
                worklogList: action.payload.worklogList
            });
        }

        case GET_WORKLOG_ERROR: {
            return Object.assign({}, state, {
                isFetching: false,
                hasError: true,
                message: !!action.payload.response ? action.payload.response.message : 'Unknown error'
            });
        }
        //END: Worklog list

        //START: Delete Worklog
        case DELETE_WORKLOG_REQUEST: {
            return Object.assign({}, state, {
                isFetching: true,
                hasError: false,
                message: null
            });
        }

        case DELETE_WORKLOG_RESPONSE: {
            let deletedWorklog: IWorklog = action.payload.worklog;
            let currentWorklogList: Array<IWorklog> = state.worklogList;
            let updatedWorklogList: Array<IWorklog> = currentWorklogList.filter((oldWorklog: IWorklog) => oldWorklog.WorklogID !== deletedWorklog.WorklogID);

            return Object.assign({}, state, {
                isFetching: false,
                hasError: false,
                message: null,
                worklogList: updatedWorklogList
            });
        }

        case DELETE_WORKLOG_ERROR: {
            return Object.assign({}, state, {
                isFetching: false,
                hasError: true,
                message: !!action.payload.response ? action.payload.response.message : 'Unknown error'
            });
        }

        default:
            return state;
    }
}
