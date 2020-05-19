import {ActionType} from 'typesafe-actions';

import * as actions from './actions';

export type GroupType = {
    id: number;
    name: string;
    image: string;
    isUsed: boolean;
};

export type GroupsStoreType = GroupType[];

export type GroupsActionsType = ActionType<typeof actions>;
export type GroupsStateType = {
    groups: GroupsStoreType;

    groupsGettingInProgress: boolean;
    groupsGettingSuccess: boolean;
    groupsGettingError: string | null;
};
