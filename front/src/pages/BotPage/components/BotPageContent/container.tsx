import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {RootState, RootAction} from '@/store/types';
import {getSingleBotAction} from '@/modules/bots/actions';

type AdditionalProps = {
    botId: string;
}

const mapStateToProps = ({botsState}: RootState, {botId}: AdditionalProps) => {
    const {
        botGetSingleInProgress,
        botGetSingleError,
        bots,
    } = botsState;

    const bot = bots[botId];

    const {name, image, membersCount} = bot || {};

    return {
        botGetSingleInProgress,
        botGetSingleError,

        name,
        image,
        membersCount,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>, {botId}: AdditionalProps) => ({
    getBotInfo: () => dispatch(getSingleBotAction(botId)),
});

export const withSingleBot = connect(mapStateToProps, mapDispatchToProps);
