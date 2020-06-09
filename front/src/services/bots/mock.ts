import {JsonFetchResponse} from '@/util/requests';
import {GetBotsDto, GetSingleBotDto} from './dto';

const mockBots: JsonFetchResponse<GetBotsDto> = {
    data: {
        bots: [
            {
                name: 'Цветы',
                id: 1,
                membersCount: 1,
                image: 'https://sun9-30.userapi.com/c855324/v855324938/c5b19/ql6n2T90cyk.jpg?ava=1',
            },
            {
                name: 'Цветочки',
                id: 2,
                membersCount: 1,
                image: 'https://sun9-30.userapi.com/c855324/v855324938/c5b19/ql6n2T90cyk.jpg?ava=1',
            },
            {
                name: 'Хуёчки',
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
    await new Promise(resolve => (setTimeout(() => resolve(), 1000)));
    return mockBots;
};

export const getSingleBot = async (id: string): Promise<JsonFetchResponse<GetSingleBotDto>> => {
    await new Promise(resolve => (setTimeout(() => resolve(), 1000)));
    return {data: {bot: mockBots.data.bots[0]}, status: 200, ok: true};
};

export type CreateBotBody = {
    code: string;
    redirectUri: string;
}
export const createBot = async (body: CreateBotBody): Promise<JsonFetchResponse> => {
    await new Promise(resolve => (setTimeout(() => resolve(), 1000)));
    return {data: {}, ok: true, status: 200};
};
