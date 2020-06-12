import React, {useEffect} from 'react';

import {Preloader, ErrorView} from '@/uikit';

import {withBotInfo} from './container';
import {BotView} from './..';

type BotPageContentProps = {
    botGetSingleInProgress: boolean;
    botGetSingleError: string | null;

    name: string;
    image: string;
    membersCount: number;

    getBotInfo: () => void;
}

const BotPageContent = ({
    botGetSingleError,
    botGetSingleInProgress,

    name,
    image,
    membersCount,

    getBotInfo,
}: BotPageContentProps) => {
    useEffect(() => {getBotInfo();}, []);

    if (botGetSingleInProgress) return <Preloader />;
    if (botGetSingleError) return <ErrorView content={botGetSingleError} />;

    return (
        <BotView
            name={name}
            image={image}
            membersCount={membersCount}
        />
    );
};

export default withBotInfo(BotPageContent);
