import {fetchJson} from '@/util/requests';

import {GetGroupsDto} from './dto';

export const getGroups = () => fetchJson<GetGroupsDto>(
    'http://127.0.0.1:8080/api/',
);
