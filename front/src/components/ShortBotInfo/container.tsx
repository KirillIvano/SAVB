import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {RootState, RootAction} from '@/store/types';
import {getSingleBotAction} from '@/modules/bots/actions';
import {getBotName} from '@/modules/bots/getters';

type AdditionalProps = {
    botId: string;
}

const mapStateToProps = ({botsState}: RootState, {botId}: AdditionalProps) => {
    const {
        botGetSingleInProgress,
        botGetSingleError,
    } = botsState;

    const name = getBotName(botsState, botId);

    return {
        botGetSingleInProgress,
        botGetSingleError,
        name,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>, {botId}: AdditionalProps) => ({
    getBotInfo: () => dispatch(getSingleBotAction(botId)),
});

export const withBotName = connect(
    mapStateToProps,
    mapDispatchToProps,
);
