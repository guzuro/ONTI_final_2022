import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthService from "../Services/AuthService";
import store from "../store";

Vue.use(VueRouter)

const routes = [
    {
        component: () => import('../views/auth.vue'),
        path: '/login',
        name: 'Login',
    },
    {
        component: () => import('../layouts/DashboardLayout.vue'),
        path: '',
        children: [
            {
                component: () => import('../views/dashboard.vue'),
                path: '/office/:userId/dashboard/',
                name: 'Dashboard',
            },
            {
                component: () => import('../views/employee-list'),
                path: '/office/:userId/employees/',
                name: 'Employees',
            },
            {
                component: () => import('../views/roles-list'),
                path: '/office/:userId/roles/',
                name: 'Roles',
            },
            {
                component: () => import('../views/task-types'),
                path: '/office/:userId/taskTypes/',
                name: 'TaskTypes',
            },
            {
                component: () => import('../views/task'),
                path: '/office/:userId/task/',
                name: 'Task',
            },
            {
                component: () => import('../views/tasks'),
                path: '/office/:userId/tasks/',
                name: 'Tasks',
            },
            {
                component: () => import('../views/role-tasks'),
                path: '/office/:userId/role-tasks/',
                name: 'RoleTasks',
            },
            {
                component: () => import('../views/in-work-tasks'),
                path: '/office/:userId/in-work/',
                name: 'InWorkTasks',
            }
        ],
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.params.userId) {
        AuthService.checkLogin()
            .then(res => {
                store.dispatch('SET_USER', res)
                    .then(() => next())
                    .catch(() => next({name: "Login"}))
            })
            .catch(() => next({name: "Login"}))
    } else {
        next()
    }
})

export default router
