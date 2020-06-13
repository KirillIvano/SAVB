import React, {useMemo} from 'react';
import {Col} from 'react-flexbox-grid';
import classnames from 'classnames';

import {GroupType} from '@/modules/groups/types';
import {Card, Tooltip} from '@/uikit';
import {getGroupAuthUrl} from '@/util/authenticate';

import styles from './styles.less';

type GroupCardProps = GroupType;

const GroupCard: React.FC<GroupCardProps> = ({
    name,
    id,
    isUsed,
    image,
}) => {
    const authUrl = useMemo(() => getGroupAuthUrl(id), [id]);

    return (
        <Col xs={12} md={4}>
            <Card className={styles.groupCard}>
                <Tooltip src={image} size={'large'} />
                <div className={styles.groupData}>
                    <h3 className={styles.groupName}>{name}</h3>
                    {
                        !isUsed ?
                            <a href={authUrl} className={classnames(styles.groupUsage)}>+ Подключить бота</a> :
                            <p className={classnames(styles.groupUsage, styles.used)}>Бот подключен</p>
                    }
                </div>
            </Card>
        </Col>
    );
};

export default GroupCard;
