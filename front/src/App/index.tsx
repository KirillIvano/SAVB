import React from 'react';
import {Route, Switch} from 'react-router-dom';

import {Bots} from '@/pages';
import {PopupBox, Header} from '@/parts';
import {PageWrapper} from '@/uikit';

const App = () => (
    <>
        <Header />
        <PageWrapper>
            <Switch>
                <Route path="/bots" component={Bots} />
            </Switch>
        </PageWrapper>
        <PopupBox />
    </>
);

export default App;
