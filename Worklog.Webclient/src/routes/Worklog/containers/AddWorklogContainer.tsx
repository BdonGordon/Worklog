import * as React from 'react';
import AddWorklog from '../components/AddWorklog';
import { connect } from 'react-redux';
import { addWorklog } from '../../../modules/worklog';
import { IWorklog } from '../../../models/Worklog';

export namespace AddWorklogProps {
    export interface IStateProps {
        worklog: IWorklog | null;
        worklogList: Array<IWorklog>;
    }

    export interface IDispatchProps {
        addWorklog: (worklog: IWorklog) => Promise<void>;
    }

    export interface IOwnProps { }

    export interface IProps extends IStateProps, IDispatchProps, IOwnProps { }

    export interface IState {
        subject?: string;
        author?: string;
    }
}

/**
 * Shouldn't be 'any' though
 * @param state
 */
function mapStateToProps(state: any) {
    return {
        worklog: state.worklog.worklog,
        worklogList: state.worklog.worklogList
    };
}

function mapDispatchToProps(dispatch: any) {
    return {
        addWorklog: (worklog: IWorklog): Promise<void> => dispatch(addWorklog(worklog))
    };
}

export default connect<AddWorklogProps.IStateProps, AddWorklogProps.IDispatchProps, AddWorklogProps.IOwnProps>(mapStateToProps, mapDispatchToProps)(AddWorklog);
//export default AddWorklog;