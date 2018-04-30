import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Worklog from './Worklog/containers/WorklogContainer';
import AddWorklog from './Worklog/containers/AddWorklogContainer';
//DOC: This is where all of the application's routes will be imported and exported from

class Routes extends React.Component {
    render() {
        return (
            <div>
                {/*DOC: The switch statements allows us to "traverse" between each of the routes*/}
                <Switch>
                    {/*DOC: For our FIRST page presented in the application, we want to declar its path="/". This is the most we need to define
                    a Route attribute in the <div>*/}
                    <Route exact={true} path="/" component={Worklog} />
                    {/*DOC: Typically, whatever the component's name is determines what the path name is (lowercase letters)*/}
                    <Route path="/addworklog" component={AddWorklog} />
                </Switch>
            </div>
        );
    }
}

export default Routes;