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


export const fetchJson = async <ResponsePayload extends object>(
    url: RequestInfo,
    options?: RequestInit,
): Promise<JsonFetchResponse<ResponsePayload>> => {
    try {
        const response = await fetch(url, options);
        const {ok, status} = response;

        const body = await response.json();

        if (ok) {
            const {data} = body as {data: ResponsePayload};

            return {ok, data, status};
        }

        const error = (body as {error: string}).error;
        return {ok, error, status};

    } catch(e) {
        // eslint-disable-next-line no-console
        console.log(e);
        return UNKNOWN_ERROR_RESPONSE;
    }
};


// path is of form: /path/to/smth
export const getServerRequestUrl = (path: string) => `${__SERVER_ORIGIN__}${path}`;
