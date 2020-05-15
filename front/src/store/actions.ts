import {GroupsActionsType} from '@/modules/groups/types';
import {createAction, ActionType} from 'typesafe-actions';

export const uselessAction = createAction('EMPTY')();

export type RootAction = GroupsActionsType | ActionType<typeof uselessAction>;
