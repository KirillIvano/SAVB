import {ActionType} from 'typesafe-actions';

import * as actions from './actions';

export type UserInfoType = {
    name: string;
    image: string;
}

export type UserCredsType = {
    userId: number;
    refreshExp: number;
    accessExp: number;
    csrf: string;
}

export type UserState = {
    isLoggedIn: boolean;
    isAppInitialized: boolean;

    creds: UserCredsType | null;
    info: UserInfoType | null;

    loggingInProgress: boolean;
    loggingInError: string | null;
    loggingInSuccess: boolean;

    loggingOutInProgress: boolean;

    userGettingInProgress: boolean;
    userGettingError: string | null;

    tryAuthInProgress: boolean;
    tryAuthFailed: boolean;
}

export type UserActionType = ActionType<typeof actions>;
