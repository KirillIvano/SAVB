export type RawBotType = {
    id: number;
    name: string;
    membersCount: number;
    image: string;
}

export type GetBotsDto = {
    bots: RawBotType[];
}
