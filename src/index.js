import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from "react-router-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import reducers from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from 'redux-persist/integration/react'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

const store = createStore(persistReducer({storage, key: 'root', stateReconciler: hardSet},reducers), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistStore(store)}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
        </PersistGate>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
