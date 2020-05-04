import { createBrowserHistory } from 'history';
import {
  compose, createStore, combineReducers, applyMiddleware,
} from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import * as reducers from '../reducers';

// Create History.
const history = createBrowserHistory();
// Combine all reducers.
const reducer = combineReducers({ ...reducers });

/**
 * Compose a react store for state management,
 * apply middleware, enable dev tools, and connect with the router and react.
 */
const store = compose(
  applyMiddleware(routerMiddleware(history)),
  // window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
)(createStore)(connectRouter(history)(reducer));

export default store;
