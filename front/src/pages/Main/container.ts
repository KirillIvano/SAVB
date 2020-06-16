import {connect} from 'react-redux';

import {RootState} from '@/store/types';

const mapStateToProps = ({userState}: RootState) => ({
    isAuthenticated: userState.isLoggedIn,
});

export const withAuthInfo = connect(mapStateToProps);
