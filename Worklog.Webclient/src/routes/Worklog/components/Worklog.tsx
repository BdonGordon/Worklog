import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Toaster, Position, Intent } from '@blueprintjs/core';
import { Button, Header, Image, Modal, List, Icon, Grid, Divider, Accordion, TextArea } from 'semantic-ui-react';
import { WorklogProps } from '../containers/WorklogContainer';
import { IWorklog, ITask } from '../../../models/Worklog';

const initialState: WorklogProps.IState = {
    isSelected: false,
    modalTitle: '',
    modalAuthor: '',
    modalDescription: '',
    modalTimestamp: '',
    modalDate: '',
    selectedDate: '',
    week: new Array(),
    activeIndex: -1,
    isDeleted: false,
    isEditing: false,
    isEditSaved: false,
    editedDescription: ''
};

const toaster = Toaster.create({
    position: Position.BOTTOM
});

class Worklog extends React.Component<WorklogProps.IProps, WorklogProps.IState> {
    constructor(props: WorklogProps.IProps) {
        super(props); 

        this.state = initialState;

        this.renderWorklogList = this.renderWorklogList.bind(this);
        this.handleLogClick = this.handleLogClick.bind(this);
        this.modalClose = this.modalClose.bind(this);
        //Tasks functions 
        this.renderWeekList = this.renderWeekList.bind(this);
        this.toggleTaskDate = this.toggleTaskDate.bind(this);
        this.matchDate = this.matchDate.bind(this);

        this.handleDeleteCancelWorklog = this.handleDeleteCancelWorklog.bind(this);
        this.handleEditSaveWorklog = this.handleEditSaveWorklog.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    }

    componentWillMount() {
        this.props.getWorklogs();
    }

    componentDidMount() {
        this.createWeekList();
    }

    /**
     * When a worklog cardview is clicked
     * @param worklog
     */
    handleLogClick(worklog: IWorklog) {
        let date: Date = new Date(worklog.DateCreated);
        let dateString = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

        this.setState({
            isSelected: true,
            modalTitle: worklog.Subject,
            modalAuthor: worklog.Author,
            modalDescription: worklog.Description,
            modalTimestamp: worklog.StartTime,
            modalDate: dateString,
            selectedWorklog: worklog //deleting purposes
        });
    }

    /**
     * Simply closes the Worklog Modal 
     */
    modalClose() {
        this.setState({
            isSelected: false,
            isDeleted: false,
            isEditing: false,
            isEditSaved: false
        });
    }

    /**
     * Retrieves the worklogs from the database and renders it on the left of the component
     */
    renderWorklogList() {
        if (this.props.worklogList.length > 0) {
            return this.props.worklogList.map((worklog) => {
                return (
                    <List selection={true} verticalAlign='middle' size='small' key={worklog.WorklogID}>
                        <List.Item onClick={() => this.handleLogClick(worklog)}>
                            <List.Content>
                                <List.Header className="cardview-list">{worklog.Subject}</List.Header>
                                <List.Description>{worklog.Author}</List.Description>
                            </List.Content>
                        </List.Item>
                    </List>
                );
            });
        }

        return <p>Empty worklog</p>;
    }


    /**START: This is for the TASKS section (right side of the component)**/
    /**
     * Create the list of the next 7 days for the list to the right of the component
     */
    createWeekList() {
        let date: Date = new Date(Date.now());
        let index: number;
        let nextDay: Date = new Date();
        let dateString: string;
        let week: Array<string> = new Array();

        for (index = 0; index < 7; index++){
            nextDay.setDate(date.getDate() + index);
            dateString = nextDay.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
            week.push(dateString);
        }
        this.setState({
            week: week
        });
    }

    /**
     * When a date is selected, the accordian for that one is opened
     * TODO: Make it open multiple panels at once
     * @param e
     * @param addedIndex
     */
    toggleTaskDate(e, titleProps) {
        const { index } = titleProps;
        const { activeIndex } = this.state;
        //if the activeIndex === index ? -1 (if you click the active index) : (OR) you click a NEW index
        const newIndex: number = activeIndex === index ? -1 : index;
            
        this.setState({
            activeIndex: newIndex,
            selectedDate: titleProps.children[1]
        });
    }

    /**
     * This is where the "magic" happens. This provides the LIST OF TASKS according to the selected date
     * that is then passed into the method renderWeekList() 
     */
    matchDate() {
        let chosenDate: string = this.state.selectedDate;

        //TOOK TIME HERE because I forgot to include the "return" of the entire mapping... REMEMBER THE RETURN FUNCTION
        return (this.props.worklogList.map((worklog) => {
            if (worklog.Tasks !== null) {
                let dateKey: string = 'duedate';
                let taskJson: string = JSON.parse(worklog.Tasks);
                let date: string = taskJson[dateKey];
                let matchingDate = new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

                if (chosenDate === matchingDate) {
                    let taskKey = "tasks";
                    let tasks: Array<string> = taskJson[taskKey];

                    return (
                        tasks.map((task, index) => {
                            return <List key={index} style={{ color: 'white' }}>{task}</List>;
                        })
                    );
                }
            }
            return null;
        })
        );
    }

