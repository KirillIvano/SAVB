import {combineEpics} from 'redux-observable';

import {groupsEpic} from '@/modules/groups/epics';
import {botsEpic} from '@/modules/bots/epics';
import {popupMessagesEpic} from '@/modules/popup/epics';
import {userEpic} from '@/modules/user/epics';
import {messagesEpic} from '@/modules/messages/epics';

export default combineEpics(
    groupsEpic,
    botsEpic,
    popupMessagesEpic,
    userEpic,
    messagesEpic,
);
