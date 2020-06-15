import {RootAction} from '@/store/types';
import {retryAfterAuth} from './actions';

export const retryAction = (action: RootAction) => {
    return retryAfterAuth({
        action,
        retry: 0,
    });
};
