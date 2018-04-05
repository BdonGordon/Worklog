import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Worklog from './Worklog/containers/WorklogContainer';
import AddWorklog from './Worklog/containers/AddWorklogContainer';

class Routes extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact={true} path="/" component={Worklog} />
                    <Route path="/addworklog" component={AddWorklog} />
                </Switch>
            </div>
        );
    }
}

export default Routes;