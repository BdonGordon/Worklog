import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { AddWorklogProps } from '../containers/AddWorklogContainer';
import { IWorklog } from '../../../models/Worklog';
import { Divider, Form, Label, TextArea, Button, Modal } from 'semantic-ui-react';
import * as moment from 'moment';

const initialState: AddWorklogProps.IState = {
    errorDialogOpen: false,
    submitDialogOpen:  false,
    Subject: '',
    Author: '',
    DateCreated: new Date(Date.now()),
    StartTime: '',
    HoursWorked: 0,
    Description: ''
};


class AddWorklog extends React.Component<AddWorklogProps.IProps, AddWorklogProps.IState> {
    //: AddWorklogProps.IProps
    constructor(props: AddWorklogProps.IProps) {
        super(props);
        this.state = initialState;
        this.handleSubjectChange = this.handleSubjectChange.bind(this);
        this.handleAuthorChange = this.handleAuthorChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleHoursChange = this.handleHoursChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        //Submit dialog functions
        this.dialogShow = this.dialogShow.bind(this);
        this.dialogClose = this.dialogClose.bind(this);
        this.errorDialogShow = this.errorDialogShow.bind(this);

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

    /*
    handleSubmit(e: React.FormEvent<HTMLButtonElement>, form: React.FormEvent<HTMLFormElement>) {
        let worklog: IWorklog = {
            Subject: this.state.Subject,
            Author: this.state.Author,
            DateCreated: this.state.DateCreated,
            StartTime: this.state.StartTime,
            HoursWorked: this.state.HoursWorked,
            Description: this.state.Description
        };
        this.props.addWorklog(worklog).then((result) => {
            if (result.error) {
                console.log("Error while adding log : " +
                    !!result.payload && !!result.payload.response ? result.payload.response.message : 'Unknown error');
                this.errorDialogShow('mini');
            }
            else {
                console.log("Log added successfully");
                this.dialogShow('mini');
            }
        });
    }*/

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

    handleFormSubmit(e: React.FormEvent<HTMLFormElement> ) {
        /*let form: HTMLFormElement = e.currentTarget;
        if (this.state.submitDialogOpen) {
            form.reset();
        }*/
        let form: HTMLFormElement = e.currentTarget;
        let worklog: IWorklog = {
            Subject: this.state.Subject,
            Author: this.state.Author,
            DateCreated: this.state.DateCreated,
            StartTime: this.state.StartTime,
            HoursWorked: this.state.HoursWorked,
            Description: this.state.Description
        };
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
    }

    render() {
        const { submitDialogOpen, errorDialogOpen, dialogSize } = this.state;

        return (
            <div className="addlog-main-div">
                <h4>Add Worklog component</h4>
                <Form onSubmit={this.handleFormSubmit}>
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

                    <Form.Field inline={true} className="addlog-text-area">
                        <TextArea placeholder="Description of Work Done" onChange={this.handleDescriptionChange}/>
                        <Label pointing="above">Enter Description</Label>
                    </Form.Field>
                    <Divider />
                    <Button secondary={true}>Submit</Button>
                </Form>

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