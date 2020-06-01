export type RawGroupType = {
    image: string;
    name: string;
    id: number;
    isUsed: boolean;
}

export type GetGroupsDto = {
    groups: RawGroupType[];
}
