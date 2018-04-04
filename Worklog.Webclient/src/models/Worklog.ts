import { AnyAction } from 'redux';

export interface IWorklog {
    date?: string;
    subject?: string;
    author: string;
    startTime?: string;
    endTime?: string;
    latestState?: string;
    goals?: string;
    workDone?: string;
    workToDo?: string;
}

export interface IWorklogState {
    readonly worklog: IWorklog | null;
    readonly worklogList: Array<IWorklog>;
}

export const initialState: IWorklogState = {
    worklog: null,
    worklogList: []
};

export interface WorklogAction extends AnyAction {
    error?: boolean;
    payload: {
        addedWorklog: IWorklog;
    };
}

export interface WorklogsAction extends AnyAction {
    error?: boolean;
    payload: {
        worklogs: Array<IWorklog>;
    };
}