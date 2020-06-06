import {ActionType} from 'typesafe-actions';

import * as actions from './actions';

export type BotType = {
    id: number;
    name: string;
    image: string;
    membersCount: number;
};

export type BotsStorageType = {[id: string]: BotType};
export type BotsActionType = ActionType<typeof actions>;

export type BotsStateType = {
    bots: BotsStorageType;

    botsGettingInProgress: boolean;
    botsGettingError: string | null;

    botCreatingInProgress: boolean;
    botCreatingError: string | null;
    botCreatingSuccess: boolean;
};
