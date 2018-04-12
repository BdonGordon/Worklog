import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Segment, Button, Menu, Image, Icon } from 'semantic-ui-react';

export interface IState {
    activePage: string;
}

class MenuBar extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            activePage: ''
        };
        this.handlePageSelect = this.handlePageSelect.bind(this);
    }

    handlePageSelect(e, { name }) {
        this.setState({
            activePage: name
        });
    }

    render() {
        const { activePage } = this.state;

        return (
            <div>
                <Menu stackable={true} inverted={true} size='massive'>
                    <Menu.Item name='home' active={activePage === 'home'} onClick={this.handlePageSelect} as={Link} to='/'>
                        Home
                    </Menu.Item>

                    <Menu.Item name='addworklog' active={activePage === 'addworklog'} onClick={this.handlePageSelect} as={Link} to='/addworklog'>
                        Add Worklog
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default MenuBar;