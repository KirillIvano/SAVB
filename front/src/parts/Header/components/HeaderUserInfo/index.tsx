import React from 'react';
import classnames from 'classnames';

import {Tooltip, Button, Fade} from '@/uikit';
import {UserInfoType} from '@/modules/user/types';
import {getUserAuthUrl} from '@/util/authenticate';

import styles from './styles.less';
import {withUserInfo} from './containers/withUserInfo';
import {ExitIcon} from '@/uikit/Icons';

type HeaderUserInfoProps = {
    info: UserInfoType | null;
    isLoggedIn: boolean;
    userGettingInProgress: boolean;
    logout: () => void;
}

const UserInfoPreview = ({
    userGettingInProgress,
}: {userGettingInProgress: boolean}) => (
    <div className={styles.userInfoBlock}>
        <div className={classnames(
            styles.userInfo,
            styles.preview,
            {[styles.loading]: userGettingInProgress},
        )}>
            <Tooltip className={styles.userIcon} isPlaceholder={true} />
            <p className={styles.userName}>{name}</p>
        </div>
    </div>
);

const HeaderUserInfo = ({
    info,
    isLoggedIn,
    userGettingInProgress,

    logout,
}: HeaderUserInfoProps) => {
    if (!isLoggedIn) {
        return (
            <div className={styles.authButtonContainer}>
                <Button
                    onClick={() => location.href = getUserAuthUrl()}
                >
                Войти
                </Button>
            </div>
        );
    }

    if (!info) {
        return <UserInfoPreview userGettingInProgress={userGettingInProgress} />;
    }

    const {image, name} = info;

    return (
        <Fade duration={.6}>
            <div className={styles.userInfoBlock}>
                <div className={styles.userInfo}>
                    <Tooltip src={image} size={'small'} />
                    <p className={styles.userName}>{name}</p>
                </div>

                <ExitIcon onClick={logout} size={'large'} />
            </div>
        </Fade>
    );
};

const enchancedUserInfo = withUserInfo(HeaderUserInfo);

export default enchancedUserInfo;
