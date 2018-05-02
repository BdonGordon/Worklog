import { AnyAction } from 'redux';

//DOC: Real-life object is the Worklog. These are the properties of what a Worklog is
export interface IWorklog {
    WorklogID?: number;
    Subject?: string;
    Author: string;
    DateCreated?: Date;
    StartTime?: string;
    HoursWorked?: number;
    Description?: string;
    Tasks?: string;
}

export interface ITask {
    date?: string;
    key: number;
    value?: string; //value is basically tasks. 
    tasks?: Array<string>;
}

/*DOC: What we define here are the properties of a Worklog. The first 3 are "mandatory" for API usage. 
* Typically, we also define the real-life object (worklog) and an arraylist of the object. The array isn't mandatory, but realistically, every app will use a list of some kind.
* Also take note at the fact that they're ALL readonly here
*/
export interface IWorklogState {
    readonly isFetching: boolean; //API
    readonly hasError: boolean; //API
    readonly message: string | null; //API
    readonly worklog: IWorklog | null;
    readonly worklogList: Array<IWorklog>;
}

//DOC: We want to initialize/define the initial state of the properties above; setting the default values basically. 
export const initialState: IWorklogState = {
    isFetching: false,
    hasError: false,
    message: null,
    worklog: null,
    worklogList: []
};

/**
* DOC: FIRSTLY, the name of the interface is incorrect according to our standards. Should be: IWorklogAction (I forgot the 'I'... oops).
* Once familiar with actions of redux, you'll understand this more. Essentially we will be returning the properties defined in
* this action. The most important property is the payload which is the worklog object and the (optional) response for API usage
*/
export interface WorklogAction extends AnyAction {
    error?: boolean;
    payload: {
        worklog: IWorklog;
        response?: {
            message?: string;
            error?: {};
        }
    };
}

//DOC: essentially the same thing as above except its of the arraylist of worklog objects
export interface WorklogsAction extends AnyAction {
    error?: boolean;
    payload: {
        worklogList: Array<IWorklog>;
        response?: {
            message?: string;
            error?: {};
        }
    };
}

/**
* THis is its own separate action from the others above
**/
export interface IWorklogsDeleteAction extends AnyAction {
    error?: boolean;
    payload: {
        WorklogID: number;
        response: {
            message?: string;
            error?: {};
        }
    };
}