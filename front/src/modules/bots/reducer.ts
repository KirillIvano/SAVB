import {createReducer} from 'typesafe-actions';

import {RootAction} from '@/store/types';

import * as actions from './actions';
import {BotsStateType} from './types';

const initialState: BotsStateType = {
    bots: {},

    botsGettingInProgress: false,
    botsGettingSuccess: false,
    botsGettingError: null,
};

export const botsReducer = createReducer<typeof initialState, RootAction>(
    initialState,
).handleAction(
    actions.getBotsAction,
    state => ({
        ...state,
        botsGettingInProgress: true,
        botsGettingSuccess: false,
        botsGettingError: null,
    }),
).handleAction(
    actions.getBotsSuccessAction,
    (state, {payload}) => ({
        ...state,
        bots: payload,
        botsGettingInProgress: false,
        botsGettingError: null,
        botsGettingSuccess: true,
    }),
).handleAction(
    actions.getBotsErrorAction,
    (state, {payload}) => ({
        ...state,
        bots: {},
        botsGettingInProgress: false,
        botsGettingError: payload,
        botsGettingSuccess: true,
    }),
);


