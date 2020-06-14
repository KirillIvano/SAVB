export type TriggerPreviewType = {
    id: string;
    sourceMessageId: string;
    targetMessageId: string;
    triggerType: 'button' | 'plain_message';
}
