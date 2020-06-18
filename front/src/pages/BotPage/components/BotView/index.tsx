import React from 'react';

import {
    Card,
    Tooltip,
    Button,
} from '@/uikit';

import styles from './styles.less';

type BotViewProps = {
    name: string;
    image: string;
    membersCount: number;

    openDeleteModal: () => void;
}

const BotView = ({
    name,
    image,
    membersCount,

    openDeleteModal,
}: BotViewProps) => (
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
                    className={styles.button}
                    onClick={openDeleteModal}
                    styling={'danger'}
                >
                    Удалить
                </Button>
            </div>
        </div>
    </Card>
);

export default BotView;
