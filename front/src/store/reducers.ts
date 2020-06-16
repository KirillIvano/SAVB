import {combineReducers} from 'redux';

import {groupsReducer} from '@/modules/groups/reducer';
import {botsReducer} from '@/modules/bots/reducer';
import {popupsReducer} from '@/modules/popup/reducer';
import {userReducer} from '@/modules/user/reducers';
import {messagesReducer} from '@/modules/messages/reducer';
import {triggersReducer} from '@/modules/triggers/reducer';

export default combineReducers({
    groupsState: groupsReducer,
    botsState: botsReducer,
    popupState: popupsReducer,
    userState: userReducer,
    messagesState: messagesReducer,
    triggersState: triggersReducer,
});
