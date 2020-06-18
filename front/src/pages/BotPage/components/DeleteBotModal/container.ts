import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {RootState, RootAction} from '@/store/types';
import {deleteBotAction} from '@/modules/bots/actions';

type AdditionalProps = {
    botId: string;
}

const mapStateToProps = ({botsState}: RootState, {botId}: AdditionalProps) => {
    const {
        botDeletingInProgress,
        botDeletingSuccess,
        botDeletingError,
        bots,
    } = botsState;

    const bot = bots[botId];

    return {
        botDeletingInProgress,
        botDeletingSuccess,
        botDeletingError,

        isBotDeleted: !bot,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>, {botId}: AdditionalProps) => ({
    deleteBot: () => dispatch(deleteBotAction(botId)),
});

export const withBotDeleting = connect(mapStateToProps, mapDispatchToProps);
