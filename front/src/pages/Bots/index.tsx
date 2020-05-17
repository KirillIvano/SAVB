import React, {useEffect} from 'react';
import {Grid, Row} from 'react-flexbox-grid';

import {PageHeadline, Preloader, Fade} from '@/components';
import {BotType} from '@/modules/bots/types';

import {BotCard} from './components';
import {withBots} from './containers/withBots';

type BotsPageProps = {
    bots: Record<string, BotType>;
    botsLoading: boolean;
    botsLoadingError: null | string;
    botsLoadingSuccess: boolean;

    getBots: () => void;
}

const BotsPage: React.FC<BotsPageProps> = ({
    bots,
    botsLoading,
    botsLoadingError,

    getBots,
}) => {
    useEffect(() => {
        getBots();
    }, []);

    if (botsLoading) {
        return <Preloader />;
    }

    if (botsLoadingError) {
        return <div>error...</div>;
    }

    return (
        <Grid>
            <Fade duration={0.5}>
                <PageHeadline content={'Боты'} />
                <Row>
                    {Object.keys(bots).map(botId => {
                        const {id} = bots[botId];

                        return <BotCard key={id} {...bots[botId]} />;
                    })}
                </Row>
            </Fade>
        </Grid>
    );
};

const enchancedBotsPage = withBots(BotsPage);

export default enchancedBotsPage;
