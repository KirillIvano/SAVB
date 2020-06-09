import {fetchJson, getServerRequestUri} from '@/util/requests';

import {
    LoginDto,
    RefreshTokenDto,
    GetUserDto,
} from './dto';
import {UserCredsType} from '@/modules/user/types';

export const login = (code: string, redirectUri: string) => fetchJson<LoginDto>(
    getServerRequestUri('/api/auth/login'),
    {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({code, redirectUri}),
        headers: {
            'Content-Type': 'application/json',
        },
    },
);

export const refreshTokens = (userId: number, csrf: string) => fetchJson<RefreshTokenDto>(
    getServerRequestUri('/api/auth/refreshTokens'),
    {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({userId, csrf}),
        headers: {
            'Content-Type': 'application/json',
        },
    },
);

export const getUser = (userId: number) => fetchJson<GetUserDto>(
    getServerRequestUri(`/api/user/info?userId=${userId}`),
    {
        credentials: 'include',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    },
);

export const saveCreds = (creds: UserCredsType) => localStorage.setItem('creds', JSON.stringify(creds));
export const clearCreds = () => localStorage.removeItem('creds');
export const getCreds = (): UserCredsType | null => {
    const creds = localStorage.getItem('creds');
    if (!creds) return null;

    try {
        return JSON.parse(creds);
    } catch {
        clearCreds();
        return null;
    }
};
