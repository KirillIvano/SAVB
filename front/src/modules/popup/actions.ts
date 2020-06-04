import {createAction} from 'typesafe-actions';

import * as names from './names';
import {PopupMessageType} from './types';

let id = 0;

export const addPopupSuccessMessage = createAction(
    names.PUSH_POPUP_MESSAGE,
    (content: string): PopupMessageType => ({content, type: 'success', id: ++id}),
)();

export const addPopupErrorMessage = createAction(
    names.PUSH_POPUP_MESSAGE,
    (content: string): PopupMessageType => ({content, type: 'error', id: ++id}),
)();

export const removePopupMessage = createAction(
    names.REMOVE_POPUP_MESSAGE,
    (id: number) => id,
)();

export const popPopupMessage = createAction(names.POP_POPUP_MESSAGE)();
