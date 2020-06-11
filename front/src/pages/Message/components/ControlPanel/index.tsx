import React from 'react';

import {ShortBotInfo} from '@/components';

import styles from './styles.less';
import {BotMessages} from './components';

const ControlPanel = () => (
    <div className={styles.panelPlaceholder}>
        <div className={styles.panel}>
            <ShortBotInfo />
            <BotMessages />
        </div>
    </div>
);

export default ControlPanel;
