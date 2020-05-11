import Vue from 'vue';
import Vuex from 'vuex';

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
