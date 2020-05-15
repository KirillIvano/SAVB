import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {RootState, RootAction} from '@/store/types';
import {removePopupMessageStart} from '@/modules/popup/actions';

const mapStateToProps = (state: RootState) => ({
    messages: state.popup.messages,
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
    removeMessage: (id: number) => dispatch(removePopupMessageStart(id)),
});

export const withMessages = connect(mapStateToProps, mapDispatchToProps);
