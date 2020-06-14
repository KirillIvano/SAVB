import {fetchJson, getServerRequestUri} from '@/util/requests';

import {GetMessageDto, GetAllMessagesDto} from './dto';

export const getFullMessage = (messageId: number) => fetchJson<GetMessageDto>(
    getServerRequestUri(`/message/${messageId}`),
    {
        credentials: 'include',
    },
);

export const getAllBotMessages = (botId: number) => fetchJson<GetAllMessagesDto>(
    getServerRequestUri(`/message/byBot?botId=${botId}`),
    {
        credentials: 'include',
    },
);
