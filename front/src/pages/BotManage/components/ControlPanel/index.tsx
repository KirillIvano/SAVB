import React from 'react';

import styles from './styles.less';
import {BotInfo, BotMessages} from './components';

const ControlPanel = () => (
    <div className={styles.panelPlaceholder}>
        <div className={styles.panel}>
            <BotInfo />
            <BotMessages />
        </div>
    </div>
);

export default ControlPanel;
