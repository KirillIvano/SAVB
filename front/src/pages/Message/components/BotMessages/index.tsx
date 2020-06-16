import React from 'react';

import {MessageType, MessagePreview} from '@/modules/messages/types';

import styles from './styles.less';
import {withConnectedMessages} from './container';


type BotMessagesProps = {
    presentMessage: MessageType;
    nextMessagesPreviews: MessagePreview[];
}

const BotMessages = ({
    presentMessage,
    nextMessagesPreviews,
}: BotMessagesProps) => {
    const {name: presentMessageName} = presentMessage;


    return (
        <div className={styles.botMessages}>
            <div className={styles.presentMessage}>{presentMessageName}</div>
            <div className={styles.nextMessages}>
                {nextMessagesPreviews.map(
                    ({name, id}) => (
                        <div
                            className={styles.nextMessagesItem}
                            key={id}
                        >
                            {name}
                        </div>
                    ),
                )}
            </div>
        </div>
    );
};

export default withConnectedMessages(BotMessages);
