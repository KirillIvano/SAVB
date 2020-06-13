export type MessagePreviewDto = {
    id: number;
    botId: number;
    name: string;
};

export type RawMessageDto = {
    text: string;
} & MessagePreviewDto;

export type RawTriggerPreviewDto = {
    id: number;
    sourceMessageId: number;
    targetMessageId: number;
    triggerType: 'button' | 'plain_message';
}

export type GetMessageDto = {
    presentMessage: RawMessageDto;
    nextMessages: MessagePreviewDto[];
    triggers: RawTriggerPreviewDto[];
}

export type GetAllMessagesDto = {
    messages: RawMessageDto[];
}
