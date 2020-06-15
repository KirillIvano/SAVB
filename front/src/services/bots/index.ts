import {fetchJson, getServerRequestUri} from '@/util/requests';

import {GetBotsDto, GetSingleBotDto} from './dto';

export const getBots = () => fetchJson<GetBotsDto>(
    'http://127.0.0.1:8080/api/',
);

export const getSingleBot = (botId: string) => fetchJson<GetSingleBotDto>(
    getServerRequestUri(`/api/bot/${botId}`),
    {
        credentials: 'include',
    },
);

export type CreateBotBody = {
    code: string;
    redirectUri: string;
}
export const authGroup = (body: CreateBotBody) => fetchJson(
    getServerRequestUri('/api/bot'),
    {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    },
);
