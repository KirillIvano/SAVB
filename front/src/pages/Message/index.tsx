import React from 'react';

import styles from './styles.less';
import {ControlPanel} from './components';

const MessageManagePage = () => {

    return (<div className={styles.botManagePage}>
        <ControlPanel />
    </div>);
};

export default MessageManagePage;
