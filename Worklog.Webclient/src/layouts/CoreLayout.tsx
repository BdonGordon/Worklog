﻿import * as React from 'react';
import { BrowserRouter, Route, NavLink, Link  } from 'react-router-dom';
import Routes from '../routes/index';
import MenuBar from '../components/MenuBar/containers/MenuBarContainer';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';

export interface ICoreLayoutProps {
}

export interface IState {
    isVisible: boolean;
}

class CoreLayout extends React.Component<ICoreLayoutProps, IState> {
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
                <div className="core-layout__viewport" style={{ margin: 0, padding: 0, height: '100%' }}>
                    <div className="layoutMain">
                        <div className="layoutHeader">
                            <div style={{ textAlign: 'center' }}>
                                <MenuBar/>
                            </div>
                        </div>

                        <div className="layoutRoutes">
                            <Routes />
                        </div>
                        
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default CoreLayout;