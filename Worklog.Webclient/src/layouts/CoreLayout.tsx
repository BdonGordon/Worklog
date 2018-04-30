import * as React from 'react';
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
    }

    render() {

        return (
            <BrowserRouter>
                <div className="core-layout__viewport" style={{ margin: 0, padding: 0, height: '100%' }}>
                    <div className="layoutMain">
                        <div className="layoutHeader">
                            <div style={{ textAlign: 'center' }}>
                                {/*DOC: This is optional, but basically any type of menu bar or navigation drawer belongs in src/components/ directory. More vaguely,
                                anything in the application that could be seen as a "standalone" component*/}
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