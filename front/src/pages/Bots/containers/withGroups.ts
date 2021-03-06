import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {RootState, RootAction} from '@/store/types';
import {getGroupsAction} from '@/modules/groups/actions';

const mapStateToProps = ({groupsState}: RootState) => {
    const {
        groups,
        groupsGettingInProgress,
        groupsGettingError,
    } = groupsState;

    return {
        groups,
        groupsGettingInProgress,
        groupsGettingError,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
    getGroups: () => dispatch(getGroupsAction()),
});

export const withGroups = connect(mapStateToProps, mapDispatchToProps);
