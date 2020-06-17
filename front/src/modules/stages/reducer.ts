import {createReducer} from 'typesafe-actions';

import {StagesStateType} from './types';
import * as actions from './actions';
import {StageActionType} from './types';

const initialState: StagesStateType = {
    stages: {},
    stagePreviews: {},

    getStageLoading: false,
    getStageError: null,
    getStageSuccess: false,

    getAllBotStagesLoading: false,
    getAllBotStagesError: null,
};

export const stagesReducer = createReducer<StagesStateType, StageActionType>(initialState)
    .handleAction(
        actions.getStageAction,
        state => ({
            ...state,

            getStageLoading: true,
            getStageError: null,
            getStageSuccess: false,
        }),
    ).handleAction(
        actions.getStageSuccessAction,
        (state, {payload: {presentStage, nextStages}}) => ({
            ...state,
            getStageLoading: false,
            getStageSuccess: true,

            stages: {
                ...state.stages,
                [presentStage.id]: presentStage,
            },
            stagePreviews: {
                ...state.stagePreviews,
                ...nextStages,
            },

        }),
    ).handleAction(
        actions.getStageErrorAction,
        (state, {payload: {error}}) => ({
            ...state,
            getStageError: error,
            getStageSuccess: false,
        }),
    )

    .handleAction(
        actions.getAllBotStagesAction,
        state => ({
            ...state,
            getAllBotStagesLoading: true,
            getAllBotStagesError: null,
        }),
    ).handleAction(
        actions.getAllBotStagesSuccessAction,
        (state, {payload: {stages}}) => ({
            ...state,
            getAllBotStagesLoading: false,
            stagePreviews: {
                ...state.stagePreviews,
                ...stages,
            },
        }),
    ).handleAction(
        actions.getAllBotStagesErrorAction,
        (state, {payload: {error}}) => ({
            ...state,
            getAllBotStagesLoading: false,
            getAllBotStagesError: error,
        }),
    );
