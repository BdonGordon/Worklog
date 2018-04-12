import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Header, Image, Modal, List, Icon, Grid, Divider, Accordion } from 'semantic-ui-react';
import { WorklogProps } from '../containers/WorklogContainer';
import { IWorklog } from '../../../models/Worklog';

const initialState: WorklogProps.IState = {
    isSelected: false,
    modalTitle: '',
    modalAuthor: '',
    modalDescription: '',
    modalTimestamp: '',
    modalDate: '',
    week: new Array()
};

class Worklog extends React.Component<WorklogProps.IProps, WorklogProps.IState> {
    constructor(props: WorklogProps.IProps) {
        super(props); 

        this.state = initialState;

        this.renderWorklogList = this.renderWorklogList.bind(this);
        this.renderWeekList = this.renderWeekList.bind(this);
        this.handleLogClick = this.handleLogClick.bind(this);
        this.modalClose = this.modalClose.bind(this);
    }

    //componentMount() => initializeWorklogs() {this.props.getWorklogs}
    componentDidMount() {
        this.props.getWorklogs();
        this.createWeekList();
    }

    /**
     * When a worklog cardview is clicked
     * @param worklog
     */
    handleLogClick(worklog: IWorklog) {
        let date: Date = new Date(worklog.DateCreated);
        let dateString = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
        //let dateString = date.toUTCString().substr(date.toUTCString.length - 12, date.toUTCString.length);

        //console.log(dateString);

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

        return <p>Bye</p>;
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

    /**
     * Display the list in the component
     */
    renderWeekList() {
        return (this.state.week.map((day) => {
            return <li key={day}>{day}</li>;
        }));
        
    }

    render() {
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
                            <ul>
                                {this.renderWeekList()}
                            </ul>
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