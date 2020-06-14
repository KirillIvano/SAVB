import {createReducer} from 'typesafe-actions';

import {MessagesStateType} from './types';
import * as actions from './actions';
import {MessageActionType} from './types';

const initialState: MessagesStateType = {
    messages: {},
    messagePreviews: {},

    getMessageLoading: false,
    getMessageError: null,

    getAllBotMessagesLoading: false,
    getAllBotMessagesError: null,
};

export const messagesReducer = createReducer<MessagesStateType, MessageActionType>(initialState)
    .handleAction(
        actions.getMessageAction,
        state => ({
            ...state,

            getMessageLoading: true,
            getMessageError: null,
        }),
    ).handleAction(
        actions.getMessageSuccessAction,
        (state, {payload: {presentMessage, nextMessages}}) => ({
            ...state,
            getMessageLoading: false,
            messages: {
                ...state.messages,
                [presentMessage.id]: presentMessage,
            },
            messagePreviews: {
                ...state.messagePreviews,
                ...nextMessages,
            },

        }),
    ).handleAction(
        actions.getMessageErrorAction,
        (state, {payload: {error}}) => ({
            ...state,
            getMessageError: error,
        }),
    )

    .handleAction(
        actions.getAllBotMessagesAction,
        state => ({
            ...state,
            getAllBotMessagesLoading: true,
            getAllBotMessagesError: null,
        }),
    ).handleAction(
        actions.getAllBotMessagesSuccessAction,
        (state, {payload: {messages}}) => ({
            ...state,
            getAllBotMessagesLoading: false,
            messagePreviews: {
                ...state.messagePreviews,
                ...messages,
            },
        }),
    ).handleAction(
        actions.getAllBotMessagesErrorAction,
        (state, {payload: {error}}) => ({
            ...state,
            getAllBotMessagesLoading: false,
            getAllBotMessagesError: error,
        }),
    );
