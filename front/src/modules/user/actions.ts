import {createAction} from 'typesafe-actions';

import * as names from './names';
import {UserInfoType, UserCredsType} from './types';

export type LoginStartPayload = {
    code: string;
    redirectUri: string;
};

export const loginStartAction = createAction(
    names.LOGIN_START,
    (loginInfo: LoginStartPayload) => loginInfo,
)();
export const loginSuccessAction = createAction(
    names.LOGIN_SUCCESS,
    (creds: UserCredsType) => creds,
)();
export const loginErrorAction = createAction(
    names.LOGIN_ERROR,
    (error: string) => error,
)();

export const logoutStartAction = createAction(
    names.LOGOUT_START,
)();
export const logoutSuccessAction = createAction(
    names.LOGOUT_SUCCESS,
)();

export const getUserStartAction = createAction(
    names.USER_GET_START,
    (userId: number) => userId,
)();
export const getUserSuccessAction = createAction(
    names.USER_GET_SUCCESS,
    (data: UserInfoType) => data,
)();
export const getUserErrorAction = createAction(
    names.USER_GET_ERROR,
    (error: string) => error,
)();

export const tryAuthStartAction = createAction(names.TRY_AUTH_START)();
export const tryAuthSuccessAction = createAction(names.TRY_AUTH_SUCCESS)();
export const tryAuthErrorAction = createAction(names.TRY_AUTH_ERROR)();

export const refreshTokensStartAction = createAction(names.REFRESH_TOKENS_START)();
export const refreshTokensSuccessAction = createAction(
    names.REFRESH_TOKENS_SUCCESS,
    (credsUpdate: UserCredsType) => credsUpdate,
)();
export const refreshTokensErrorAction = createAction(names.REFRESH_TOKENS_ERROR)();

export const updateCreds = createAction(
    names.UPDATE_CREDS,
    (creds: UserCredsType) => creds,
)();
