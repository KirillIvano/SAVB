import React from 'react';

import {AddIcon} from '@/uikit/Icons';

import {Trigger} from './components';
import styles from './styles.less';

const MessageTriggers = () => (
    <div className={styles.messageTriggers}>
        <h1 className={styles.messageEditHeadline}>
            <AddIcon size="large" />
            <span className={styles.headlineContent}>Переходы</span>
        </h1>
        <div className={styles.triggersSection}>
            <Trigger />
            <Trigger />
        </div>
    </div>
);

export default MessageTriggers;
