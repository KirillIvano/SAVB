import {JsonFetchResponse} from '@/util/requests';
import {GetBotsDto} from './dto';

const mockBots: JsonFetchResponse<GetBotsDto> = {
    data: {
        bots: [
            {
                name: 'xxx',
                id: 1,
                membersCount: 1,
                image: 'https://sun9-30.userapi.com/c855324/v855324938/c5b19/ql6n2T90cyk.jpg?ava=1',
            },
            {
                name: 'xxx',
                id: 2,
                membersCount: 1,
                image: 'https://sun9-30.userapi.com/c855324/v855324938/c5b19/ql6n2T90cyk.jpg?ava=1',
            },
            {
                name: 'xxx',
                id: 3,
                membersCount: 1,
                image: 'https://sun9-30.userapi.com/c855324/v855324938/c5b19/ql6n2T90cyk.jpg?ava=1',
            },
        ],
    },
    status: 200,
    ok: true,
};

export const getBots = async (): Promise<JsonFetchResponse<GetBotsDto>> => {
    await new Promise(resolve => (setTimeout(() => resolve(), 500)));
    return mockBots;
};

export type CreateBotBody = {
    code: string;
    redirectUri: string;
}
export const createBot = async (body: CreateBotBody): Promise<JsonFetchResponse> => {
    await new Promise(resolve => (setTimeout(() => resolve(), 500)));
    return {data: {}, ok: true, status: 200};
};
