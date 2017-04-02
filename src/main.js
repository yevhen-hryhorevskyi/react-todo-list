import "es6-shim";
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, useRouterHistory} from 'react-router';
import {createHashHistory} from 'history';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import routes from './routes';
import reducers from './reducers';

const appHistory = useRouterHistory(createHashHistory)({queryKey: false});


let store = createStore(reducers);
if (process.env.NODE_ENV !== 'production') {
    console.log('Redux Dev Tools Enabled for development.');
    store = createStore(reducers, window.devToolsExtension && window.devToolsExtension());
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={appHistory} routes={routes}/>
    </Provider>,
    document.querySelector('.app')
);
