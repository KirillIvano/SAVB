import {BotsStateType} from './types';

export const getBotName = (state: BotsStateType, id: string): string | undefined =>
    state.bots[id]?.name;
