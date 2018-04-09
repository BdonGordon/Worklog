import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Image, List } from 'semantic-ui-react';
import { WorklogProps } from '../containers/WorklogContainer';

class Worklog extends React.Component<WorklogProps.IProps, WorklogProps.IState> {
    constructor(props: WorklogProps.IProps) {
        super(props); 

        this.createList = this.createList.bind(this);
    }

    //componentMount() => initializeWorklogs() {this.props.getWorklogs}
    componentDidMount() {
        this.props.getWorklogs();
    }

    createList() {
        if (this.props.worklogList.length > 0) {
            return this.props.worklogList.map((worklog) => {
                return (
                    <List selection={true} verticalAlign='middle' size='small' key={worklog.WorklogID} >
                        <List.Item>
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
            </div>
        );
    }
}

/**
<List selection={true} verticalAlign='middle' size='small'>
                        <List.Item>
                            <List.Content>
                                <List.Header className="cardview-list">Subject</List.Header>
                                <List.Description>Author</List.Description>
                            </List.Content>
                        </List.Item>
                    </List>
**/

export default Worklog;
//export default withRouter(Worklog);