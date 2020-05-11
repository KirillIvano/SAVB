import Vue from 'vue';
import VueRouter from 'vue-router';

import {} from '@/redux';

import './main.less';
import App from './App/index.vue';
import {router} from './router';


Vue.use(VueRouter);

new Vue({
    el: '#id',
    components: {App},
    template: '<App />',
    router,
});
