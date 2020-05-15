export type ResponseType<Payload extends object> = {
    data: Payload;
    ok: true;
} | {
    error: string;
    ok: false;
};
