import {JsonFetchResponse} from '@/util/requests';
import {GetGroupsDto} from './dto';

const mockData: JsonFetchResponse<GetGroupsDto> = {
    data: {
        groups: [
            {
                name: 'xxx',
                id: 1,
                isUsed: false,
                image: 'https://sun9-30.userapi.com/c855324/v855324938/c5b19/ql6n2T90cyk.jpg?ava=1',
            },
            {
                name: 'xxx',
                id: 2,
                isUsed: false,
                image: 'https://sun9-30.userapi.com/c855324/v855324938/c5b19/ql6n2T90cyk.jpg?ava=1',
            },
            {
                name: 'xxx',
                id: 3,
                isUsed: true,
                image: 'https://sun9-30.userapi.com/c855324/v855324938/c5b19/ql6n2T90cyk.jpg?ava=1',
            },
            {
                name: 'xxx',
                id: 4,
                isUsed: false,
                image: 'https://sun9-30.userapi.com/c855324/v855324938/c5b19/ql6n2T90cyk.jpg?ava=1',
            },
        ],
    },
    status: 200,
    ok: true,
};

export const getGroups = async (): Promise<JsonFetchResponse<GetGroupsDto>> => {
    await new Promise(resolve => (setTimeout(() => resolve(), 500)));
    return mockData;
};
