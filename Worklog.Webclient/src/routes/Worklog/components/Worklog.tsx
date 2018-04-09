import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Header, Image, Modal, List, Icon } from 'semantic-ui-react';
import { WorklogProps } from '../containers/WorklogContainer';
import { IWorklog } from '../../../models/Worklog';

const initialState: WorklogProps.IState = {
    isSelected: false,
    modalTitle: '',
    modalAuthor: '',
    modalDescription: '',
    modalTimestamp: '',
    modalDate: ''
};

class Worklog extends React.Component<WorklogProps.IProps, WorklogProps.IState> {
    constructor(props: WorklogProps.IProps) {
        super(props); 

        this.state = initialState;

        this.createList = this.createList.bind(this);
        this.handleLogClick = this.handleLogClick.bind(this);
        this.modalClose = this.modalClose.bind(this);
    }

    //componentMount() => initializeWorklogs() {this.props.getWorklogs}
    componentDidMount() {
        this.props.getWorklogs();
    }

    /**
     * When a worklog cardview is clicked
     * @param worklog
     */
    handleLogClick(worklog: IWorklog) {
        let date: Date = new Date(worklog.DateCreated);
        let dateString = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric'});
        //let dateString = date.toUTCString().substr(date.toUTCString.length - 12, date.toUTCString.length);

        console.log(dateString);

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

    createList() {
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

    render() {
        return (
            <div className="addlog-main-div">
                <h4>Worklog</h4>
                <div>
                    <ul>
                        {this.createList()}
                    </ul>
                </div>

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