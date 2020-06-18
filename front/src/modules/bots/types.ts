import {ActionType} from 'typesafe-actions';

import * as actions from './actions';

export type BotType = {
    id: string;
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

    botGetSingleInProgress: boolean;
    botGetSingleError: string | null;

    botDeletingInProgress: boolean;
    botDeletingError: string | null;
    botDeletingSuccess: boolean;

    botCreatingInProgress: boolean;
    botCreatingError: string | null;
    botCreatingSuccess: boolean;
};
