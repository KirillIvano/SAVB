import {fetchJson, getServerRequestUri} from '@/util/requests';

import {GetStageDto, GetAllStagesDto} from './dto';

export const getFullStage = (stageId: number) => fetchJson<GetStageDto>(
    getServerRequestUri(`/stage/${stageId}`),
    {
        credentials: 'include',
    },
);

export const getAllBotStages = (botId: number) => fetchJson<GetAllStagesDto>(
    getServerRequestUri(`/stage/byBot?botId=${botId}`),
    {
        credentials: 'include',
    },
);
