import {createReducer} from 'typesafe-actions';

import {RootAction} from '@/store/types';

import {GroupsStateType} from './types';
import * as actions from './actions';

const initialState: GroupsStateType = {
    groups: [],

    groupsLoading: false,
    groupsLoadingSuccess: false,
    groupsLoadingError: null,
};

export const groupsReducer = createReducer<typeof initialState, RootAction>(
    initialState,
).handleAction(
    actions.getGroupsAction,
    state => ({
        ...state,
        groupsLoading: true,
        groupsLoadingSuccess: false,
        groupsLoadingError: null,
    }),
);

