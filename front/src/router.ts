import VueRouter, {RouteConfig} from 'vue-router';

import {
    VkAuthPage,
    VkAuthValidatePage,
    NotFoundPage,
    GroupsPage,
} from './pages';

const routes: RouteConfig[] = [
    {path: '/vkAuth', component: VkAuthPage},
    {path: '/groups', component: GroupsPage},
    {
        path: '/validateAuth',
        component: VkAuthValidatePage,
        props: route => ({
            code: route.query.code,
            redirectUri: route.query.state,
        }),
    },
    {path: '*', component: NotFoundPage},
];

export const router = new VueRouter({
    mode: 'history',
    routes,
});


