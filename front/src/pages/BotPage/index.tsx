import React from 'react';

import {SidePaneledLayout, SidePaneledRest} from '@/parts';

import {BotSidePanel, BotPageContent} from './components';
import {withBotId} from './container';

type BotPageProps = {
    botId: string;
};

const BotPage = ({botId}: BotPageProps) => (
    <SidePaneledLayout>
        <BotSidePanel botId={botId} />
        <SidePaneledRest>
            <BotPageContent botId={botId} />
        </SidePaneledRest>
    </SidePaneledLayout>
);

export default withBotId(BotPage);
