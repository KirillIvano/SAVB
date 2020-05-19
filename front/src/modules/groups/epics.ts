import {Epic, combineEpics} from 'redux-observable';
import {from} from 'rxjs';
import {switchMap, filter, map} from 'rxjs/operators';
import {isOfType} from 'typesafe-actions';

import {RootAction, RootState} from '@/store/types';
import {getGroups} from '@/services/groups/mock';

import * as names from './names';
import {getGroupsErrorAction, getGroupsSuccessAction} from './actions';

const getGroupsEpic: Epic<RootAction, RootAction, RootState> = action$ =>
    action$.pipe(
        filter(isOfType(names.GET_GROUPS_START)),
        switchMap(
            () => from(getGroups()),
        ),
        map(res => res.ok ?
            getGroupsSuccessAction(res.data.groups) :
            getGroupsErrorAction(res.error),
        ),
    );

export default combineEpics(getGroupsEpic);
