import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {RootState, RootAction} from '@/store/types';
import {getStageAction} from '@/modules/stages/actions';

type AdditionalProps = {
    stageId: string;
}

const mapStateToProps = ({stagesState}: RootState, {stageId}: AdditionalProps) => {
    const {
        stages,

        getStageLoading,
        getStageSuccess,
        getStageError,
    } = stagesState;

    const stage = stages[stageId];

    const {name, text} = stage || {};

    return {
        getStageLoading,
        getStageError,
        getStageSuccess,

        name,
        text,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>, {stageId}: AdditionalProps) => ({
    getStage: () => dispatch(getStageAction(stageId)),
});

export const withStageEdit = connect(mapStateToProps, mapDispatchToProps);
