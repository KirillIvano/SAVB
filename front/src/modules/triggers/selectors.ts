import {createSelector} from 'reselect';

import {TriggerStateType, TriggerPreviewType} from './types';

type NextStagesSelectorProps = {
    triggersState: TriggerStateType;
    stageId: string;
}
export const selectNextStagesIds = createSelector<
    NextStagesSelectorProps,
    string,
    Record<string, TriggerPreviewType>,
    string[]
>(
    props => props.stageId,
    props => props.triggersState.previews,
    (stageId, triggers) => Object.keys(triggers)
        .map(triggerId => triggers[triggerId])
        .filter(trigger => trigger.sourceStageId === stageId)
        .map(trigger => trigger.targetStageId),
);
