import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { AddWorklogProps } from '../containers/AddWorklogContainer';
import { IWorklog } from '../../../models/Worklog';
import { Divider, Form, Label, TextArea, Button } from 'semantic-ui-react';

const initialState: AddWorklogProps.IState = {
    Subject: '',
    Author: ''
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
        this.handleSubmit = this.handleSubmit.bind(this);
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

    }

    handleStartTimeChange(e: React.FormEvent<HTMLInputElement>) {

    }

    handleHoursChange(e: React.FormEvent<HTMLInputElement>) {

    }

    handleDescriptionChange(e: React.FormEvent<HTMLTextAreaElement>) {

    }
    
    handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
        let worklog: IWorklog = {
            Subject: this.state.Subject,
            Author: this.state.Author
        };
        this.props.addWorklog(worklog).then((result) => {
            if (result.error) {
                console.log("Error while adding log : " +
                    !!result.payload && !!result.payload.response ? result.payload.response.message : 'Unknown error');
            }
            else {
                console.log("Log added successfully");
            }
        });
    }
  
    render() {
        return (
            <div className="addlog-main-div">
                <h4>Add Worklog component</h4>
                <Form>
                    <Form.Field inline={true}>
                        <input type="text" placeholder="Subject" onChange={this.handleSubjectChange} />
                        <Label pointing="left">Enter Subject Name</Label>
                    </Form.Field>

                    <Form.Field inline={true}>
                        <input type="text" placeholder="Author" onChange={this.handleAuthorChange} />
                        <Label pointing="left">Enter Fullname</Label>
                    </Form.Field>

                    <Form.Field inline={true}>
                        <input type="date" placeholder="Date" onChange={this.handleDateChange}/>
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
                    <Button secondary={true} onClick={this.handleSubmit}>Submit</Button>
                </Form>
            </div>
        );
    }
}

//withRouter doesn't work
export default AddWorklog;