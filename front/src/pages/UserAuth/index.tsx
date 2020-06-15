import React, {useEffect, useMemo} from 'react';
import {useLocation, Redirect, useHistory} from 'react-router';

import {getCodeFromSearchParams} from '@/util/authenticate';
import {Preloader} from '@/uikit';

import styles from './styles.less';
import {withLoginProps} from './containers/withLoginProps';

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
    const code = useMemo(() => getCodeFromSearchParams(searchParams), []);

    useEffect(() => {
        code && login(code, `${window.location.origin}/userAuthPending`);
    }, []);

    useEffect(() => {
        loggingInSuccess && history.push('/bots');
        loggingInError && history.push('/');
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
