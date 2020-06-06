import {createAction} from 'typesafe-actions';

import * as names from './names';
import {BotsStorageType} from './types';

export const getBotsAction = createAction(names.BOTS_GET_START)();

export const getBotsSuccessAction = createAction(
    names.BOTS_GET_SUCCESS,
    (bots: BotsStorageType) => bots,
)();

export const getBotsErrorAction = createAction(
    names.BOTS_GET_ERROR,
    (error: string) => error,
)();

export type BotCreatePayload = {
    groupId: number;
    redirectUrl: string;
    code: string;
}
export const createBotAction = createAction(
    names.BOT_CREATE_START,
    (payload: BotCreatePayload) => payload,
)();

export const createBotsSuccessAction = createAction(names.BOT_CREATE_SUCCESS)();

export const createBotsErrorAction = createAction(
    names.BOT_CREATE_ERROR,
    (error: string) => error,
)();
