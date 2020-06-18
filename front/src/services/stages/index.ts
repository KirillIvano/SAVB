import {fetchJson, getServerRequestUri} from '@/util/requests';

import {GetStageDto, GetAllStagesDto} from './dto';

export const getFullStage = (stageId: number) => fetchJson<GetStageDto>(
    getServerRequestUri(`/api/stage/${stageId}`),
    {
        credentials: 'include',
    },
);

export const getAllBotStages = (botId: number) => fetchJson<GetAllStagesDto>(
    getServerRequestUri(`/api/stage/byBot?botId=${botId}`),
    {
        credentials: 'include',
    },
);
