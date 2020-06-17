import {createReducer} from 'typesafe-actions';

import {RootAction} from '@/store/types';
import {getStageSuccessAction} from '@/modules/stages/actions';

import {TriggerStateType} from './types';

const initialState: TriggerStateType = {
    previews: {},
};

export const triggersReducer = createReducer<TriggerStateType, RootAction>(
    initialState,
).handleAction(
    getStageSuccessAction,
    (state, {payload: {triggersPreviews}}) => ({
        ...state,
        previews: {
            ...state.previews,
            ...triggersPreviews,
        },
    }),
);
