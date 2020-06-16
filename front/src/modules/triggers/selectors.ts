import {createSelector} from 'reselect';

import {TriggerStateType, TriggerPreviewType} from './types';

type NextMessagesSelectorProps = {
    triggersState: TriggerStateType;
    messageId: string;
}
export const selectNextMessagesIds = createSelector<
    NextMessagesSelectorProps,
    string,
    Record<string, TriggerPreviewType>,
    string[]
>(
    props => props.messageId,
    props => props.triggersState.previews,
    (messageId, triggers) => Object.keys(triggers)
        .map(triggerId => triggers[triggerId])
        .filter(trigger => trigger.sourceMessageId === messageId)
        .map(trigger => trigger.targetMessageId),
);
