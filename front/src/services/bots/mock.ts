import {JsonFetchResponse} from '@/util/requests';
import {GetBotsDto} from './dto';

const mockData: JsonFetchResponse<GetBotsDto> = {
    data: {
        bots: [
            {
                name: 'xxx',
                id: 1,
                membersCount: 1,
                image: 'http://images.flatworldknowledge.com/cooperecon/cooperecon-fig22_005.jpg',
            },
            {
                name: 'xxx',
                id: 1,
                membersCount: 1,
                image: 'http://images.flatworldknowledge.com/cooperecon/cooperecon-fig22_005.jpg',
            },
            {
                name: 'xxx',
                id: 1,
                membersCount: 1,
                image: 'http://images.flatworldknowledge.com/cooperecon/cooperecon-fig22_005.jpg',
            },
        ],
    },
    ok: true,
};

export const getBots = async (): Promise<JsonFetchResponse<GetBotsDto>> => {
    await new Promise(resolve => (setTimeout(() => resolve(), 1000)));
    return mockData;
};
