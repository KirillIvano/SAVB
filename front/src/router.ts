import VueRouter, {RouteConfig} from 'vue-router';

import {
    VkAuthPage,
    VkAuthValidatePage,
    NotFoundPage,
} from './pages';

const routes: RouteConfig[] = [
    {path: '/vk_auth', component: VkAuthPage},
    {path: '/validate_auth', component: VkAuthValidatePage},
    {path: '*', component: NotFoundPage},
];

export const router = new VueRouter({
    mode: 'history',
    routes,
});


