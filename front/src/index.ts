import Vue from 'vue';
import './main.less';
import VueRouter from 'vue-router';
import App from './App/index.vue';
import {router} from './router';

Vue.use(VueRouter);

new Vue({
    el: '#id',
    components: {App},
    template: '<App />',
    router,
});
