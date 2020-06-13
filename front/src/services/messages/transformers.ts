import {MessagePreview} from '@/modules/messages/types';

import {MessagePreviewDto} from './dto';

export const clientifyMessagePreview = (message: MessagePreviewDto): MessagePreview => ({
    ...message,
    botId: String(message.botId),
    id: String(message.id),
});

export const clientifyMessagesPreviews = (messages: MessagePreviewDto[]) =>
    messages.reduce(
        (acc: Record<string, MessagePreview>, message) => {
            const messageId = String(message.id);

            acc[messageId] = clientifyMessagePreview(message);

            return acc;
        }, {},
    );
