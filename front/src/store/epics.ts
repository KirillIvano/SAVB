import {combineEpics} from 'redux-observable';

import groupsEpic from '@/modules/groups/epics';

export default combineEpics(groupsEpic);
