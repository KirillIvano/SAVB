import {GetStageDto, RawStageDto, GetAllStagesDto} from './dto';
import {JsonFetchResponse} from '@/util/requests';

const stages: RawStageDto[] = [
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

const mockData: JsonFetchResponse<GetStageDto> = {
    data: {
        presentStage: {
            botId: 1,
            id: 1,
            name: 'name',
            text: 'text',
        },
        triggersPreviews: [
            {
                id: 1,
                sourceStageId: 1,
                targetStageId: 2,
                triggerType: 'plain_stage',
            },
            {
                id: 2,
                sourceStageId: 1,
                targetStageId: 3,
                triggerType: 'plain_stage',
            },
            {
                id: 3,
                sourceStageId: 1,
                targetStageId: 4,
                triggerType: 'plain_stage',
            },
        ],
        nextStages: stages,
    },
    status: 200,
    ok: true,
};

export const getFullStage = (id: number): Promise<JsonFetchResponse<GetStageDto>> => new Promise(r => r(mockData));
export const getAllBotStages = async (botId: number): Promise<JsonFetchResponse<GetAllStagesDto>> => ({
    status: 200,
    ok: true,
    data: {
        stages: [...stages, {
            botId: 1,
            id: 1,
            name: 'name',
            text: 'text',
        }],
    },
});
