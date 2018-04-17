import { AnyAction } from 'redux';

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

export interface IWorklogState {
    readonly isFetching: boolean;
    readonly hasError: boolean;
    readonly message: string | null;
    readonly worklog: IWorklog | null;
    readonly worklogList: Array<IWorklog>;
}

export const initialState: IWorklogState = {
    isFetching: false,
    hasError: false,
    message: null,
    worklog: null,
    worklogList: []
};

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