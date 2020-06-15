import React, {useEffect} from 'react';
import {Route, Switch, useHistory} from 'react-router-dom';

import {
    Bots,
    Main,
    UserLoginPage,
    BotCreatePage,
} from '@/pages';
import {PopupBox, Header} from '@/parts';
import {withAuthRegulation} from '@/containers/withAuthRegulation';
import {PageWrapper, Preloader, Button} from '@/uikit';
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

    const history = useHistory();

    if (!isAppInitialized) {
        return <Preloader />;
    }

    return (
        <>
            <Header />
            <PageWrapper>
                <Button onClick={() => history.push('/bots')}>Боты</Button>
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
