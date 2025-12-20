import {legacy_createStore, applyMiddleware, compose} from "redux";
import {thunk} from "redux-thunk";
import {reducers} from "../reducers";

export const store = legacy_createStore (
    reducers,
    compose (
        applyMiddleware (thunk)
        //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)