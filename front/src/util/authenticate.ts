import {parse} from 'qs';

export const getUserAuthUrl = () =>
    'https://oauth.vk.com/authorize?' +
    'client_id=7471373&' +
    'display=page&' +
    `redirect_uri=${__CLIENT_ORIGIN__}/userAuthPending&` +
    'scope=friends&response_type=code&v=5.103';

export const getCodeFromSearchParams = (search: string) =>
    parse(search, {ignoreQueryPrefix: true}).code as string | undefined;
