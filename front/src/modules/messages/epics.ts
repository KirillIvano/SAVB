import {Epic, combineEpics} from 'redux-observable';
import {from, of} from 'rxjs';
import {
    switchMap,
    mergeMap,
    filter,
} from 'rxjs/operators';
import {isOfType} from 'typesafe-actions';

import {RootAction, RootState} from '@/store/types';
import {getAllBotMessages} from '@/services/messages/mock';
import {clientifyMessagesPreviews} from '@/services/messages/transformers';

import * as names from './names';
import {
    getAllBotMessagesErrorAction,
    getAllBotMessagesSuccessAction,
} from './actions';

const getAllBotMessagesEpic: Epic<RootAction, RootAction, RootState> = action$ =>
    action$.pipe(
        filter(isOfType(names.GET_ALL_BOT_MESSAGES_START)),
        switchMap(
            ({payload: {botId}}) => from(
                getAllBotMessages(+botId),
            ).pipe(
                mergeMap(response => {
                    if (!response.ok) {
                        return of(getAllBotMessagesErrorAction(
                            response.error,
                        ));
                    }

                    return of(
                        getAllBotMessagesSuccessAction(
                            clientifyMessagesPreviews(response.data.messages),
                        ),
                    );
                }),
            ),
        ),
    );

export const messagesEpic = combineEpics(
    getAllBotMessagesEpic,
);

