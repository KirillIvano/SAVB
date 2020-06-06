import {fetchJson, getServerRequestUri} from '@/util/requests';

import {GetBotsDto} from './dto';

export const getBots = () => fetchJson<GetBotsDto>(
    'http://127.0.0.1:8080/api/',
);

export type CreateBotBody = {
    code: string;
    redirectUri: string;
}
export const authGroup = (body: CreateBotBody) => fetchJson(
    getServerRequestUri('/api/group/createBot'),
    {
        credentials: 'include',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    },
);
