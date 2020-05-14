import {createReducer} from 'typesafe-actions';

import {RootAction} from '@/store/types';

import * as actions from './actions';
import {BotsStateType} from './types';

const initialState: BotsStateType = {
    bots: {},

    botsLoading: false,
    botsLoadingSuccess: false,
    botsLoadingError: null,
};

export const botsReducer = createReducer<typeof initialState, RootAction>(
    initialState,
).handleAction(
    actions.getBotsAction,
    state => ({
        ...state,
        botsLoading: true,
        botsLoadingSuccess: false,
        botsLoadingError: null,
    }),
).handleAction(
    actions.getBotsSuccessAction,
    (state, {payload}) => ({
        ...state,
        bots: payload,
        botsLoading: false,
        botsLoadingSuccess: true,
    }),
).handleAction(
    actions.getBotsErrorAction,
    (state, {payload}) => ({
        ...state,
        bots: {},
        botsLoading: false,
        botsLoadingError: payload,
    }),
);


