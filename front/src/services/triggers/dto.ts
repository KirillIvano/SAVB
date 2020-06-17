export type TriggerPreviewDto = {
    id: number;
    sourceStageId: number;
    targetStageId: number;
    triggerType: 'button' | 'plain_stage';
}
