import {combineReducers} from 'redux';

import {groupsReducer} from '@/modules/groups/reducer';
import {botsReducer} from '@/modules/bots/reducer';
import {popupsReducer} from '@/modules/popup/reducer';

export default combineReducers({
    groups: groupsReducer,
    bots: botsReducer,
    popup: popupsReducer,
});
