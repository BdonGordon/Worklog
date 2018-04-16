import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Header, Image, Modal, List, Icon, Grid, Divider, Accordion } from 'semantic-ui-react';
import { WorklogProps } from '../containers/WorklogContainer';
import { IWorklog, ITask } from '../../../models/Worklog';
import _ from 'lodash';

const initialState: WorklogProps.IState = {
    isSelected: false,
    modalTitle: '',
    modalAuthor: '',
    modalDescription: '',
    modalTimestamp: '',
    modalDate: '',
    activeIndex: -1,
    dueDate: new Date(),
    tasks: new Array(),
    week: new Array(),
    taskObject: new Array()
};

class Worklog extends React.Component<WorklogProps.IProps, WorklogProps.IState> {
    constructor(props: WorklogProps.IProps) {
        super(props); 

        this.state = initialState;

        this.renderWorklogList = this.renderWorklogList.bind(this);
        this.handleLogClick = this.handleLogClick.bind(this);
        this.modalClose = this.modalClose.bind(this);

        //Tasks functions 
        this.renderWeekList = this.renderWeekList.bind(this);
        this.createTasks = this.createTasks.bind(this);
        this.matchDate = this.matchDate.bind(this);
        this.dailyTasksContent = this.dailyTasksContent.bind(this);
    }

    componentWillMount() {
        this.props.getWorklogs();
    }

    //componentMount() => initializeWorklogs() {this.props.getWorklogs}
    componentDidMount() {
        this.createWeekList();
    }

    componentWillUnmount() {
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
            modalDate: dateString
        });
    }

    /**
     * Simply closes the Modal 
     */
    modalClose() {
        this.setState({
            isSelected: false
        });
    }

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
            //return <p>Hello</p>;
        }

        return <p>Empty worklog</p>;
    }


    /**START: This is for the TASKS section (right side of the component)**/

    /**
     * This creates the  
     */
    createTasks(): Array<string> {
        let taskList: Array<string> = new Array();

        if (this.props.worklogList.length > 0) {
            this.props.worklogList.map((worklog) => {
                if (worklog.Tasks !== null) {
                    let task = worklog.Tasks;
                    let parseTask = JSON.parse(task, function (key, value) {
                        if (key === "duedate") {
                            let dateString: string = new Date(value).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

                            return dateString;
                        }
                        else {
                            return value;
                        }
                    });
                    taskList.push(parseTask);

                    /*this.setState({
                        tasks: taskList
                    });*/
                    //console.log(taskList);
                }
            });
        }

        return taskList;
    }

    /**
     * Create the list of the next 7 days
     */
    createWeekList() {
        let date: Date = new Date(Date.now());
        let index: number;
        let nextDay: Date = new Date();
        let dateString: string;
        let week: Array<string> = new Array();

        for (index = 0; index < 7; index++){
            nextDay.setDate(date.getDate() + index);
            dateString = nextDay.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
            week.push(dateString);
        }
        this.setState({
            week: week
        });
    }

    matchDate(element, array: Array<any>) {
        
    }

    dailyTasksContent() {
        let tasks = this.createTasks();
        let tasksArray: Array<ITask> = this.state.taskObject;
        let iTask: ITask;

        tasks.map((taskObject, index) => {
            //taskObject looks like this: {duedate: "April 25, 2018", tasks: Array(1)}. We access the "keys" of taskObject through the way below
            let dateKey = "duedate";
            let tasksKey = "tasks";
            let taskDueDate: string = taskObject[dateKey]; //this is how we access the string of the JSON parsed value
            let tasksByDate: Array<string> = taskObject[tasksKey];
            //console.log(taskDueDate);
            tasksByDate.map((task) => {
                //console.log(task);
                iTask = {
                    date: taskDueDate,
                    key: index,
                    value: task
                };
                tasksArray.push(iTask);
            });
        });

        return tasksArray;
    }

    /**
     * Display the list in the component
     */
    renderWeekList() {

        let tasks: Array<ITask> = this.dailyTasksContent();
        return (this.state.week.map((day, index) => {
            let test: Array<string> = this.state.week;
            const panels = _.times(1, () => ({
                title: day,
                content: tasks.filter
            }));
            return (
                <Accordion key={index} panels={panels} exclusive={false} />
            );
        }));
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
                <Modal size='small' className='dialog-position' open={this.state.isSelected} closeIcon={true} onClose={this.modalClose} closeOnEscape={true}>
                    <Modal.Header>{this.state.modalTitle} <small><i>by</i></small> <small>{this.state.modalAuthor} - {this.state.modalDate}</small></Modal.Header>
                    <Modal.Description>
                        <div className="cardview-modal">
                            <Header><small>Posted at {this.state.modalTimestamp}</small></Header>

                            <pre>{this.state.modalDescription}</pre>
                        </div>
                    </Modal.Description>
                    <Modal.Actions>
                        <Button negative={true}><Icon name='remove' />Delete</Button>
                        <Button color='grey'><Icon name='write' />Edit</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

export default Worklog;
//export default withRouter(Worklog);