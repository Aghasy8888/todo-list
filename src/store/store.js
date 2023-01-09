import reducer from "./reducer";
import { createStore, applyMiddleware } from "redux";
import { logger } from "redux-logger";
import thunk from 'redux-thunk'

const middleware = applyMiddleware(thunk, logger);

export const store = createStore(reducer, middleware);
