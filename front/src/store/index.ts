import {createStore, Middleware, compose, applyMiddleware} from 'redux';
import {createEpicMiddleware} from 'redux-observable';

import {RootAction, RootState} from './types';
import reducerEpic from './reducers';
import rootEpic from './epics';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState>();
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const logger: Middleware = () => next => action => {
    // eslint-disable-next-line no-console
    console.log(action);
    next(action);
};

export const store = createStore(
    reducerEpic,
    composeEnhancers(
        applyMiddleware(logger, epicMiddleware),
    ),
);

epicMiddleware.run(rootEpic);

