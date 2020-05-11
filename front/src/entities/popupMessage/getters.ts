import {GetterTree} from 'vuex';

import {RootStateType} from '@/redux/types';

import {PopupMessageType, PopupMessageStateType} from './types';

export const getters: GetterTree<PopupMessageStateType, RootStateType> = {
    getMessages(state): PopupMessageType[] {
        return state.messages;
    },
};

