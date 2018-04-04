import * as React from 'react';
import { withRouter } from 'react-router-dom';

class Worklog extends React.Component {
    constructor(props) {
        super(props); 
    }

    render() {
        return (
            <div>
                <h4>Worklog component</h4>
            </div>
        );
    }
}

export default withRouter(Worklog);