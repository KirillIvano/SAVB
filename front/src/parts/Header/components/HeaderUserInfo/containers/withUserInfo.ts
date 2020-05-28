import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {RootState} from '@/store/types';
import {logoutStartAction} from '@/modules/user/actions';

const mapStateToProps = ({userState}: RootState) => {
    const {
        userGettingInProgress,
        isLoggedIn,
        info,
    } = userState;

    return {
        info,
        isLoggedIn,
        userGettingInProgress,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    logout: () => dispatch(logoutStartAction()),
});

export const withUserInfo = connect(mapStateToProps, mapDispatchToProps);
