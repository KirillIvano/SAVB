export type TriggerPreviewDto = {
    id: number;
    sourceMessageId: number;
    targetMessageId: number;
    triggerType: 'button' | 'plain_message';
}
