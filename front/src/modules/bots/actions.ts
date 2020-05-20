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
