import * as React from 'react';
import './App.css';
import './core.css'; //NEEDS TO BE INCLUDED to make UI happen; produced by core.scss
import AppContainer from './container/AppContainer';
import { BrowserRouter } from 'react-router-dom';
import { Store } from 'redux';
import { configureStore } from './store/createStore';
const initialState = window.__INITIAL_STATE__;
const store: Store<any> = configureStore(initialState);

class App extends React.Component<{}, {}> {
    render() {
        return (
            //DOC: This is where we pass the store into AppContainer as a prop to utilize; we do not implement this until STEP 5
            //DOC: The portion below would only look like: <AppContainer/>
            <AppContainer store={store}/>
        );
    }
}

export default App;

