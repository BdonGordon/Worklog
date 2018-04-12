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
            <div style={{ margin: 0, padding: 0, height: '100%'}}>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar as={Menu} animation='overlay' direction='bottom' width='thin' visible={true} icon='labeled' vertical={false} inverted={true}>
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
                    <Sidebar.Pusher style={{ backgroundColor: '#545556', borderColor: '#545556'}}>
                        <div style={{ padding: '15px', backgroundColor: '#545556', borderColor: '#545556' }}>
                            {this.props.children}
                        </div>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        );
    }
}
export default NavDrawer;

//style={{position: 'absolute', bottom: '0px'}}

//                            <Button secondary={true} onClick={this.toggleVisibility}>Menu</Button>

