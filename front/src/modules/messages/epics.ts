import {Epic, combineEpics} from 'redux-observable';
import {from, of} from 'rxjs';
import {
    switchMap,
    mergeMap,
    filter,
} from 'rxjs/operators';
import {isOfType} from 'typesafe-actions';

import {RootAction, RootState} from '@/store/types';
import {getAllBotMessages, getFullMessage} from '@/services/messages/mock';
import {clientifyMessagesPreviews, clientifyMessage} from '@/modules/messages/transformers';
import {clientifyTriggerPreview, clientifyTriggerPreviewsArr} from '@/modules/triggers/transformers';

import * as names from './names';
import {
    getAllBotMessagesErrorAction,
    getAllBotMessagesSuccessAction,
    getMessageSuccessAction,
    getMessageErrorAction,
} from './actions';

const getMessageEpic: Epic<RootAction, RootAction, RootState> = action$ =>
    action$.pipe(
        filter(isOfType(names.GET_MESSAGE_START)),
        switchMap(
            ({payload: {messageId}}) =>
                from(getFullMessage(+messageId)).pipe(
                    mergeMap(
                        response => {
                            if (!response.ok) {
                                return of(
                                    getMessageErrorAction(response.error),
                                );
                            }

                            const {data} = response;

                            const successPayload = {
                                presentMessage: clientifyMessage(data.presentMessage),
                                nextMessages: clientifyMessagesPreviews(data.nextMessages),
                                triggers: clientifyTriggerPreviewsArr(data.triggers),
                            };

                            return of(
                                getMessageSuccessAction(successPayload),
                            );
                        },
                    ),
                ),
        ),
    );

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

