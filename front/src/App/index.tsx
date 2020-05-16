import React, {useState, useEffect} from 'react';
import {useDispatch, connect} from 'react-redux';
import {Route, Switch} from 'react-router-dom';

import {addPopupSuccessMessage, addPopupErrorMessage} from '@/modules/popup/actions';
import {Groups} from '@/pages';
import {PopupBox, Header} from '@/parts';
import {Button, PageWrapper} from '@/components';

const App = () => {
    const [state, setState] = useState('');
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(addPopupSuccessMessage('asd saf adg asdg asdg'));
        dispatch(addPopupErrorMessage('Ответ убил'));
    };

    return (
        <div className="col-xs-2">
            <Header />
            <PageWrapper>
                <Switch>
                    <Route path="/groups" component={Groups} />
                </Switch>
            </PageWrapper>
            <Button onClick={handleClick}>сообщение</Button>
            <PopupBox />
        </div>
    );
};

export default App;
