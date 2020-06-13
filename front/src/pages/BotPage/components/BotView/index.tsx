import React from 'react';

import {
    Card,
    Tooltip,
    Button,
} from '@/uikit';

import styles from './styles.less';

type BotView = {
    name: string;
    image: string;
    membersCount: number;
}

const BotView = ({
    name,
    image,
    membersCount,
}: BotView) => (
    <Card className={styles.card}>
        <Tooltip size={150} src={image} />

        <div className={styles.info}>
            <p className={styles.name}>{name}</p>
            <p className={styles.members}>{membersCount} участников</p>

            <div className={styles.controls}>
                <Button
                    disabled={true}
                    className={styles.button}
                >
                    Информация
                </Button>
                <Button
                    disabled={true}
                    className={styles.button}
                    styling={'danger'}
                >
                    Удалить
                </Button>
            </div>
        </div>
    </Card>
);

export default BotView;
