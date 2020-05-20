import React from 'react';
import {Col} from 'react-flexbox-grid';
import {useHistory} from 'react-router-dom';

import {Card, Tooltip} from '@/uikit';
import {BotType} from '@/modules/bots/types';

import styles from './styles.less';

type BotCardProps = {
    className?: string;
} & BotType;

const BotCard: React.FC<BotCardProps> = ({
    image,
    name,
    id,
    membersCount,
}) => {
    const history = useHistory();

    const handleClick = () => history.push(`/bots/${id}`);

    return (
        <Col onClick={handleClick} xs={12} md={3}>
            <Card className={styles.botCard}>
                <Tooltip src={image} size={'large'} />
                <div className={styles.botData}>
                    <h3 className={styles.botName}>{name}</h3>
                    <p className={styles.botSubscribers}>{`${membersCount} подписчиков`}</p>
                </div>
            </Card>
        </Col>
    );
};

export default BotCard;
