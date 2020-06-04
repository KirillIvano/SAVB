import {connect} from 'react-redux';

import {RootState} from '@/store/types';

const mapStateToProps = ({userState}: RootState) => {
    const {
        isAppInitialized,
        isLoggedIn,
    } = userState;

    return {
        isAppInitialized,
        isLoggedIn,
    };
};

export const withAuth = connect(mapStateToProps);
