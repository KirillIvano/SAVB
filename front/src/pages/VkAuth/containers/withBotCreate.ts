import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {RootState, RootAction} from '@/store/types';
import {createBotAction} from '@/modules/bots/actions';

const mapStateToProps = ({botsState}: RootState) => {
    const {
        botCreatingInProgress,
        botCreatingError,
        botCreatingSuccess,
    } = botsState;

    return {
        loading: botCreatingInProgress,
        error: botCreatingError,
        success: botCreatingSuccess,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
    startAuth: (code: string, redirectUri: string) =>
        dispatch(createBotAction({code, redirectUri})),
});

export const withBotCreate = connect(mapStateToProps, mapDispatchToProps);