    handleDeleteCancelWorklog() {
        let deletedWorklog: IWorklog = this.state.selectedWorklog;

        if (!this.state.isEditing) {
            this.props.deleteWorklog(deletedWorklog).then((result) => {
                if (result.error) {
                    console.log("Error while adding log : " +
                        !!result.payload && !!result.payload.response ? result.payload.response.message : 'Unknown error');
                }
                else {

                }
            });

            this.setState({
                isSelected: false,
                isDeleted: true,
                isEditing: false,
                isEditSaved: false
            });
        }
        //For Canceling the EDIT
        else {
            this.setState({
                isEditing: false,
                isEditSaved: false
            });
        }
    }

    handleEditSaveWorklog() {
        //Initial state when a log is clicked; gives the option to EDIT
        if (!this.state.isEditing) {
            this.setState({
                isEditing: true
            });
        }
        //To SAVE the changes to the description
        else {
            let newDescription: string = this.state.editedDescription;
            this.setState({
                isEditing: false,
                isEditSaved: true,
                modalDescription: newDescription
            });
        }
    }

    handleDescriptionChange(e: React.FormEvent<HTMLTextAreaElement>) {
        this.setState({
            editedDescription: e.currentTarget.value
        });
    }

    /**
     * Firstly, this method is called for the RIGHT side of the component to render the dates from TODAY up until the next 7 days
     * Each of these dates are rendered as Accordians which will have the contain of the tasks that pertain to that particular date
     */
    renderWeekList() {
        return (this.state.week.map((day, index) => {
            return (
                <Accordion key={index} exclusive={false}>
                    <Accordion.Title style={{ color: 'white' }} index={index} active={this.state.activeIndex === index} onClick={this.toggleTaskDate}>
                        <Icon name='dropdown' />
                        {day}
                    </Accordion.Title>
                    <Accordion.Content active={this.state.activeIndex === index}>
                        <ul>
                            {this.matchDate()}
                        </ul>
                    </Accordion.Content>
                </Accordion>
            );
        }));
    }

    deleteCancelTitleChange() {
        if (!this.state.isEditing) {
            return 'Delete';
        }
        return 'Cancel Changes';
    }

    editSaveTitleChange() {
        if (!this.state.isEditing) {
            return 'Edit';
        }
        return 'Save Changes';
    }

    /**END: This is for the TASKS section (right side of the component)**/

    render() {
        const { activeIndex } = this.state;

        return (
            <div>
                {/*Main component layout*/}
                <div style={{ textAlign: 'center' }}>
                    <Grid columns={3}>
                        <Grid.Column>
                            <h2>Worklog</h2>
                            <ul>
                                {this.renderWorklogList()}
                            </ul>
                        </Grid.Column>
                        <Grid.Column>
                            <Divider vertical={true} fitted={true} style={{ height: '100%' }}/>
                        </Grid.Column>
                        <Grid.Column>
                            <h2>Tasks to Complete</h2>
                            {this.renderWeekList()}
                        </Grid.Column>
                    </Grid>
                </div>

                {/*Modal to show the worklog that has been pressed*/}
                <Modal size='small' className='dialog-position' open={this.state.isSelected} closeIcon={true} onClose={this.modalClose} closeOnRootNodeClick={false}>
                    <Modal.Header>{this.state.modalTitle} <small><i>by</i></small> <small>{this.state.modalAuthor} - {this.state.modalDate}</small></Modal.Header>
                    <Modal.Description>
                        <div className="cardview-modal">
                            <Header><small>Posted at {this.state.modalTimestamp}</small></Header>
                            <pre hidden={this.state.isEditing}>{this.state.modalDescription}</pre>
                            <textarea style={{ resize: 'none', width: '95%', visibility: !this.state.isEditing ? 'hidden' : 'visible', height: '60px' }} defaultValue={this.state.modalDescription} onChange={this.handleDescriptionChange}/>
                        </div>
                    </Modal.Description>
                    <Modal.Actions>
                        {/*When the user initially selects a log... Delete and Edit are the first options*/}
                        <Button negative={true} onClick={this.handleDeleteCancelWorklog} > <Icon name='remove' />{this.deleteCancelTitleChange()}</Button>
                        <Button color={!this.state.isEditing ? 'grey' : 'green'} onClick={this.handleEditSaveWorklog}> <Icon name='write' />{this.editSaveTitleChange()}</Button>
                    </Modal.Actions>
                </Modal>

                {/*Modal to let user know they successfully deleted a worklog... I prefer toast but w/e*/}
                <Modal size='tiny' className='dialog-position' open={this.state.isDeleted} closeIcon={true} onClose={this.modalClose} closeOnEscape={true}>
                    <Modal.Header>Delete Successful</Modal.Header>
                    <Modal.Description>
                        <div className="cardview-modal">
                            <pre><Icon name='checkmark'/> Successfully deleted worklog {this.state.modalTitle}</pre>
                        </div>
                    </Modal.Description>
                </Modal>

            </div>
        );
    }
}

export default Worklog;
//export default withRouter(Worklog);