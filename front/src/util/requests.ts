type FetchResponseCommonProps = {
    status: number;
}

export type JsonFetchResponse<Payload extends object = {}> = ({
    data: Payload;
    ok: true;
} | {
    error: string;
    ok: false;
}) & FetchResponseCommonProps;

export const UNKNOWN_ERROR_RESPONSE: JsonFetchResponse = {
    ok: false,
    error: 'Произошла неизвестная ошибка, перезагрузите, пожалуйста, страницу',
    status: 400,
};

// path is of form: /path/to/smth

export const fetchJson = async <ResponsePayload extends object>(
    path: RequestInfo,
    options?: RequestInit,
): Promise<JsonFetchResponse<ResponsePayload>> => {
    try {
        const response = await fetch(path, options);
        const {ok, status} = response;

        const body = await response.json();

        if (ok) {
            const {data} = body as {data: ResponsePayload};

            return {ok, data, status};
        }

        const error = (body as {error: string}).error || UNKNOWN_ERROR_RESPONSE.error;
        return {ok, error, status};

    } catch(e) {
        // eslint-disable-next-line no-console
        return UNKNOWN_ERROR_RESPONSE;
    }
};

export const getQueryParams = (
    params: Record<string, string>,
) => Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&');

export const getServerRequestUri = (path: string ) => `${__SERVER_ORIGIN__}${path}`;
