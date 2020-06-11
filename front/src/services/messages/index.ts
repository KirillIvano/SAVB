import {fetchJson, getServerRequestUri} from '@/util/requests';

import {GetMessageDto} from './dto';

export const getMessage = (messageId: number) => fetchJson<GetMessageDto>(
    getServerRequestUri(`/message/${messageId}`),
);
