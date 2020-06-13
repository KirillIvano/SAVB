import {ActionType} from 'typesafe-actions';

import * as actions from './actions';


export type MessagePreview = {
    id: string;
    name: string;
    botId: string;
}
export type MessageType = {
    text: string;
} & MessagePreview;


export type MessagesStorageType = Record<string, MessageType>
export type MessagesPreviewsStorageType = Record<string, MessagePreview>

export type MessagesStateType = {
    messages: MessagesStorageType;
    messagePreviews: MessagesPreviewsStorageType;

    getMessageLoading: boolean;
    getMessageError: string | null;

    getAllBotMessagesLoading: boolean;
    getAllBotMessagesError: string | null;
}

export type MessageActionType = ActionType<typeof actions>
