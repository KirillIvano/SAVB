import React, {useState} from 'react';
import classnames from 'classnames';
import {} from 'react-transition-group';
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
    const [isGoingToUnmount, setUnmonted] = useState(false);

    const handleClick = () => {
        setUnmonted(true);

        setTimeout(
            () => {
                setUnmonted(false);
                handleRemove(id);
            },
            500,
        );
    };

    return (
        <div
            className={classnames(
                styles.message,
                {[styles.deleted]: isGoingToUnmount},
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
