import React from 'react';
import classnames from 'classnames';

import styles from './styles.less';

type BotInfoProps = {
    name: string;
}

const BotInfo = ({
    name,
}: BotInfoProps) => (
    <div className={styles.botName}>
        {name}
    </div>
);

export default BotInfo;
