import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Sidebar, Segment, Button, Menu, Image, Icon } from 'semantic-ui-react';

export interface ICoreLayoutProps {
    history?: { push: any };
}
export interface IState {
   
    visible: boolean;
}

const initialState: IState = {
    
    visible: false
};

class Header extends React.Component<ICoreLayoutProps, IState> {
    constructor(props: ICoreLayoutProps) {
        super(props);
        this.state = initialState;

        this.goHome = this.goHome.bind(this);
        this.goAddWorklog = this.goAddWorklog.bind(this);
    }

    goHome() {
        console.log("Home");
    }

    goAddWorklog() {
        console.log("Add worklog");
    }

    render() {
        const { visible } = this.state;

        return (
            <div >
                <Sidebar.Pushable as={Segment} className="menu-bar-details">
                    <Sidebar as={Menu} animation='overlay' direction='top' width='thin' visible={true} icon='labeled' vertical={false} inverted={true}>
                        <Menu.Item name='home' as={Link} to='/' >
                            <Icon name='home' />
                                Home
                        </Menu.Item>
                        <Menu.Item name='write' as={Link} to='/addworklog' >
                            <Icon name='write' />
                            Add Worklog
                        </Menu.Item>
                        <Menu.Item name='camera'>
                            <Icon name='camera' />
                            Channels
                    </Menu.Item>
                    </Sidebar>
                </Sidebar.Pushable>
                
            </div>
        );
    }
}
export default Header;


