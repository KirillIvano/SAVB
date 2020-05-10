import {Module} from 'vuex';

import {RootStateType} from '@/redux/types';

import {PopupMessageStateType} from './types';
import {mutations} from './mutations';
import {actions} from './actions';
import {getters} from './getters';

export const state: PopupMessageStateType = {
    messages: [],
};

export const popupMessageModule: Module<PopupMessageStateType, RootStateType> = {
    state,
    mutations,
    actions,
    getters,
};
