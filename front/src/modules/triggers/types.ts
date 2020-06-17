export type TriggerPreviewType = {
    id: string;
    sourceStageId: string;
    targetStageId: string;
    triggerType: 'button' | 'plain_stage';
}

export type TriggerPreviewStorageType = Record<string, TriggerPreviewType>

export type TriggerStateType = {
    previews: TriggerPreviewStorageType;
}
