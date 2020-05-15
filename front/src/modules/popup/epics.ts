import {Epic, combineEpics} from 'redux-observable';
import {delay, filter, map, mergeMap} from 'rxjs/operators';
import {isOfType} from 'typesafe-actions';
import {of} from 'rxjs';

import {uselessAction} from '@/store/actions';
import {RootAction, RootState} from '@/store/types';

import * as actions from './actions';
import * as names from './names';

const pushPopupMessageEpic: Epic<RootAction, RootAction, RootState> = (action$, state$) =>
    action$.pipe(
        filter(isOfType(names.PUSH_POPUP_MESSAGE)),
        delay(15000),
        mergeMap(({payload}) => {
            const messages = state$.value.popup.messages;
            const isMessageShown = messages.some(({id}) => payload.id === id);

            if (isMessageShown) {
                return of(actions.popPopupMessage());
            }

            return of(uselessAction());
        }),
    );

const removePopupMessage: Epic<RootAction, RootAction, RootState> = action$ =>
    action$.pipe(
        filter(isOfType(names.REMOVE_POPUP_MESSAGE_START)),
        delay(600),
        map(({payload: id}) => actions.removePopupMessageEnd(id)),
    );

export default combineEpics(
    pushPopupMessageEpic,
    removePopupMessage,
);
