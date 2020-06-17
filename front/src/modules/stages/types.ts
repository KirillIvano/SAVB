import {ActionType} from 'typesafe-actions';

import * as actions from './actions';


export type StagePreview = {
    id: string;
    name: string;
    botId: string;
}
export type StageType = {
    text: string;
} & StagePreview;


export type StagesStorageType = Record<string, StageType>
export type StagesPreviewsStorageType = Record<string, StagePreview>

export type StagesStateType = {
    stages: StagesStorageType;
    stagePreviews: StagesPreviewsStorageType;

    getStageLoading: boolean;
    getStageError: string | null;
    getStageSuccess: boolean;

    getAllBotStagesLoading: boolean;
    getAllBotStagesError: string | null;
}

export type StageActionType = ActionType<typeof actions>
