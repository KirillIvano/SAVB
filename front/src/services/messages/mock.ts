import {GetMessageDto} from './dto';
import { JsonFetchResponse } from '@/util/requests';

const mockData: JsonFetchResponse<GetMessageDto> = {
    data: {
        presentMessage: {
            id: 1,
            name: 'xxx',
            text: 'asf asdg sadg asdg asd',
        },
        triggers: [],
        nextMessages: [],
    },
    status: 200,
    ok: true,
};

export const getMessage = (id: number) => new Promise(r => r(mockData));
