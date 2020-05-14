import {ActionType} from 'typesafe-actions';

import * as actions from './actions';

export type GroupType = {
    id: number;
    name: string;
    membersCount: number;
    image: string;
    isSelected: true;
};

export type GroupsObjType = GroupType[];

export type GroupsActionsType = ActionType<typeof actions>;
export type GroupsStateType = {
    groups: GroupsObjType;

    groupsLoading: boolean;
    groupsLoadingSuccess: boolean;
    groupsLoadingError: string | null;
};
