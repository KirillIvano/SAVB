import {StateType} from 'typesafe-actions';

import rootReducer from './reducers';
export {RootAction} from './actions';

export type RootState = StateType<typeof rootReducer>;
