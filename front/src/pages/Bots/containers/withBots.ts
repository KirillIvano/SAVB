import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {RootState, RootAction} from '@/store/types';
import {getBotsAction} from '@/modules/bots/actions';

const mapStateToProps = ({botsState}: RootState) => {
    const {
        bots,
        botsGettingInProgress,
        botsGettingError,
    } = botsState;

    return {
        bots,
        botsGettingInProgress,
        botsGettingError,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
    getBots: () => dispatch(getBotsAction()),
});

export const withBots = connect(mapStateToProps, mapDispatchToProps);
