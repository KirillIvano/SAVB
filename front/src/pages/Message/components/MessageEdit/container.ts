import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {RootState, RootAction} from '@/store/types';
import {getMessageAction} from '@/modules/messages/actions';

type AdditionalProps = {
    messageId: string;
}

const mapStateToProps = ({messagesState}: RootState, {messageId}: AdditionalProps) => {
    const {
        messages,

        getMessageLoading,
        getMessageSuccess,
        getMessageError,
    } = messagesState;

    const message = messages[messageId];

    const {name, text} = message || {};

    return {
        getMessageLoading,
        getMessageError,
        getMessageSuccess,

        name,
        text,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>, {messageId}: AdditionalProps) => ({
    getMessage: () => dispatch(getMessageAction(messageId)),
});

export const withMessageEdit = connect(mapStateToProps, mapDispatchToProps);
