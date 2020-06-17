import {combineEpics} from 'redux-observable';

import {groupsEpic} from '@/modules/groups/epics';
import {botsEpic} from '@/modules/bots/epics';
import {popupMessagesEpic} from '@/modules/popup/epics';
import {userEpic} from '@/modules/user/epics';
import {stagesEpic} from '@/modules/stages/epics';

export default combineEpics(
    groupsEpic,
    botsEpic,
    popupMessagesEpic,
    userEpic,
    stagesEpic,
);
