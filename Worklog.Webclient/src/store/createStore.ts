import { applyMiddleware, compose, createStore, Store } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';
import makeRootReducer from './reducers';

export function configureStore(initialState?: any): Store<any> {
    const middlewares: any = [
        //throttleActions([REFRESH_TOKEN_REQUEST], 2500),
        apiMiddleware,
        thunk
    ];

    const composeEnhancers = (
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

    let newState = initialState || {};

    const store = createStore(makeRootReducer, newState, composeEnhancers(
        applyMiddleware(...middlewares)
    ));

    return store;
}