import React, {useEffect, useState} from 'react';

import {MessagePreview} from '@/modules/messages/types';
import {
    TextInput,
    Preloader,
    ErrorView,
    Fade,
} from '@/uikit';

import styles from './styles.less';
import {withMessages} from './container';

type BotMessageProps = {
    id: string;
    name: string;
}

const BotMessage = ({
    id,
    name,
}: BotMessageProps) => (
    <div className={styles.message}>
        <a className={styles.messageLink} href={`/message/${id}`}>
            {name}
        </a>
    </div>
);

type BotMessagesProps = {
    messages: MessagePreview[];
    getMessagesInProgress: boolean;
    getMessagesError: string | null;
    botId: string;

    getMessages: () => void;
}

const BotMessages = ({
    messages,
    getMessagesInProgress,
    getMessagesError,

    getMessages,
}: BotMessagesProps) => {
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {getMessages();}, []);

    if (getMessagesInProgress) return <Preloader />;
    if (getMessagesError) return <ErrorView content={getMessagesError} />;

    return (<Fade duration={.3}>
        <TextInput
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            labelText={'Найти сообщение'}
        />
        <div className={styles.messagesBlock}>
            {
                messages
                    .filter(message => message.name.indexOf(searchValue) !== -1)
                    .map(
                        ({name, id}) => (
                            <BotMessage
                                name={name}
                                id={id}
                                key={id}
                            />
                        ),
                    )
            }
        </div>
    </Fade>);
};

export default withMessages(BotMessages);
