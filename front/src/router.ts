import VueRouter, {RouteConfig} from 'vue-router';

import {
    VkAuthPage,
    VkAuthValidatePage,
} from './pages';

const routes: RouteConfig[] = [
    {path: '/validate_auth', component: VkAuthValidatePage},
    {path: '/vk_auth', component: VkAuthPage},
];

export const router = new VueRouter({routes});


