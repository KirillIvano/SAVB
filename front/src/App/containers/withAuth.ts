import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {tryAuthStartAction} from '@/modules/user/actions';
import {RootState} from '@/store/types';

const mapStateToProps = ({userState}: RootState) => {
    const {
        isAppInitialized,
    } = userState;

    return {
        isAppInitialized,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    tryAuth: () => dispatch(tryAuthStartAction()),
});

export const withAuth = connect(mapStateToProps, mapDispatchToProps);
