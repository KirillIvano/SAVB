export type MessagePreviewDro = {
    id: number;
    name: string;
};

export type RawMessageDto = {
    text: string;
} & MessagePreviewDro;

export type RawTriggerPreviewDto = {
    id: number;
    sourceMessageId: number;
    targetMessageId: number;
    triggerType: 'button' | 'plain_message';
}

export type GetMessageDto = {
    presentMessage: RawMessageDto;
    nextMessages: MessagePreviewDro[];
    triggers: RawTriggerPreviewDto[];
}
