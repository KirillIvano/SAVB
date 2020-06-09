export type MessageAction = {
    type: 'log';
    log: string;
}

export type AuthAction = {
    type: 'auth';
    auth: boolean;
}
