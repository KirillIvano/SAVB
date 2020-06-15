import {createReducer} from 'typesafe-actions';

import {RootAction} from '@/store/types';
import {getMessageSuccessAction} from '@/modules/messages/actions';

import {TriggerStateType} from './types';

const initialState: TriggerStateType = {
    previews: {},
};

export const triggersReducer = createReducer<TriggerStateType, RootAction>(
    initialState,
).handleAction(
    getMessageSuccessAction,
    (state, {payload: {triggersPreviews}}) => ({
        ...state,
        previews: {
            ...state.previews,
            ...triggersPreviews,
        },
    }),
);
