import React, {useEffect, useState} from 'react';
import {Grid, Row} from 'react-flexbox-grid';

import {
    PageHeadline,
    Preloader,
    Fade,
} from '@/uikit';
import {BotType} from '@/modules/bots/types';
import {AddIcon} from '@/uikit/Icons';

import {BotCard, GroupsModal} from './components';
import {withBots} from './containers/withBots';
import styles from './styles.less';

type BotsPageProps = {
    bots: Record<string, BotType>;
    botsGettingInProgress: boolean;
    botsGettingError: null | string;
    botsGettingSuccess: boolean;

    getBots: () => void;
}

const BotsPage: React.FC<BotsPageProps> = ({
    bots,
    botsGettingInProgress,
    botsGettingError,

    getBots,
}) => {
    const [isOpen, setOpened] = useState(false);

    useEffect(() => {
        getBots();
    }, []);

    if (botsGettingInProgress) {
        return <Preloader />;
    }

    if (botsGettingError) {
        return <div>error...</div>;
    }

    return (
        <>
            <Grid>
                <Fade duration={0.5}>
                    <PageHeadline className={styles.pageHeadline}>
                        {'Боты'}
                        <AddIcon
                            className={styles.addIcon}
                            size={'large'}
                            onClick={() => setOpened(true)}
                        />
                    </PageHeadline>
                    <Row>
                        {Object.keys(bots).map(botId => {
                            const {id} = bots[botId];

                            return <BotCard key={id} {...bots[botId]} />;
                        })}
                    </Row>
                </Fade>
            </Grid>
            <GroupsModal handleClose={() => setOpened(false)} isOpen={isOpen} />
        </>
    );
};

const enchancedBotsPage = withBots(BotsPage);

export default enchancedBotsPage;
