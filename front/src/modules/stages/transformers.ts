import {StagePreviewDto, RawStageDto} from '@/services/stages/dto';

import {StagePreview, StageType} from './types';

export const clientifyStagePreview = (stage: StagePreviewDto): StagePreview => ({
    ...stage,
    botId: String(stage.botId),
    id: String(stage.id),
});

export const clientifyStage = (stage: RawStageDto): StageType =>
    clientifyStagePreview(stage as RawStageDto) as StageType;

export const clientifyStagesPreviews = (stages: StagePreviewDto[]) =>
    stages.reduce(
        (acc: Record<string, StagePreview>, stage) => {
            const stageId = String(stage.id);

            acc[stageId] = clientifyStagePreview(stage);

            return acc;
        }, {},
    );
