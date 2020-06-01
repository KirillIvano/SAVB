export type JsonFetchResponse<Payload extends object = {}> = {
    data: Payload;
    ok: true;
} | {
    error: string;
    ok: false;
};

export const UNKNOWN_ERROR_RESPONSE: JsonFetchResponse = {
    ok: false,
    error: 'Произошла неизвестная ошибка, перезагрузите, пожалуйста, страницу',
};

export const fetchJson = async <ResponsePayload extends object>(
    url: RequestInfo,
    options?: RequestInit,
): Promise<JsonFetchResponse<ResponsePayload>> => {
    let ok: boolean, body;
    try {
        const response = await fetch(url, options);
        ok = response.ok;
        body = await response.json();
    } catch {
        return UNKNOWN_ERROR_RESPONSE;
    }

    if (ok) {
        const data = (body as {data: ResponsePayload}).data;
        return {ok, data};
    }

    const error = (body as {error: string}).error;
    return {ok, error};
};
