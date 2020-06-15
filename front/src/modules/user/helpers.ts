import {RootAction} from '@/store/types';
import {retryAfterAuthAction} from './actions';

export const retryAction = (action: RootAction) => {
    return retryAfterAuthAction({
        action,
        retry: 0,
    });
};
