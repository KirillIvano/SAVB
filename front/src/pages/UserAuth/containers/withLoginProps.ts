import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {RootState, RootAction} from '@/store/types';
import {loginStartAction} from '@/modules/user/actions';

const mapStateToProps = ({userState}: RootState) => {
    const {
        loggingInProgress,
        loggingInError,
        loggingInSuccess,
    } = userState;

    return {
        loggingInProgress,
        loggingInError,
        loggingInSuccess,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
    login: (code: string, redirectUri: string) =>
        dispatch(loginStartAction({code, redirectUri})),
});

export const withLoginProps = connect(mapStateToProps, mapDispatchToProps);
