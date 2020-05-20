import {fetchJson} from '@/util/requests';

import {GetBotsDto} from './dto';

export const getBots = () => fetchJson<GetBotsDto>(
    'http://127.0.0.1:8080/api/',
);
