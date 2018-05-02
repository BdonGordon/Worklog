import * as React from 'react';
import AddWorklog from '../components/AddWorklog';
import { connect } from 'react-redux';
import { addWorklog } from '../../../modules/worklog';
import { IWorklog, WorklogsAction, WorklogAction, ITask } from '../../../models/Worklog';

/**
 * DOC: First and foremost, EVERY container you see in an application will have an export namespace with this type of
 * naming convention
 */
export namespace AddWorklogProps {
    /** DOC: These are the state values from the REDUX store. Every property here has its value from the store**/
    export interface IStateProps {
        worklog: IWorklog | null;
        isFetching: boolean;
        hasError: boolean;
        message: string | null;
        worklogList: Array<IWorklog>;
    }

    //DOC: This is where we call our functions from the reducer (imported as per above) 
    export interface IDispatchProps {
        addWorklog: (worklog: IWorklog) => Promise<WorklogAction>;
    }

    //DOC: To be honest, still unsure as to what this does
    export interface IOwnProps {
    }

    //DOC: Just do this !
    export interface IProps extends IStateProps, IDispatchProps, IOwnProps { }

    /**DOC: This is the COMPONENT's state. The component's state's property can be thought of as relative to it alone. The difference between this IState
    and IStateProps is that IStateProps is "universal" because it is in the store. **/
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
 * DOC: As the name suggests, this function maps the application's state to the props of the component that we defined
 * above in the namespace in the IStateProps interface
 * @param state
 */
function mapStateToProps(state: any) {
    return {
        worklog: state.worklog.worklog,
        isFetching: state.worklog.isFetching,
        hasError: state.worklog.hasError,
        message: state.worklog.message,
        worklogList: state.worklog.worklogList
    };
}
/**
 * DOC: Essentially the same thing as above, but it's mapping to the worklog's function that we defined in the worklog module
 * @param dispatch
 */
function mapDispatchToProps(dispatch: any) {
    return {
        addWorklog: (worklog: IWorklog): Promise<WorklogAction> => dispatch(addWorklog(worklog))
    };
}

//DOC: Do this :)
export default connect<AddWorklogProps.IStateProps, AddWorklogProps.IDispatchProps, AddWorklogProps.IOwnProps>(mapStateToProps, mapDispatchToProps)(AddWorklog);
//export default AddWorklog;