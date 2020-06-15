import {TriggerPreviewDto} from '@/services/triggers/dto';

export type MessagePreviewDto = {
    id: number;
    botId: number;
    name: string;
};

export type RawMessageDto = {
    text: string;
} & MessagePreviewDto;


export type GetMessageDto = {
    presentMessage: RawMessageDto;
    nextMessages: MessagePreviewDto[];
    triggersPreviews: TriggerPreviewDto[];
}

export type GetAllMessagesDto = {
    messages: RawMessageDto[];
}
