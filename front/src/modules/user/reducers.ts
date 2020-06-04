import {createReducer} from 'typesafe-actions';

import * as actions from './actions';
import {UserState, UserActionType} from './types';

const initialState: UserState = {
    isLoggedIn: false,

    isAppInitialized: false,

    info: null,
    creds: null,

    loggingInProgress: false,
    loggingInError: null,
    loggingInSuccess: false,

    loggingOutInProgress: false,

    userGettingInProgress: false,
    userGettingError: null,

    tryAuthInProgress: false,
    tryAuthFailed: false,
};

export const userReducer = createReducer<UserState, UserActionType>(initialState)
    .handleAction(
        actions.loginStartAction,
        state => ({
            ...state,
            creds: null,
            loggingInProgress: true,
            loggingInError: null,
            loggingInSuccess: false,
        }),
    )
    .handleAction(
        [actions.loginSuccessAction],
        state => ({
            ...state,
            isLoggedIn: true,
            loggingInProgress: false,
            loggingInSuccess: true,
        }),
    ).handleAction(
        actions.loginErrorAction,
        (state, action) => ({
            ...state,
            loggingInProgress: false,
            loggingInError: action.payload,
        }),
    )

    .handleAction(
        actions.logoutStartAction,
        () => ({
            ...initialState,
            isAppInitialized: true,
            loggingOutInProgress: true,
        }),
    ).handleAction(
        actions.logoutSuccessAction,
        state => ({
            ...state,
            loggingOutInProgress: false,
        }),
    )

    .handleAction(
        actions.getUserStartAction,
        state => ({
            ...state,
            userGettingInProgress: true,
            info: null,
        }),
    ).handleAction(
        actions.getUserSuccessAction,
        (state, {payload: info}) => ({
            ...state,
            info,
            userGettingInProgress: false,
        }),
    ).handleAction(
        actions.getUserErrorAction,
        (state, {payload: error}) => ({
            ...state,
            userGettingInProgress: false,
            userGettingError: error,
        }),
    )

    .handleAction(
        actions.tryAuthStartAction,
        state => ({
            ...state,
            tryAuthInProgress: true,
            tryAuthFailed: false,
        }),
    ).handleAction(
        actions.tryAuthSuccessAction,
        state => ({
            ...state,
            isLoggedIn: true,
            tryAuthInProgress: false,
            isAppInitialized: true,
        }),
    ).handleAction(
        actions.tryAuthErrorAction,
        state => ({
            ...state,
            tryAuthInProgress: false,
            tryAuthFailed: true,
            isAppInitialized: true,
        }),
    )

    .handleAction(
        actions.updateCreds,
        (state, {payload: creds}) => ({
            ...state,
            creds,
        }),
    );
