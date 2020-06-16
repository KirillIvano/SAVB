import React from 'react';

import {PopupMessageType} from '@/modules/popup/types';

import {withMessages} from './containers/withMessages';
import {PopupMessage} from './components';
import styles from './styles.less';

interface PopupBoxProps {
    messages: PopupMessageType[];
    removeMessage: (id: number) => void;
}

const PopupBox: React.FC<PopupBoxProps> = ({
    messages,
    removeMessage,
}) => {
    return (
        <div className={styles.popupBox}>
            {messages.map(
                message => (
                    <PopupMessage
                        key={message.id}
                        handleRemove={removeMessage}
                        {...message}
                    />
                ),
            )}
        </div>
    );
};

const enhancedPopup = withMessages(React.memo(PopupBox));

export default enhancedPopup;
