import React, {useEffect} from 'react';
import {useLocation, Redirect, useHistory} from 'react-router';

import {getCodeFromSearchParams} from '@/util/authenticate';

import styles from './styles.less';
import {withLoginProps} from './containers/withLoginProps';
import { Preloader } from '@/uikit';

type UserAuthProps = {
    loggingInProgress: boolean;
    loggingInError: string | null;
    loggingInSuccess: boolean;

    login: (code: string, redirectUri: string) => void;
};

const UserAuth = ({
    loggingInProgress,
    loggingInError,
    loggingInSuccess,
    login,
}: UserAuthProps) => {
    const {search: searchParams} = useLocation();
    const history = useHistory();
    const code = getCodeFromSearchParams(searchParams);

    useEffect(() => {
        code && login(code, `${window.location.origin}/userAuthPending`);
    }, []);

    useEffect(() => {
        (loggingInSuccess || loggingInError) && history.push('/');
    }, [loggingInProgress]);

    if (!code) {
        return (<Redirect to={'/'} />);
    }

    if (loggingInProgress) {
        return <Preloader />;
    }

    return <div className={styles.auth}></div>;
};

const enchancedUserAuth = withLoginProps(UserAuth);

export default enchancedUserAuth;
