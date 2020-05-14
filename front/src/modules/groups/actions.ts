import {createAction} from 'typesafe-actions';

import * as names from './names';
import {GroupsObjType} from './types';

export const getGroupsAction = createAction(names.GROUPS_GET_START)();

export const getGroupsSuccessAction = createAction(
    names.GROUPS_GET_SUCCESS,
    (groups: GroupsObjType) => groups,
)();

export const getGroupsErrorAction = createAction(
    names.GROUPS_GET_ERROR,
    (error: string) => error,
)();
