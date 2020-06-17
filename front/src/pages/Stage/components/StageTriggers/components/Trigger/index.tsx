import React from 'react';

import {Card} from '@/uikit';
import {DeleteIcon, EditIcon} from '@/uikit/Icons';

import styles from './styles.less';

const Trigger = () => (
    <Card className={styles.trigger}>
        <div className={styles.triggerInfo}>
            <p className={styles.infoSection}>
                <span className={styles.infoName}>пользователь:</span>привет
            </p>
            <p className={styles.infoSection}>
                <span className={styles.infoName}>ответ:</span>вот опции
            </p>
            <p className={styles.infoSection}>
                <span className={styles.infoName}>дальше:</span>опции
            </p>
        </div>
        <div className={styles.triggerControls}>
            <DeleteIcon className={styles.controlIcon} />
            <EditIcon className={styles.controlIcon} />
        </div>
    </Card>
);

export default Trigger;
