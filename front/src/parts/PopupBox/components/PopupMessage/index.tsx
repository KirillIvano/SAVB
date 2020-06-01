import React, {useState} from 'react';
import classnames from 'classnames';

import {PopupMessageType} from '@/modules/popup/types';

import styles from './styles.less';
import successImage from './images/success.png';
import errorImage from './images/error.png';

export type PopupMessageProps = {
    handleRemove: (id: number) => void;
} & PopupMessageType;

const PopupMessage: React.FC<PopupMessageProps> = ({
    content,
    id,
    type,

    handleRemove,
}) => {
    const [isBeingDeleted, setDeleted] = useState(false);

    const handleClick = () => {
        setDeleted(true);
        handleRemove(id);
    };

    return (
        <div
            className={classnames(
                styles.message,
                {[styles.deleted]: isBeingDeleted},
            )}
            onClick={handleClick}
        >
            <img
                src={type === 'success' ? successImage : errorImage}
                className={styles.icon}
            />
            <p className={styles.text}>{content}</p>
        </div>
    );
};

export default PopupMessage;
