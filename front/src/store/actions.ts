import {createAction, ActionType} from 'typesafe-actions';

import {GroupsActionsType} from '@/modules/groups/types';
import {BotsActionType} from '@/modules/bots/types';
import {PopupActionType} from '@/modules/popup/types';
import {UserActionType} from '@/modules/user/types';

export const uselessAction = createAction('EMPTY')();

export type RootAction = GroupsActionsType |
    BotsActionType |
    PopupActionType |
    UserActionType |
    ActionType<typeof uselessAction>;
