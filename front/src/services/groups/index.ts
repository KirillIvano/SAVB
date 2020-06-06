import {fetchJson, getServerRequestUri} from '@/util/requests';

import {GetGroupsDto} from './dto';

export const getGroups = () => fetchJson<GetGroupsDto>(
    getServerRequestUri('/api/group'),
    {
        credentials: 'include',
    },
);
