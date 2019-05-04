import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {Provider} from "react-redux";
import {createStore, applyMiddleware, compose} from "redux";
import reducers from "./reducers";
import reduxThunk from "redux-thunk";
import {BrowserRouter} from "react-router-dom";

//@ts-ignore
//const composedEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__;

const store = createStore(
    reducers,
    compose(
        applyMiddleware(reduxThunk),
        //composedEnhancer(),
    )
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));

