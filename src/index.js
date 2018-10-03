import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from "react-router-dom";
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import reducers from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from 'redux-persist/integration/react'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import {IntlProvider} from "react-intl";
import DatabasePersist from "./state/persistence/DatabasePersist";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(persistReducer({storage, key: 'root', stateReconciler: hardSet},reducers), 
    composeEnhancers(applyMiddleware(DatabasePersist)));

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistStore(store)}>
            <IntlProvider>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </IntlProvider>
        </PersistGate>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
