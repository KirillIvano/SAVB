import React from 'react';

import {SidePanel} from '@/parts';

// import styles from './styles.less';
import {BotStages} from './../';

type BotSidePanelProps = {
    botId: string;
}

const BotSidePanel = ({
    botId,
}: BotSidePanelProps) => (
    <SidePanel>
        <BotStages botId={botId} />
    </SidePanel>
);

export default BotSidePanel;
