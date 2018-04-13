import * as React from 'react';
import AddWorklog from '../components/AddWorklog';
import { connect } from 'react-redux';
import { addWorklog } from '../../../modules/worklog';
import { IWorklog, WorklogsAction, WorklogAction, ITask } from '../../../models/Worklog';

export namespace AddWorklogProps {
    export interface IStateProps {
        //worklog: IWorklog | null;
        isFetching: boolean;
        hasError: boolean;
        message: string | null;
        worklogList: Array<IWorklog>;
    }

    export interface IDispatchProps {
        addWorklog: (worklog: IWorklog) => Promise<WorklogAction>;
    }

    export interface IOwnProps {
    }

    export interface IProps extends IStateProps, IDispatchProps, IOwnProps { }

    export interface IState {
        //START:Dialog state properties
        errorDialogOpen?: boolean;
        dialogSize?: any;
        submitDialogOpen?: boolean;
        //END: Dialog state properties
        Subject?: string;
        Author?: string;
        DateCreated?: Date;
        StartTime?: string;
        HoursWorked?: number;
        Description?: string;
        Tasks?: string;
        //OPTIONAL input
        DueDate?: Date;
        activeIndex?: number;
        TaskList?: Array<ITask>;
    }
}

/**
 * Shouldn't be 'any' though
 * @param state
 */
function mapStateToProps(state: any) {
    return {
        //worklog: state.worklog.worklog,
        isFetching: state.worklog.isFetching,
        hasError: state.worklog.hasError,
        message: state.worklog.message,
        worklogList: state.worklog.worklogList
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        addWorklog: (worklog: IWorklog): Promise<WorklogAction> => dispatch(addWorklog(worklog))
    };
}

export default connect<AddWorklogProps.IStateProps, AddWorklogProps.IDispatchProps, AddWorklogProps.IOwnProps>(mapStateToProps, mapDispatchToProps)(AddWorklog);
//export default AddWorklog;