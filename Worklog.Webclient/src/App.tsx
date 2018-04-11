import * as React from 'react';
import './App.css';
import AppContainer from './container/AppContainer';
import { BrowserRouter } from 'react-router-dom';
import { Store } from 'redux';
import { configureStore } from './store/createStore';
const initialState = window.__INITIAL_STATE__;
const store: Store<any> = configureStore(initialState);

class App extends React.Component<{}, {}> {
    render() {
        return (
            <AppContainer store={store}/>
        );
    }
}

export default App;

