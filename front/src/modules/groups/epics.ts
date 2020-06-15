import {Epic, combineEpics} from 'redux-observable';
import {from, of} from 'rxjs';
import {
    switchMap,
    mergeMap,
    filter,
} from 'rxjs/operators';
import {isOfType} from 'typesafe-actions';

import {RootAction, RootState} from '@/store/types';
import {getGroups} from '@/services/groups';
import {retryAction} from '@/modules/user/helpers';

import * as names from './names';
import {getGroupsErrorAction, getGroupsSuccessAction} from './actions';

const getGroupsEpic: Epic<RootAction, RootAction, RootState> = action$ =>
    action$.pipe(
        filter(isOfType(names.GET_GROUPS_START)),
        switchMap(
            src => from(getGroups()).pipe(
                mergeMap(res => {
                    if (res.status === 401) {
                        return of(retryAction(src));
                    }

                    if (res.ok) {
                        return of(getGroupsSuccessAction(res.data.groups));
                    }

                    return of(getGroupsErrorAction(res.error));
                }),
            )),
    );

export const groupsEpic = combineEpics(getGroupsEpic);
