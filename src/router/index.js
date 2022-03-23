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
