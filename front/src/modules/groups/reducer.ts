import {createReducer} from 'typesafe-actions';

import {RootAction} from '@/store/types';

import {GroupsStateType} from './types';
import * as actions from './actions';

const initialState: GroupsStateType = {
    groups: [],

    groupsGettingInProgress: false,
    groupsGettingSuccess: false,
    groupsGettingError: null,
};

export const groupsReducer = createReducer<typeof initialState, RootAction>(
    initialState,
).handleAction(
    actions.getGroupsAction,
    state => ({
        ...state,
        groupsGettingInProgress: true,
        groupsGettingSuccess: false,
        groupsGettingError: null,
    }),
).handleAction(
    actions.getGroupsSuccessAction,
    (state, {payload: groups}) => ({
        ...state,
        groups,

        groupsGettingInProgress: false,
        groupsGettingSuccess: true,
        groupsGettingError: null,
    }),
).handleAction(
    actions.getGroupsErrorAction,
    (state, {payload: error}) => ({
        ...state,
        groupsGettingInProgress: false,
        groupsGettingSuccess: false,
        groupsGettingError: error,
    }),
);

