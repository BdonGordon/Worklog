import * as React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Routes from '../routes/index';
import Header from '../components/Header/containers/HeaderContainer';
import '../App.css';

class CoreLayout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <div>
                        <Header />
                    </div>
                    <div>
                        <Routes/>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default CoreLayout;