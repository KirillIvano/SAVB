import {of, from} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

import {UserCredsType} from '@/modules/user/types';
import {RootAction} from '@/store/actions';
import {logoutStartAction, updateCreds} from '@/modules/user/actions';
import {saveCreds, refreshTokens} from '@/services/auth';

export const tryAuthorizeOperator = (
    sourceAction: RootAction,
    creds: UserCredsType | null,
) => of(sourceAction)
    .pipe(
        mergeMap(() => {
            if (!creds || creds.refreshExp < (Date.now() / 1000)) {
                return of(logoutStartAction());
            }

            const {userId, csrf} = creds;

            return from(refreshTokens(userId, csrf)).pipe(
                mergeMap((res) => {
                    if (!res.ok) {
                        return of(logoutStartAction());
                    }

                    const newCreds = {...res.data, userId};
                    saveCreds(newCreds);

                    return of(
                        updateCreds(newCreds),
                        sourceAction,
                    );
                }),
            );
        }),
    );
