import {createAction} from 'typesafe-actions';

import * as names from './names';

export const getGroupsAction = createAction(names.GROUPS_GET_START)();
