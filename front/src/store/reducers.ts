import {groupsReducer} from '@/modules/groups/reducer';
import {combineReducers} from 'redux';

export default combineReducers({
    groups: groupsReducer,
});
