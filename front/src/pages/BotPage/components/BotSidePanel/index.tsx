import React, {useState} from 'react';

import {SidePanel} from '@/parts';
import {TextInput} from '@/uikit';

// import styles from './styles.less';
import {BotMessages} from './../';

type BotSidePanelProps = {
    botId: string;
}

const BotSidePanel = ({
    botId,
}: BotSidePanelProps) => {
    const [filterInputValue, changeSearchText] = useState('');

    return (
        <SidePanel>
            <BotMessages botId={botId} />
        </SidePanel>
    );
};
export default BotSidePanel;
