import {MessagePreviewDto, RawMessageDto} from '@/services/messages/dto';

import {MessagePreview, MessageType} from './types';

export const clientifyMessagePreview = (message: MessagePreviewDto): MessagePreview => ({
    ...message,
    botId: String(message.botId),
    id: String(message.id),
});

export const clientifyMessage = (message: RawMessageDto): MessageType =>
    clientifyMessagePreview(message as RawMessageDto) as MessageType;

export const clientifyMessagesPreviews = (messages: MessagePreviewDto[]) =>
    messages.reduce(
        (acc: Record<string, MessagePreview>, message) => {
            const messageId = String(message.id);

            acc[messageId] = clientifyMessagePreview(message);

            return acc;
        }, {},
    );
