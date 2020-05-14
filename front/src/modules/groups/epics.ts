import {createEpicMiddleware, ofType, Epic, combineEpics} from 'redux-observable';
import {mergeMap, filter, tap, map} from 'rxjs/operators';
import {isOfType} from 'typesafe-actions';

import {RootAction, RootState} from '@/store/types';
import {uselessAction} from '@/store/actions';

import * as names from './names';

const getGroupsEpic: Epic<RootAction, RootAction, RootState> = action$ =>
    action$.pipe(
        filter(isOfType(names.GROUPS_GET_START)),
        tap(
            action => {
                console.log(action);
            },
        ),
        map(() => uselessAction()),
    );

export default combineEpics(getGroupsEpic);
