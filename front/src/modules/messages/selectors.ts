import {createSelector} from 'reselect';
import {MessagesPreviewsStorageType, MessagePreview} from './types';

type SelectMessagePreviewsParams = {
    botId: string;
    messages: MessagesPreviewsStorageType;
}
export const selectMessagesPreviewsByBot = createSelector<
    SelectMessagePreviewsParams,
    string,
    MessagesPreviewsStorageType,
    MessagePreview[]
>(
    props => props.botId,
    props => props.messages,
    (botId, messages) =>
        Object.keys(messages)
            .filter(key => messages[key].botId === botId)
            .map(key => messages[key]),
);

