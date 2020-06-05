import {from, of} from 'rxjs';
import {Epic, combineEpics} from 'redux-observable';
import {
    mergeMap,
    filter,
    switchMap,
    exhaustMap,
    catchError,
} from 'rxjs/operators';
import {isOfType} from 'typesafe-actions';

import {RootState, RootAction} from '@/store/types';
import {
    login,
    getCreds,
    saveCreds,
    refreshTokens,
    clearCreds,
    getUser,
} from '@/services/auth';
import {addPopupSuccessMessage, addPopupErrorMessage} from '@/modules/popup/actions';
import {tryAuthorizeOperator} from '@/util/rxUtil';

import * as names from './names';
import * as actions from './actions';
import {UserCredsType} from './types';

const loginEpic: Epic<RootAction, RootAction, RootState> =
    action$ => action$.pipe(
        filter(isOfType(names.LOGIN_START)),
        switchMap(
            ({payload: {code, redirectUri}}) => from(login(code, redirectUri)),
        ),
        mergeMap(
            res => {
                if (res.ok) {
                    const {data: creds} = res;

                    saveCreds(creds);

                    return of(
                        actions.loginSuccessAction(creds),
                        actions.updateCreds(creds),
                        actions.getUserStartAction(creds.userId),
                        addPopupSuccessMessage('Вы были успешно залогинены'),
                    );
                }

                return of(
                    actions.loginErrorAction(res.error),
                    addPopupErrorMessage(res.error),
                );
            },
        ),
    );

const logoutEpic: Epic<RootAction, RootAction, RootState> =
    action$ => action$.pipe(
        filter(isOfType(names.LOGOUT_START)),
        mergeMap(
            () => {
                clearCreds();

                return of(
                    actions.logoutSuccessAction(),
                    addPopupSuccessMessage('Вы успешно вышли'),
                );
            },
        ),
    );

const refreshTokensObservableCreator = (
    creds: UserCredsType,
) =>
    from(refreshTokens(creds.userId, creds.csrf))
        .pipe(
            mergeMap(res => {
                if (!res.ok) {
                    return of(
                        addPopupErrorMessage(res.error),
                        actions.tryAuthErrorAction(),
                    );
                }

                saveCreds(Object.assign(creds, res.data));

                return of(
                    actions.tryAuthSuccessAction(),
                    actions.updateCreds(creds),
                    actions.getUserStartAction(creds.userId),
                );
            }),
        );

const tryAuthEpic: Epic<RootAction, RootAction, RootState> =
    action$ => action$.pipe(
        filter(isOfType(names.TRY_AUTH_START)),
        switchMap(() => {
            const creds = getCreds();

            if (!creds) {
                return of(
                    actions.tryAuthErrorAction(),
                );
            }

            const presentTimeInSeconds = Date.now() / 1000;

            if (presentTimeInSeconds > creds.accessExp) {
                if (presentTimeInSeconds > creds.refreshExp) {
                    return of(
                        actions.tryAuthErrorAction(),
                    );
                }

                return refreshTokensObservableCreator(creds);
            }

            return of(
                addPopupSuccessMessage('Вы были успешно авторизованы'),
                actions.updateCreds(creds),
                actions.tryAuthSuccessAction(),
                actions.getUserStartAction(creds.userId),
            );
        }),
    );

const refreshTokensEpic: Epic<RootAction, RootAction, RootState> =
    (action$, state) => action$.pipe(
        filter(isOfType(names.REFRESH_TOKENS_START)),
        exhaustMap(() => {
            const {creds} = state.value.userState;
            const {refreshExp, userId, csrf} = creds as UserCredsType;

            const presentTimeInSeconds = Date.now() / 1000;

            if (refreshExp > presentTimeInSeconds) {
                return from(refreshTokens(userId, csrf)).pipe(
                    mergeMap((res) => {
                        if (!res.ok) {
                            return of(
                                actions.logoutStartAction(),
                                addPopupErrorMessage('Авторизационные данные были повреждены'),
                            );
                        }

                        return of(
                            actions.refreshTokensSuccessAction({...res.data, userId}),
                        );
                    }),
                );
            }

            return of(
                actions.refreshTokensErrorAction(),
                addPopupErrorMessage('Авторизационные данные были повреждены'),
            );
        }),
    );

const getUserEpic: Epic<RootAction, RootAction, RootState> =
    (action$, state) => action$.pipe(
        filter(isOfType(names.USER_GET_START)),
        switchMap(src =>
            from(getUser(src.payload))
                .pipe(switchMap(res => {
                    if (res.status === 401) {
                        return tryAuthorizeOperator(
                            src,
                            state.value.userState.creds,
                        );
                    }

                    if (res.ok) {
                        return of(
                            actions.getUserSuccessAction(res.data),
                        );
                    }

                    return of(actions.getUserErrorAction(res.error));
                })),
        ),
        catchError(
            () => of(actions.logoutStartAction()),
        ),
    );

export default combineEpics(
    loginEpic,
    logoutEpic,
    getUserEpic,
    refreshTokensEpic,
    tryAuthEpic,
);
