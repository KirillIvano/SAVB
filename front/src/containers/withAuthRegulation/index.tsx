import React from 'react';
import {Redirect} from 'react-router';
import {Preloader} from '@/uikit';

import {withAuth} from './withAuthentication';

type InjectedProps = {
    isLoggedIn: boolean;
    isAppInitialized: boolean;
}

export const withAuthRegulation = <TBaseProps,>(Comp: React.ComponentType<TBaseProps>) => {
    const AuthenticatedPageWrapper = (props: TBaseProps & InjectedProps) => {
        const {isAppInitialized, isLoggedIn} = props;

        if (!isAppInitialized) {
            return <Preloader />;
        }

        if (!isLoggedIn) {
            return <Redirect to={'/'} />;
        }

        return <Comp {...props} />;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return withAuth(AuthenticatedPageWrapper as any);
};
