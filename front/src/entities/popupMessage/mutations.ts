import {MutationTree} from 'vuex';

import {PUSH_MESSAGE, POP_MESSAGE} from './names';
import {PopupMessageStateType, PopupMessageType} from './types';

export const mutations: MutationTree<PopupMessageStateType> = {
    [PUSH_MESSAGE](state, message: PopupMessageType) {
        state.messages = [...state.messages, message];
    },
    [POP_MESSAGE](state) {
        state.messages = state.messages.slice(1);
    },
};
