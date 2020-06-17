import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {RootState, RootAction} from '@/store/types';
import {getAllBotStagesAction} from '@/modules/stages/actions';
import {selectStagesPreviewsByBot} from '@/modules/stages/selectors';

type AdditionalProps = {
    botId: string;
}

const mapStateToProps = ({stagesState}: RootState, {botId}: AdditionalProps) => {
    const {
        stagePreviews,
        getAllBotStagesLoading,
        getAllBotStagesError,
    } = stagesState;

    const botStages = selectStagesPreviewsByBot({
        botId,
        stages: stagePreviews,
    });

    return {
        stages: botStages,
        getStagesInProgress: getAllBotStagesLoading,
        getStagesError: getAllBotStagesError,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>, {botId}: AdditionalProps) => ({
    getStages: () => dispatch(getAllBotStagesAction(botId)),
});

export const withStages = connect(mapStateToProps, mapDispatchToProps);
