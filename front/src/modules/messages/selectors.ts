import {createSelector} from 'reselect';
import {MessagesPreviewsStorageType, MessagePreview} from './types';

type SelectMessagePreviewsByBotParams = {
    botId: string;
    messages: MessagesPreviewsStorageType;
}
export const selectMessagesPreviewsByBot = createSelector<
    SelectMessagePreviewsByBotParams,
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

type SelectMessagePreviewsByIdsParams = {
    ids: string[];
    messagePreviews: MessagesPreviewsStorageType;
}
export const selectMessagesPreviewsByIds = createSelector<
    SelectMessagePreviewsByIdsParams,
    string[],
    MessagesPreviewsStorageType,
    MessagePreview[]
>(
    props => props.ids,
    props => props.messagePreviews,
    (ids, messages) => ids.map(id => messages[id]),
);
