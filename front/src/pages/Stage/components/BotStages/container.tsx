import {connect} from 'react-redux';

import {RootState} from '@/store/types';
import {selectStagesPreviewsByIds} from '@/modules/stages/selectors';
import {selectNextStagesIds} from '@/modules/triggers/selectors';


type NeededProps = {
    stageId: string;
}

const mapStateToProps = ({stagesState, triggersState}: RootState, {stageId}: NeededProps) => {
    const {stages, stagePreviews} = stagesState;

    const nextStagesIds = selectNextStagesIds({triggersState, stageId});
    const nextStagesPreviews = selectStagesPreviewsByIds({stagePreviews, ids: nextStagesIds});
    const presentStage = stages[stageId];

    return {
        presentStage,
        nextStagesPreviews,
    };
};

export const withConnectedStages = connect(mapStateToProps);
