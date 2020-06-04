export type LoginDto = {
    csrf: string;
    refreshExp: number;
    accessExp: number;
    userId: number;
};

export type RefreshTokenDto = {
    csrf: string;
    refreshExp: number;
    accessExp: number;
}

export type GetUserDto = {
    name: string;
    image: string;
}
