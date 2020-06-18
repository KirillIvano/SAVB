import React, {useState} from 'react';

import {SidePaneledLayout, SidePaneledRest} from '@/parts';
import {PageWrapper} from '@/uikit';

import {BotSidePanel, BotPageContent, DeleteBotModal} from './components';
import {withBotId} from './container';

type BotPageProps = {
    botId: string;
};

const BotPage = ({botId}: BotPageProps) => {
    const [isDeleteBotModalOpened, openDeleteBotModal] = useState(false);

    return (
        <PageWrapper>
            <SidePaneledLayout>
                <BotSidePanel botId={botId} />
                <SidePaneledRest>
                    <BotPageContent
                        openDeleteModal={() => openDeleteBotModal(true)}
                        botId={botId}
                    />
                </SidePaneledRest>
            </SidePaneledLayout>

            <DeleteBotModal
                botId={botId}
                closeModal={() => openDeleteBotModal(false)}
                isOpened={isDeleteBotModalOpened}
            />
        </PageWrapper>
    );
};


export default withBotId(BotPage);
