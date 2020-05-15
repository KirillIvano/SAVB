import React from 'react';
import {PopupMessageType} from '@/modules/popup/types';

import {withMessages} from './withMessages';
import PopupMessage from './PopupMessage';
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
                message => (<PopupMessage
                    handleRemove={removeMessage}
                    key={message.id}
                    {...message}
                />),
            )}
        </div>
    );
};

const enchancedPopup = withMessages(React.memo(PopupBox));

export default enchancedPopup;
