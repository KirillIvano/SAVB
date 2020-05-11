import {ActionTree} from 'vuex';

import {RootStateType} from '@/redux/types';

import {
    POP_MESSAGE,
    PUSH_MESSAGE,
} from './names';
import {PopupMessageType, PopupMessageStateType} from './types';

export const actions: ActionTree<PopupMessageStateType, RootStateType> = {
    PUSH_MESSAGE({commit}, message: PopupMessageType) {
        commit(PUSH_MESSAGE, message);

        setTimeout(() => commit(POP_MESSAGE), 5000);
    },
};
