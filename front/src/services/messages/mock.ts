import {GetMessageDto, RawMessageDto, GetAllMessagesDto} from './dto';
import {JsonFetchResponse} from '@/util/requests';

const messages: RawMessageDto[] = [
    {
        id: 2,
        botId: 1,
        name: 'xxx',
        text: 'asf asdg sadg asdg asd',
    },
    {
        id: 3,
        botId: 1,
        name: 'zzz',
        text: 'asf asdg sadg asdg asd',
    },
    {
        id: 4,
        botId: 1,
        name: 'yyy',
        text: 'asf asdg sadg asdg asd',
    },
    {
        id: 5,
        botId: 1,
        name: 'xxx',
        text: 'asf asdg sadg asdg asd',
    },
    {
        id: 6,
        botId: 1,
        name: 'zzz',
        text: 'asf asdg sadg asdg asd',
    },
    {
        id: 7,
        botId: 1,
        name: 'yyy',
        text: 'asf asdg sadg asdg asd',
    },
    {
        id: 8,
        botId: 1,
        name: 'yyy',
        text: 'asf asdg sadg asdg asd',
    },
    {
        id: 9,
        botId: 1,
        name: 'xxx',
        text: 'asf asdg sadg asdg asd',
    },
    {
        id: 10,
        botId: 1,
        name: 'zzz',
        text: 'asf asdg sadg asdg asd',
    },
    {
        id: 11,
        botId: 1,
        name: 'yyy',
        text: 'asf asdg sadg asdg asd',
    },
    {
        id: 12,
        botId: 1,
        name: 'zzz',
        text: 'asf asdg sadg asdg asd',
    },
    {
        id: 13,
        botId: 1,
        name: 'yyy',
        text: 'asf asdg sadg asdg asd',
    },
    {
        id: 14,
        botId: 1,
        name: 'xxx',
        text: 'asf asdg sadg asdg asd',
    },
    {
        id: 15,
        botId: 1,
        name: 'zzz',
        text: 'asf asdg sadg asdg asd',
    },
    {
        id: 16,
        botId: 1,
        name: 'yyy',
        text: 'asf asdg sadg asdg asd',
    },
    {
        id: 17,
        botId: 1,
        name: 'yyy',
        text: 'asf asdg sadg asdg asd',
    },
    {
        id: 18,
        botId: 1,
        name: 'xxx',
        text: 'asf asdg sadg asdg asd',
    },
    {
        id: 19,
        botId: 1,
        name: 'zzz',
        text: 'asf asdg sadg asdg asd',
    },
    {
        id: 20,
        botId: 1,
        name: 'yyy',
        text: 'asf asdg sadg asdg asd',
    },
];

const mockData: JsonFetchResponse<GetMessageDto> = {
    data: {
        presentMessage: {
            botId: 1,
            id: 1,
            name: 'name',
            text: 'text',
        },
        triggersPreviews: [
            {
                id: 1,
                sourceMessageId: 1,
                targetMessageId: 2,
                triggerType: 'plain_message',
            },
            {
                id: 2,
                sourceMessageId: 1,
                targetMessageId: 3,
                triggerType: 'plain_message',
            },
            {
                id: 3,
                sourceMessageId: 1,
                targetMessageId: 4,
                triggerType: 'plain_message',
            },
        ],
        nextMessages: messages,
    },
    status: 200,
    ok: true,
};

export const getFullMessage = (id: number): Promise<JsonFetchResponse<GetMessageDto>> => new Promise(r => r(mockData));
export const getAllBotMessages = async (botId: number): Promise<JsonFetchResponse<GetAllMessagesDto>> => ({
    status: 200,
    ok: true,
    data: {
        messages: [...messages, {
            botId: 1,
            id: 1,
            name: 'name',
            text: 'text',
        }],
    },
});
