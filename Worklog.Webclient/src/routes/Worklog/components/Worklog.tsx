import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { Image, List } from 'semantic-ui-react';
import { WorklogProps } from '../containers/WorklogContainer';

class Worklog extends React.Component<WorklogProps.IProps, WorklogProps.IState> {
    constructor(props: WorklogProps.IProps) {
        super(props); 

        this.createList = this.createList.bind(this);
    }

    createList() {
        if (this.props.worklogList.length < 1) {
            return null;
        }
        return this.props.worklogList.map((worklog) => {
            return (
                <List selection={true} verticalAlign='middle' size='small' key={worklog.StartTime} >
                <List.Item>
                    <List.Content>
                        <List.Header className="cardview-list">{worklog.Subject}</List.Header>
                        <List.Description>{worklog.Author}</List.Description>
                    </List.Content>
                </List.Item>
                </List>);
            });
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