/** Global definitions for developement **/
// for redux devtools extension
declare interface Window {
    // A hack for the Redux DevTools Chrome extension.
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: <F extends Function>(f: F) => F;
    __INITIAL_STATE__?: any;
    // The redux developer tools window
    devToolsExtension?: any;
}

declare var NODE_ENV: string;
declare var __DEV__: Boolean;
declare var __PROD__: Boolean;
declare var __DEBUG__: Boolean;
declare var __DEBUG_NEW_WINDOW__: Boolean;
declare var __BASENAME__: string;

declare interface IAction {
    payload?: {},
    type?: string
}

declare interface ICallApiAction {
    [x: number]: {
        endpoint?: string,
        method?: string,
        types?: Array<string | object>,
        headers?: { 'Content-Type': string },
        body?: any
    }
}