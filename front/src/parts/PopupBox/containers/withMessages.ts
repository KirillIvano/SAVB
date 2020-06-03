import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {RootState, RootAction} from '@/store/types';
import {removePopupMessage} from '@/modules/popup/actions';

const mapStateToProps = (state: RootState) => ({
    messages: state.popupState.messages,
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
    removeMessage: (id: number) => dispatch(removePopupMessage(id)),
});

export const withMessages = connect(mapStateToProps, mapDispatchToProps);
