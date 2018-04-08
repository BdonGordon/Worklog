import * as React from 'react';
import Worklog from '../components/Worklog';
import { connect } from 'react-redux'; 
import { IWorklog, WorklogsAction, WorklogAction } from '../../../models/Worklog';

export namespace WorklogProps {
    export interface IStateProps {
        isFetching: boolean;
        hasError: boolean;
        message: string | null;
        worklogList: Array<IWorklog>;
    }

    export interface IDispatchProps {
    }

    export interface IOwnProps {
    }

    export interface IProps extends IStateProps, IDispatchProps, IOwnProps { }

    export interface IState {

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
    };
}

export default connect<WorklogProps.IStateProps, WorklogProps.IDispatchProps, WorklogProps.IOwnProps>(mapStateToProps, mapDispatchToProps)(Worklog);
//export default Worklog;