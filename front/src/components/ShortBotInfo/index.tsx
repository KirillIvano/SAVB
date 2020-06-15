import React, {useEffect} from 'react';

import {withBotName} from './container';
import styles from './styles.less';

type BotInfoProps = {
    botGetSingleInProgress: boolean;
    botGetSingleError: string | null;
    name: string | undefined;

    getBotInfo: () => void;
}

const ShortBotInfo = ({
    botGetSingleInProgress,
    botGetSingleError,
    name,

    getBotInfo,
}: BotInfoProps) => {
    useEffect(() => getBotInfo(), []);

    if (botGetSingleInProgress) return <div>loading...</div>;
    if (botGetSingleError) return <div>error...</div>;

    return (<p className={styles.botName}>
        {name}
    </p>);
};

export default withBotName(ShortBotInfo);
