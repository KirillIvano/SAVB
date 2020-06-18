import React from 'react';
import {useParams} from 'react-router-dom';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';

import {RootAction, RootState} from '@/store/types';
import {getStageAction} from '@/modules/stages/actions';

type AdditionalProps = {
    stageId: string;
}

export const withStageId = <TProps extends AdditionalProps>(Comp: React.ComponentType<TProps>) =>
    (props: TProps) => {
        const {stageId} = useParams<AdditionalProps>();

        return <Comp {...props} stageId={1} />;
    };


const mapStateToProps = ({stagesState}: RootState) => {
    const {
        getStageSuccess,
        getStageError,
    } = stagesState;

    return {
        getStageSuccess,
        getStageError,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>, {stageId}: AdditionalProps) => ({
    getStage: () => dispatch(getStageAction(stageId)),
});

export const withStageGetting = connect(mapStateToProps, mapDispatchToProps);
