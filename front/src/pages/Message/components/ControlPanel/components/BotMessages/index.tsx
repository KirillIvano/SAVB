import React from 'react';

import {TextInput} from '@/uikit';

import styles from './styles.less';

const PresentMessages = () => {
    return (
        <div className={styles.botMessages}>
            <TextInput labelText={'Поиск по сообщениям'} />
        </div>
    );
};

export default PresentMessages;
