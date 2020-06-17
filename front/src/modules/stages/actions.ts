import {createAction} from 'typesafe-actions';

import {TriggerPreviewType} from '@/modules/triggers/types';

import * as names from './names';
import {StageType, StagePreview} from './types';

export const getStageAction = createAction(
    names.GET_STAGE_START,
    (stageId: string) => ({stageId}),
)();
export const getStageErrorAction = createAction(
    names.GET_STAGE_ERROR,
    (error: string) => ({error}),
)();

type GetStagesSuccessPayload = {
    presentStage: StageType;
    nextStages: Record<string, StagePreview>;
    triggersPreviews: Record<string, TriggerPreviewType>;
}
export const getStageSuccessAction = createAction(
    names.GET_STAGE_SUCCESS,
    (payload: GetStagesSuccessPayload) => payload,
)();


export const getAllBotStagesAction = createAction(
    names.GET_ALL_BOT_STAGES_START,
    (botId: string) => ({botId}),
)();
export const getAllBotStagesErrorAction = createAction(
    names.GET_ALL_BOT_STAGES_ERROR,
    (error: string) => ({error}),
)();
export const getAllBotStagesSuccessAction = createAction(
    names.GET_ALL_BOT_STAGES_SUCCESS,
    (stages: Record<string, StagePreview>) => ({stages}),
)();
