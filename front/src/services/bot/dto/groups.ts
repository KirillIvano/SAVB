import {ResponseType} from '@/util/requests';

export type RawGroupType = {
    id: number;
    membersCount: number;
    name: string;
}

export type GroupsGetDto = ResponseType<{groups: RawGroupType[]}>;
