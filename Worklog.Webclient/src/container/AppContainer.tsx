import * as React from 'react';
import CoreLayout from '../layouts/CoreLayout';
import { Provider, Store } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import makeRootReducer from '../store/reducers';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';

const composeEnhancers = (typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const middlewares: any = [
    //throttleActions([REFRESH_TOKEN_REQUEST], 2500),
    apiMiddleware,
    thunk
];

export const store = createStore(
    makeRootReducer, composeEnhancers(applyMiddleware(...middlewares))
);

class AppContainer extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <CoreLayout />
            </Provider>
        );
    }
}

export default AppContainer;