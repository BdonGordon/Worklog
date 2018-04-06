import { AnyAction } from 'redux';

export interface IWorklog {
    date?: string;
    Subject?: string;
    Author: string;
    startTime?: string;
    endTime?: string;
    latestState?: string;
    goals?: string;
    workDone?: string;
    workToDo?: string;
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
        addedWorklog: IWorklog;
        response?: {
            message?: string;
            error?: {};
        }
    };
}

export interface WorklogsAction extends AnyAction {
    error?: boolean;
    payload: {
        worklogs: Array<IWorklog>;
        response?: {
            message?: string;
            error?: {};
        }
    };
}