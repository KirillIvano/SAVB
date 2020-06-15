export type TriggerPreviewType = {
    id: string;
    sourceMessageId: string;
    targetMessageId: string;
    triggerType: 'button' | 'plain_message';
}

export type TriggerPreviewStorageType = Record<string, TriggerPreviewType>

export type TriggerStateType = {
    previews: TriggerPreviewStorageType;
}
