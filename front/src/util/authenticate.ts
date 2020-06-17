import {parse, stringify} from 'qs';
import {cached} from './cached';

const commonVkAuthProps = {
    'client_id': 7471373,
    'display': 'page',
    'response_type': 'code',
    'v': '5.103',
};

export const getUserAuthUrl = cached(() =>
    'https://oauth.vk.com/authorize?' + stringify({
        ...commonVkAuthProps,
        'redirect_uri': `${__CLIENT_ORIGIN__}/userAuthPending`,
        'scope': 'friends,groups,photos,offline',
    }));

export const getGroupAuthUrl = (groupId: number) =>
    'https://oauth.vk.com/authorize?' + stringify({
        ...commonVkAuthProps,
        'redirect_uri': `${__CLIENT_ORIGIN__}/groupAuthPending`,
        'scope': 'photos,stages,docs,manage',
        'group_ids': String(groupId),
    });

export const getCodeFromSearchParams = (search: string) =>
    parse(search, {ignoreQueryPrefix: true}).code as string | undefined;
