import * as React from 'react';
import Worklog from '../components/Worklog';
import { connect } from 'react-redux';
import { IWorklog, WorklogsAction, WorklogAction, ITask } from '../../../models/Worklog';
import { getWorklogs, deleteWorklog } from '../../../modules/worklog';

export namespace WorklogProps {
    export interface IStateProps {
        isFetching: boolean;
        hasError: boolean;
        message: string | null;
        worklogList: Array<IWorklog>;
    }

    export interface IDispatchProps {
        getWorklogs: () => Promise<WorklogsAction>;
        deleteWorklog: (worklog: IWorklog) => Promise<WorklogsAction>;
    }

    export interface IOwnProps {
    }

    export interface IProps extends IStateProps, IDispatchProps, IOwnProps { }

    export interface IState {
        /**START: Cardview modal properties**/
        isSelected?: boolean; //has a list item been selected
        modalTitle?: string;
        modalAuthor?: string;
        modalDescription?: string;
        modalTimestamp?: string;
        modalDate?: string;
        /**END: Cardview modal properties**/

        /**START: Worklog OPTIONAL Due date and task properties**/
        selectedDate?: string;
        activeIndex?: number;
        /**END: Worklog OPTIONAL Due date and task properties**/
        week?: Array<string>;

        //For deletion
        selectedWorklog?: IWorklog;
        isDeleted?: boolean;
    }
}

function mapStateToProps(state: any) {
    return {
        isFetching: state.worklog.isFetching,
        hasError: state.worklog.hasError,
        message: state.worklog.message,
        worklogList: state.worklog.worklogList
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        getWorklogs: (): Promise<WorklogsAction> => dispatch(getWorklogs()),
        deleteWorklog: (worklog: IWorklog): Promise<WorklogsAction> => dispatch(deleteWorklog(worklog))
    };
}

export default connect<WorklogProps.IStateProps, WorklogProps.IDispatchProps, WorklogProps.IOwnProps>(mapStateToProps, mapDispatchToProps)(Worklog);
//export default Worklog;