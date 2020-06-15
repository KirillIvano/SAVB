import {RawBotType} from '@/services/bots/dto';

import {BotType} from './types';

export const clientifyBot = (bot: RawBotType): BotType => ({
    ...bot,
    id: String(bot.id),
});

export const clientifyBotsArr = (messages: RawBotType[]) =>
    messages.reduce(
        (acc: Record<string, BotType>, bot) => {
            const botId = String(bot.id);

            acc[botId] = clientifyBot(bot);

            return acc;
        }, {},
    );
