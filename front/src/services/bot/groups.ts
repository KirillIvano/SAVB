import {GroupsGetDto} from './dto/groups';

export const getGroups = (): GroupsGetDto => ({
    ok: true,
    data: {
        groups: [{
            name: 'xxx',
            id: 1,
            membersCount: 111,
        }],
    },
});
