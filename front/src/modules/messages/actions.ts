import {createAction} from 'typesafe-actions';

import * as names from './names';
import {MessageType, MessagePreview} from './types';

export const getMessageAction = createAction(
    names.GET_MESSAGE_START,
    (messageId: string) => ({messageId}),
)();
export const getMessageErrorAction = createAction(
    names.GET_MESSAGE_ERROR,
    (error: string) => ({error}),
)();
export const getMessageSuccessAction = createAction(
    names.GET_MESSAGE_SUCCESS,
    (messages: Record<string, MessageType>) => ({messages}),
)();

export const getAllBotMessagesAction = createAction(
    names.GET_ALL_BOT_MESSAGES_START,
    (botId: string) => ({botId}),
)();
export const getAllBotMessagesErrorAction = createAction(
    names.GET_ALL_BOT_MESSAGES_ERROR,
    (error: string) => ({error}),
)();
export const getAllBotMessagesSuccessAction = createAction(
    names.GET_ALL_BOT_MESSAGES_SUCCESS,
    (messages: Record<string, MessagePreview>) => ({messages}),
)();
