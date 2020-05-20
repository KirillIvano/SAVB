import {createReducer} from 'typesafe-actions';

import {RootAction} from '@/store/types';

import {PopupState} from './types';
import * as actions from './actions';

const initialState: PopupState = {
    messages: [],
};

export const popupsReducer = createReducer<PopupState, RootAction>(initialState)
    .handleAction(
        [actions.addPopupSuccessMessage, actions.addPopupErrorMessage],
        (state, {payload: message}) => ({
            messages: [...state.messages, message],
        }),
    ).handleAction(
        actions.popPopupMessage,
        state => ({
            messages: state.messages.slice(1),
        }),
    ).handleAction(
        actions.removePopupMessageEnd,
        (state, {payload: id}) => ({
            messages: state.messages.filter(message => message.id !== id),
        }),
    );
