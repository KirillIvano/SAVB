import React from 'react';

import {Tooltip} from '@/components';

import styles from './styles.less';

type HeaderUserInfoProps = {
    image: string;
    name: string;
    id: string;
}

const HeaderUserInfo: React.FC<HeaderUserInfoProps> = ({
    image,
    name,
}) => (
    <div className={styles.userInfo}>
        <Tooltip src={image} size={'small'} />
        <p className={styles.userName}>{name}</p>
    </div>
);

export default HeaderUserInfo;
