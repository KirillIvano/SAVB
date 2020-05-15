import {ActionType} from 'typesafe-actions';

import * as actions from './actions';

export type PopupMessageType = {
    content: string;
    type: 'success' | 'error';
    id: number;
};

export type PopupActionType = ActionType<typeof actions>;

export type PopupState = {
    messages: PopupMessageType[];
};
