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

    //DOC: not created without until STEP 5; makeRootReducer was imported from our reducers file to be placed as the first argument of createStore()
    const store = createStore(makeRootReducer, newState, composeEnhancers(
        applyMiddleware(...middlewares)
    ));

    return store;
}