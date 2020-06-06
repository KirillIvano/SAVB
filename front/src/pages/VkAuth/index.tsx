import React, {useEffect, useMemo} from 'react';
import {useLocation, Redirect, useHistory} from 'react-router';

import {getCodeFromSearchParams} from '@/util/authenticate';
import {Preloader} from '@/uikit';

import {withLoginProps} from './containers/withLoginProps';
import {withBotCreate} from './containers/withBotCreate';

type UserAuthProps = {
    loading: boolean;
    error: string | null;
    success: boolean;

    startAuth: (code: string, redirectUri: string) => void;
};

const VkAuthPage = ({
    loading,
    error,
    success,

    startAuth,
}: UserAuthProps) => {
    const {search: searchParams} = useLocation();
    const history = useHistory();
    const code = useMemo(() => getCodeFromSearchParams(searchParams), []);
    const redirectUrl = useMemo(() => window.location.origin + window.location.pathname, []);

    useEffect(() => {
        code && startAuth(code, redirectUrl);
    }, []);

    useEffect(() => {
        success && history.push('/bots');
        error && history.push('/');
    }, [loading]);

    if (!code) {
        return (<Redirect to={'/'} />);
    }

    if (loading) {
        return <Preloader />;
    }

    return <div>0_0</div>;
};

export const UserLoginPage = withLoginProps(VkAuthPage);
export const BotCreatePage = withBotCreate(VkAuthPage);
