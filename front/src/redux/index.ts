import Vue from 'vue';
import Vuex, {StoreOptions} from 'vuex';

import {popupMessageModule} from '@/entities/popupMessage/state';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        popup: popupMessageModule,
    },
});
