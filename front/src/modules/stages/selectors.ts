import {createSelector} from 'reselect';
import {StagesPreviewsStorageType, StagePreview} from './types';

type SelectStagePreviewsByBotParams = {
    botId: string;
    stages: StagesPreviewsStorageType;
}
export const selectStagesPreviewsByBot = createSelector<
    SelectStagePreviewsByBotParams,
    string,
    StagesPreviewsStorageType,
    StagePreview[]
>(
    props => props.botId,
    props => props.stages,
    (botId, stages) =>
        Object.keys(stages)
            .filter(key => stages[key].botId === botId)
            .map(key => stages[key]),
);

type SelectStagePreviewsByIdsParams = {
    ids: string[];
    stagePreviews: StagesPreviewsStorageType;
}
export const selectStagesPreviewsByIds = createSelector<
    SelectStagePreviewsByIdsParams,
    string[],
    StagesPreviewsStorageType,
    StagePreview[]
>(
    props => props.ids,
    props => props.stagePreviews,
    (ids, stages) => ids.map(id => stages[id]),
);
