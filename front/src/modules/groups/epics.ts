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

import * as names from './names';
import {getGroupsErrorAction, getGroupsSuccessAction} from './actions';
import { tryAuthorizeOperator } from '@/util/rxUtil';

const getGroupsEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
    action$.pipe(
        filter(isOfType(names.GET_GROUPS_START)),
        switchMap(
            src => from(getGroups()).pipe(
                mergeMap(res => {
                    if (res.status === 401) {
                        return tryAuthorizeOperator(
                            src,
                            state$.value.userState.creds,
                        );
                    }

                    if (res.ok) {
                        return of(getGroupsSuccessAction(res.data.groups));
                    }

                    return of(getGroupsErrorAction(res.error));
                }),
            )),
    );

export default combineEpics(getGroupsEpic);
