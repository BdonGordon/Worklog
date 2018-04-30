import * as React from 'react';
import CoreLayout from '../layouts/CoreLayout';
import { Store } from 'redux';
import { Provider } from 'react-redux';

interface IAppContainer extends React.Props<any> {
    store: Store<any>;
}

class AppContainer extends React.Component<IAppContainer, {}> {
    render() {
        const { store } = this.props;

        return (
            //DOC: Provides the entire application with the Redux store that we created inside the /store/ directory. Not implemented until STEP 5
            /** DOC: 
            * Disregard everything except: <CoreLayout/> ...
            * return (
            *   <CoreLayout />
            * );
            **/
            <Provider store={store}>
                <div style={{ height: '100%' }}>
                    <CoreLayout />
                </div>
            </Provider>
        );
    }
}

export default AppContainer;