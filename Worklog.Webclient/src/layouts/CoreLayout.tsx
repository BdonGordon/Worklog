import * as React from 'react';
import { BrowserRouter, Route, NavLink, Link  } from 'react-router-dom';
import Routes from '../routes/index';
import Header from '../components/Header/containers/HeaderContainer';
import { Sidebar, Segment, Button, Menu, Image, Icon } from 'semantic-ui-react';
import '../App.css';

export interface IState {
    isVisible: boolean;
}

class CoreLayout extends React.Component<null, IState> {
    constructor(props) {
        super(props);

        this.state = {
            isVisible: true
        };
        this.toggleVisibility = this.toggleVisibility.bind(this);
    }

    toggleVisibility() {
        this.setState({
            isVisible: !this.state.isVisible
        });
    }

    render() {
        const { isVisible } = this.state;

        return (
            <BrowserRouter>
                <div>
                    <Sidebar.Pushable as={Segment}>
                        <Sidebar as={Menu} animation='push' direction='left' width='thin' visible={this.state.isVisible} icon='labeled' vertical={true} inverted={true}>
                            {/*as={Link} to='/'*/} 
                            <Menu.Item name='home' as={Link} to='/'>
                                <Icon name='home' />
                                Home
                        </Menu.Item>
                            {/*as={Link} to='/addworklog'*/}
                            <Menu.Item name='write' as={Link} to='/addworklog'>
                                <Icon name='write' />
                                Add Worklog
                        </Menu.Item>
                        </Sidebar>
                        <Sidebar.Pusher>
                            <Segment className="addlog-main-div">
                                <Routes />   
                            </Segment>
                        </Sidebar.Pusher>
                    </Sidebar.Pushable>
                </div>
            </BrowserRouter>
        );
    }
}

export default CoreLayout;