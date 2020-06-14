import {createAction} from 'typesafe-actions';

import {TriggerPreviewType} from '@/modules/triggers/types';

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

type GetMessagesSuccessPayload = {
    presentMessage: MessageType;
    nextMessages: Record<string, MessagePreview>;
    triggers: Record<string, TriggerPreviewType>;
}
export const getMessageSuccessAction = createAction(
    names.GET_MESSAGE_SUCCESS,
    (payload: GetMessagesSuccessPayload) => payload,
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
