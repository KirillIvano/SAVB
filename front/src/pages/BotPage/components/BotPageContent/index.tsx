import React, {useEffect} from 'react';

import {Preloader, ErrorView, Fade} from '@/uikit';

import {withSingleBot} from './container';
import {BotView} from './..';

type BotPageContentProps = {
    botGetSingleInProgress: boolean;
    botGetSingleError: string | null;

    name: string;
    image: string;
    membersCount: number;

    openDeleteModal: () => void;
    getBotInfo: () => void;
}

const BotPageContent = ({
    botGetSingleError,
    botGetSingleInProgress,

    name,
    image,
    membersCount,

    openDeleteModal,
    getBotInfo,
}: BotPageContentProps) => {
    useEffect(() => {getBotInfo();}, []);

    if (botGetSingleInProgress) return <Preloader />;
    if (botGetSingleError) return <ErrorView content={botGetSingleError} />;

    return (
        <Fade duration={.5}>
            <BotView
                openDeleteModal={openDeleteModal}
                name={name}
                image={image}
                membersCount={membersCount}
            />
        </Fade>
    );
};

export default withSingleBot(BotPageContent);
