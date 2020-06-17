import {TriggerPreviewDto} from '@/services/triggers/dto';

export type StagePreviewDto = {
    id: number;
    botId: number;
    name: string;
};

export type RawStageDto = {
    text: string;
} & StagePreviewDto;


export type GetStageDto = {
    presentStage: RawStageDto;
    nextStages: StagePreviewDto[];
    triggersPreviews: TriggerPreviewDto[];
}

export type GetAllStagesDto = {
    stages: RawStageDto[];
}
