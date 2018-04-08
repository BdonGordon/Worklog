import { AnyAction } from 'redux';

export interface IWorklog {
    Subject?: string;
    Author: string;
    DateCreated?: Date;
    StartTime?: string;
    HoursWorked?: number;
    Description?: string;
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
        worklogs: Array<IWorklog>;
        response?: {
            message?: string;
            error?: {};
        }
    };
}