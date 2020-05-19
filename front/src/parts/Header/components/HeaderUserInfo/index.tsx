import React from 'react';

import {Tooltip} from '@/uikit';

import styles from './styles.less';
import leaveIcon from './images/leave.svg';

type HeaderUserInfoProps = {
    image: string;
    name: string;
    id: string;
}

const HeaderUserInfo: React.FC<HeaderUserInfoProps> = ({
    image,
    name,
}) => (
    <div className={styles.userInfoBlock}>
        <div className={styles.userInfo}>
            <Tooltip src={image} size={'small'} />
            <p className={styles.userName}>{name}</p>
        </div>
        <img src={leaveIcon} className={styles.leaveIcon} alt="" />
    </div>
);

export default HeaderUserInfo;
