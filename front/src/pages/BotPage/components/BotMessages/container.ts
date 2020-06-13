import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import {RootState, RootAction} from '@/store/types';
import {getAllBotMessagesAction} from '@/modules/messages/actions';
import {selectMessagesPreviewsByBot} from '@/modules/messages/selectors';

type AdditionalProps = {
    botId: string;
}

const mapStateToProps = ({messagesState}: RootState, {botId}: AdditionalProps) => {
    const {
        messagePreviews,
        getAllBotMessagesLoading,
        getAllBotMessagesError,
    } = messagesState;

    const botMessages = selectMessagesPreviewsByBot({
        botId,
        messages: messagePreviews,
    });

    return {
        messages: botMessages,
        getMessagesInProgress: getAllBotMessagesLoading,
        getMessagesError: getAllBotMessagesError,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>, {botId}: AdditionalProps) => ({
    getMessages: () => dispatch(getAllBotMessagesAction(botId)),
});

export const withMessages = connect(mapStateToProps, mapDispatchToProps);
