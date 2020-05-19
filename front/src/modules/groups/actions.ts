import {createAction} from 'typesafe-actions';

import * as names from './names';
import {GroupsStoreType} from './types';

export const getGroupsAction = createAction(names.GET_GROUPS_START)();
export const getGroupsSuccessAction = createAction(
    names.GET_GROUPS_SUCCESS,
    (groups: GroupsStoreType) => groups,
)();
export const getGroupsErrorAction = createAction(
    names.GET_GROUPS_ERROR,
    (error: string) => error,
)();
