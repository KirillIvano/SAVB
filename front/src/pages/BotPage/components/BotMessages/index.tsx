import React, {
    useEffect,
    useState,
    useMemo,
} from 'react';

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


type BotMessagesBlockProps = {
    messages: MessagePreview[];
}

const BotMessagesBlock = ({
    messages,
}: BotMessagesBlockProps) => (
    <div className={styles.messagesBlock}>
        {
            messages.map(
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
);


const filterMessages = (messages: MessagePreview[], searchString: string) =>
    messages.filter(message => message.name.indexOf(searchString) !== -1);

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

    const filteredMessages = useMemo(
        () => filterMessages(messages, searchValue),
        [messages, searchValue],
    );

    useEffect(() => {getMessages();}, []);

    if (getMessagesInProgress) return <Preloader />;
    if (getMessagesError) return <ErrorView content={getMessagesError} />;

    return (
        <Fade duration={.3}>
            <TextInput
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}

                type={'text'}
                name={'search_message'}

                className={styles.searchInput}
                labelText={'Найти сообщение'}
            />

            <BotMessagesBlock messages={filteredMessages} />
        </Fade>
    );
};

export default withMessages(BotMessages);
