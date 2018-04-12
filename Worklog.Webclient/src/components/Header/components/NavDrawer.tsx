import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Sidebar, Segment, Button, Menu, Image, Icon } from 'semantic-ui-react';

export interface ICoreLayoutProps {
    
    history?: { push: any };
}
export interface IState {
    isVisible: boolean;
}

const initialState: IState = {
    isVisible: false
};

class NavDrawer extends React.Component<ICoreLayoutProps, IState> {
    constructor(props: ICoreLayoutProps) {
        super(props);
        this.state = initialState;

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
            <div style={{ margin: 0, padding: 0, height: '100%' }}>
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
                        <Segment>
                            {this.props.children}
                            <Button secondary={true} onClick={this.toggleVisibility}>Menu</Button>
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        );
    }
}
export default NavDrawer;


