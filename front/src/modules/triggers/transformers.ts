import {TriggerPreviewDto} from '@/services/triggers/dto';

import {TriggerPreviewType} from './types';

export const clientifyTriggerPreview = (trigger: TriggerPreviewDto): TriggerPreviewType => ({
    ...trigger,
    id: String(trigger.id),
    sourceMessageId: String(trigger.sourceMessageId),
    targetMessageId: String(trigger.targetMessageId),
});

export const clientifyTriggerPreviewsArr = (triggers: TriggerPreviewDto[]): Record<string, TriggerPreviewType> =>
    triggers.reduce(
        (acc: Record<string, TriggerPreviewType>, trigger) => {
            acc[trigger.id] = clientifyTriggerPreview(trigger);

            return acc;
        }, {},
    );
