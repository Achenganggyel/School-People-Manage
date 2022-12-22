import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router";
import { usePermissStore } from '../store/permiss'
import Home from "../views/home.vue";

const routes:RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/dashboard'
    }, {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '系统首页',
                    permiss: '1'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/dashboard.vue")
            }, {
                path: "/teacher",
                name: "table_teacher",
                meta: {
                    title: '教师信息',
                    permiss: '2'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/management/teacher.vue")
            },{
                path: "/student",
                name: "table_stduent",
                meta: {
                    title: '学生信息',
                    permiss: '2'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/management/student.vue")
            },{
                path: "/stuff",
                name: "table_stuff",
                meta: {
                    title: '行政人员',
                    permiss: '2'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/management/stuff.vue")
            },{
                path: "/mobileWorker",
                name: "table_mobile",
                meta: {
                    title: '流动人员',
                    permiss: '2'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/management/mobile_worker.vue")
            },
             {
                path: "/charts",
                name: "basecharts",
                meta: {
                    title: '图表',
                    permiss: '11'
                },
                component: () => import ( /* webpackChunkName: "charts" */ "../views/charts.vue")
            }, {
                path: "/form",
                name: "baseform",
                meta: {
                    title: '通知发送',
                    permiss: '5'
                },
                component: () => import ( /* webpackChunkName: "form" */ "../views/form.vue")
            }, {
                path: "/tabs",
                name: "tabs",
                meta: {
                    title: '通知接收',
                    permiss: '3'
                },
                component: () => import ( /* webpackChunkName: "tabs" */ "../views/tabs.vue")
            }, {
                path: "/info",
                name: "info",
                meta: {
                    title: '系统信息',
                    permiss: '14'
                },
                component: () => import ( /* webpackChunkName: "info" */ "../views/info.vue")
            }, {
                path: "/permission",
                name: "permission",
                meta: {
                    title: '权限管理',
                    permiss: '13'
                },
                component: () => import ( /* webpackChunkName: "permission" */ "../views/permission.vue")
            }, {
                path: '/user',
                name: 'user',
                meta: {
                    title: '个人中心'
                },
                component: () => import (/* webpackChunkName: "user" */ '../views/user.vue')
            }
        ]
    }, {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import ( /* webpackChunkName: "login" */ "../views/login.vue")
    }, {
        path: '/403',
        name: '403',
        meta: {
            title: '没有权限'
        },
        component: () => import (/* webpackChunkName: "403" */ '../views/403.vue')
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | SchoolPeople_Manage`;
    const role = localStorage.getItem('ms_username');
    const permiss = usePermissStore();
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permiss && !permiss.key.includes(to.meta.permiss)) {
        // 如果没有权限，则进入403
        next('/403');
    } else {
        next();
    }
});

export default router;