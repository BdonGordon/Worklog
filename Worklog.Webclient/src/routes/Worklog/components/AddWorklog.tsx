import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { AddWorklogProps } from '../containers/AddWorklogContainer';
import { IWorklog, ITask } from '../../../models/Worklog';
import { Divider, Form, Label, TextArea, Button, Modal, Accordion, Icon, List, Segment } from 'semantic-ui-react';
import * as moment from 'moment';

//DOC: We usually want to create the initial state of the component state before proceeding
const initialState: AddWorklogProps.IState = {
    errorDialogOpen: false,
    submitDialogOpen:  false,
    Subject: '',
    Author: '',
    DateCreated: new Date(Date.now()),
    StartTime: '',
    HoursWorked: 0,
    Description: '',
    Tasks: '',
    DueDate: new Date(Date.now()),
    activeIndex: -1,
    TaskList: new Array(),
};

class AddWorklog extends React.Component<AddWorklogProps.IProps, AddWorklogProps.IState> {
    //: AddWorklogProps.IProps
    constructor(props: AddWorklogProps.IProps) {
        super(props);
        this.state = initialState;

        //DOC: Don't forget to bind any functions you create 
        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleHoursChange = this.handleHoursChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        //Submit dialog functions
        this.dialogShow = this.dialogShow.bind(this);
        this.dialogClose = this.dialogClose.bind(this);
        this.errorDialogShow = this.errorDialogShow.bind(this);
        //Accordian
        this.handleOptionalVisibility = this.handleOptionalVisibility.bind(this);
        this.handleDueDateChange = this.handleDueDateChange.bind(this);
        this.handleAddTask = this.handleAddTask.bind(this);
        this.renderTaskList = this.renderTaskList.bind(this);
        this.handleTaskTextChange = this.handleTaskTextChange.bind(this);
        this.handleRemoveTask = this.handleRemoveTask.bind(this);
    }

    handleSubjectChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            Subject: e.currentTarget.value
        });
    }

    handleAuthorChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            Author: e.currentTarget.value
        });
    }

    handleDateChange(e: React.FormEvent<HTMLInputElement>) {
        let newDate: Date = new Date(e.currentTarget.value);

        this.setState({
            DateCreated: newDate
        });
    }

    /**
     * e.currentTarget.value: If AM => ie. 01:00
     *                      If PM => ie. 13:00
     * @param e
     */
    handleStartTimeChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            StartTime: e.currentTarget.value
        });
    }

    handleHoursChange(e: React.FormEvent<HTMLInputElement>) {
        let hours = +e.currentTarget.value;

        this.setState({
            HoursWorked: hours
        });
    }

    handleDescriptionChange(e: React.FormEvent<HTMLTextAreaElement>) {
        this.setState({
            Description: e.currentTarget.value
        });
    }
    /**
     * This toggles the visibility of the fields of the OPTIONAL Remaining Tasks
     * @param e
     * @param titleProps
     */
    handleOptionalVisibility(e, titleProps) {
        const { index } = titleProps;
        const { activeIndex } = this.state;
        const newIndex = activeIndex === index ? -1 : index;

        this.setState({ activeIndex: newIndex });
    }

    /**START: OPTIONAL: REMAINING TASKS SECTION**/
    /**
     * 
     * @param e
     */
    handleDueDateChange(e: React.FormEvent<HTMLInputElement>) {
        let dueDate: Date = new Date(e.currentTarget.value);

        this.setState({
            DueDate: dueDate
        });
    }

    /**
     * Adds a new Input field into the Tasks state property so it can be accessed in function below
     */
    handleAddTask() {
        let newTask: ITask;
        let num: number;
        num = this.state.TaskList.length + 1;
        newTask = {
            key: num,
            value: ''
        };

        let taskList = this.state.TaskList;
        taskList.push(newTask);

        this.setState({
            TaskList: taskList
        });
    }

    /**
     * Removes the task from the list of tasks
     * @param task
     */
    handleRemoveTask(task: ITask) {
        let removedTask: ITask = task;
        let oldList: Array<ITask> = this.state.TaskList;
        let updatedTaskList: Array<ITask> = oldList.filter((oldTask: ITask) => oldTask.key !== removedTask.key);

        this.setState({
            TaskList: updatedTaskList
        });
    }

    /**
     *  This renders the new Task Input field in the UI by returning a list of
     * input fields
     */
    renderTaskList() {
        let tasks = this.state.TaskList;

        return (
            tasks.map((task: ITask) => {
                return (
                    <div key={task.key}>
                        <input type="text" placeholder="Task title" style={{ marginTop: '4px', marginBottom: '4px', width: '80%' }} onChange={(e) => this.handleTaskTextChange(task, e)} />
                        <Label style={{ backgroundColor: '#a70000', marginLeft: '4px', marginTop: '2%', cursor: 'pointer' }} onClick={(e) => this.handleRemoveTask(task)}> <Icon name='remove' /></Label>
                    </div>
                );
            })
        );
    }

    handleTaskTextChange(task: ITask, e: React.FormEvent<HTMLInputElement>) {
        let taskList = this.state.TaskList;
        taskList[taskList.indexOf(task)] = {
            key: task.key,
            value: e.currentTarget.value
        };
        this.setState({
            TaskList: taskList
        });
    }

    /**
     * DOC: This function is where we send the Worklog object to the database using the addWorklog() functin that we defined in the model.
     * Follow along with the supporting comments below. 
     * @param e
     */
    handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        let form: HTMLFormElement = e.currentTarget;

        //DOC: Creating the task object with the inputted info
        let taskObject = {
            duedate: this.state.DueDate,
            tasks: this.state.TaskList.map((task) => {
                return task.value;
            }),
        };
        let taskJson = JSON.stringify(taskObject);

        //DOC: Create the Worklog object
        let worklog: IWorklog = {
            Subject: this.state.Subject,
            Author: this.state.Author,
            DateCreated: this.state.DateCreated,
            StartTime: this.state.StartTime,
            HoursWorked: this.state.HoursWorked,
            Description: this.state.Description,
            Tasks: taskJson
        };

        //DOC: With the .then, that's where we are using the WorklogActions' properties (response, message, error) to notify 
        //the status of the communication between the app and the database
        this.props.addWorklog(worklog).then((result) => {
            if (result.error) {
                console.log("Error while adding log : " +
                    !!result.payload && !!result.payload.response ? result.payload.response.message : 'Unknown error');
                this.errorDialogShow('mini');
            }
            else {
                console.log("Log added successfully");
                this.dialogShow('mini');
                form.reset();
            }
        });
        //Close the optional parameters Accordion and reset the Task list
        this.setState({
            activeIndex: -1,
            TaskList: new Array()
        });
    }

    //START: Submission Dialog (success/failure)
    dialogShow(dialogSize: any) {
        this.setState({
            dialogSize,
            submitDialogOpen: true
        });
    }

    errorDialogShow(dialogSize: any) {
        this.setState({
            dialogSize,
            errorDialogOpen: true
        });
    }

    dialogClose() {
        this.setState({
            submitDialogOpen: false,
            errorDialogOpen: false
        });
    }
    //END: Submission Dialog (success/failure)

    render() {
        const { submitDialogOpen, errorDialogOpen, dialogSize, activeIndex } = this.state;

        return (
            <div style={{ textAlign: 'center' }}>
                <h4>Add Worklog component</h4>

                {/*START: Main component*/}
                <Form onSubmit={this.handleFormSubmit} >
                    <Form.Field inline={true}>
                        <input type="text" placeholder="Subject" onChange={this.handleSubjectChange}  />
                        <Label pointing="left">Enter Subject Name</Label>
                    </Form.Field>

                    <Form.Field inline={true}>
                        <input type="text" placeholder="Author" onChange={this.handleAuthorChange} />
                        <Label pointing="left">Enter Fullname</Label>
                    </Form.Field>

                    <Form.Field inline={true}>
                        <input type="date" placeholder="Date" onChange={this.handleDateChange} />
                        <Label pointing="left">Enter Date</Label>
                    </Form.Field>

                    {/*Starting work time and # of hours worked input **/}
                    <Form.Field inline={true}>
                        <Form.Field inline={true}>
                            <Label pointing="right">Enter Starting Work Time</Label>
                            <input type="time" placeholder="Start Time" onChange={this.handleStartTimeChange}/>
                        </Form.Field>
                        <Form.Field inline={true}>
                            <input type="number" placeholder="Hours" min="0" onChange={this.handleHoursChange}/>
                            <Label pointing="left">Enter # of Hours Worked</Label>
                        </Form.Field>
                    </Form.Field>

                    {/**Description input area*/}
                    <Form.Field>
                        <Label pointing="below">Enter Description</Label>
                        <br/>
                        <TextArea placeholder="Description of Work Done" onChange={this.handleDescriptionChange} style={{ resize: 'none', width: '20%'}}/>
                    </Form.Field>

                    {/**START: Task inputs**/}
                    <Accordion>
                        <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleOptionalVisibility} style={{color: 'white'}}>
                            <Icon name='dropdown'/>
                            Optional: Remaining Tasks
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 0}>
                            
                            {/*Due date input*/}
                            <Form.Field inline={true}>
                                <input type="date" placeholder="Expected Date of Completion" onChange={this.handleDueDateChange} />
                                <Label pointing="left">Due Date</Label>
                            </Form.Field>

                            {/**Task list input*/}
                            <Form.Field>
                                <Label pointing='below'>Tasks</Label>
                                <br />
                                <div style={{ height: '100px', overflowY: 'scroll', width: '20%', position: 'relative', left: '40%', overflowX: 'hidden', overflow: 'auto' }}>
                                    {this.renderTaskList()}
                                </div>
                            </Form.Field>
                            <Label onClick={this.handleAddTask} style={{ cursor: ' pointer', backgroundColor: '#777777' }}>
                                <Icon name='plus' color='green' />
                                Add Task
                            </Label>
                            {/*<Label onClick={this.testShow}>Show</Label>*/}
                        </Accordion.Content>
                    </Accordion>
                    <Divider />
                    <Button secondary={true} type="submit">Submit</Button>
                </Form>
                {/*END: Main component*/}

                {/*This is the dialog for the positive */}
                <Modal size={dialogSize} open={submitDialogOpen} onClose={this.dialogClose} className='dialog-position'>
                    <Modal.Header>
                        Worklog Submission
                    </Modal.Header>
                    <Modal.Content>
                        <p> Your worklog has been submitted successfully </p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button positive={true} icon='checkmark' labelPosition='right' content='Okay' onClick={this.dialogClose}/>
                    </Modal.Actions>
                </Modal>

                {/*This is the dialog for the NEGATIVE */}
                <Modal size={dialogSize} open={errorDialogOpen} onClose={this.dialogClose} className='dialog-position'>
                    <Modal.Header>
                        Worklog Submission
                    </Modal.Header>
                    <Modal.Content>
                        <p> Your worklog has failed to submit. Please try again </p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative={true} icon='remove' labelPosition='right' content='Okay' onClick={this.dialogClose} />
                    </Modal.Actions>
                </Modal>

            </div>
        );
    }
}

//withRouter doesn't work
export default AddWorklog;