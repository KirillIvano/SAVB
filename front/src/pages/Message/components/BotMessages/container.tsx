import {connect} from 'react-redux';

import {RootState} from '@/store/types';
import {selectMessagesPreviewsByIds} from '@/modules/messages/selectors';
import {selectNextMessagesIds} from '@/modules/triggers/selectors';


type NeededProps = {
    messageId: string;
}

const mapStateToProps = ({messagesState, triggersState}: RootState, {messageId}: NeededProps) => {
    const {messages, messagePreviews} = messagesState;

    const nextMessagesIds = selectNextMessagesIds({triggersState, messageId});
    const nextMessagesPreviews = selectMessagesPreviewsByIds({messagePreviews, ids: nextMessagesIds});
    const presentMessage = messages[messageId];

    return {
        presentMessage,
        nextMessagesPreviews,
    };
};

export const withConnectedMessages = connect(mapStateToProps);
