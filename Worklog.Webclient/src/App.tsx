import * as React from 'react';
import './App.css';
import AppContainer from './container/AppContainer';
import { BrowserRouter } from 'react-router-dom';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <AppContainer />
                </BrowserRouter>
            </div>
        );
    }
}

export default App;

