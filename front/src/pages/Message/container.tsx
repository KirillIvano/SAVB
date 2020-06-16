import React from 'react';
import {useParams} from 'react-router-dom';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';

import {RootAction, RootState} from '@/store/types';
import {getMessageAction} from '@/modules/messages/actions';

type AdditionalProps = {
    messageId: string;
}

export const withMessageId = <TProps extends AdditionalProps>(Comp: React.ComponentType<TProps>) =>
    (props: TProps) => {
        const {messageId} = useParams<AdditionalProps>();

        return <Comp {...props} messageId={messageId} />;
    };


const mapStateToProps = ({messagesState}: RootState) => {
    const {
        getMessageSuccess,
        getMessageError,
    } = messagesState;

    return {
        getMessageSuccess,
        getMessageError,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>, {messageId}: AdditionalProps) => ({
    getMessage: () => dispatch(getMessageAction(messageId)),
});

export const withMessageGetting = connect(mapStateToProps, mapDispatchToProps);
