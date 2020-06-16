import React from 'react';

import {SidePaneledLayout, SidePaneledRest} from '@/parts';
import {PageWrapper} from '@/uikit';

import {BotSidePanel, BotPageContent} from './components';
import {withBotId} from './container';

type BotPageProps = {
    botId: string;
};

const BotPage = ({botId}: BotPageProps) => (
    <PageWrapper>
        <SidePaneledLayout>
            <BotSidePanel botId={botId} />
            <SidePaneledRest>
                <BotPageContent botId={botId} />
            </SidePaneledRest>
        </SidePaneledLayout>
    </PageWrapper>
);

export default withBotId(BotPage);
