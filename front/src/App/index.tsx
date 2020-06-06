import React, {useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';

import {
    Bots,
    Main,
    UserLoginPage,
    BotCreatePage,
} from '@/pages';
import {PopupBox, Header} from '@/parts';
import {withAuthRegulation} from '@/containers/withAuthRegulation';
import {PageWrapper, Preloader} from '@/uikit';
import {withAuth} from './containers/withAuth';

type AppProps = {
    isAppInitialized: boolean;

    tryAuth: () => void;
}

const App = ({
    isAppInitialized,
    tryAuth,
}: AppProps) => {
    useEffect(() => {
        tryAuth();
    }, []);

    if (!isAppInitialized) {
        return <Preloader />;
    }

    return (
        <>
            <Header />
            <PageWrapper>
                <Switch>
                    <Route exact path="/" component={Main} />
                    <Route exact path="/bots" component={withAuthRegulation(Bots)} />
                    <Route exact path="/userAuthPending" component={UserLoginPage} />
                    <Route exact path="/groupAuthPending" component={BotCreatePage} />
                </Switch>
            </PageWrapper>
            <PopupBox />
        </>
    );
};

const enchancedApp = withAuth(App);

export default enchancedApp;
