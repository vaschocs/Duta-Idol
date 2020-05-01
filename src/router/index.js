import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import VoteJuri from '../views/VoteJuri.vue'
import SignIn from '../views/SignIn.vue'
import Dashboard from '../views/Dashboard.vue'
import Report from '../views/Admin/Report.vue'
import store from '@/store'
import Juri from '../views/Admin/Juri.vue'
import Peserta from '../views/Admin/Peserta.vue'
import Sesi from '../views/Admin/Sesi.vue'
import Vue from 'vue'
import DataPeserta from '../views/DataPeserta'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/votejuri',
        name: 'votejuri',
        component: VoteJuri,
        beforeEnter: (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
                return next({
                    name: 'signin'
                })
            }
            next()
        }
    },
    {
        path: '/datapeserta',
        name: 'datapeserta',
        component: DataPeserta,
        beforeEnter: (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
                return next({
                    name: 'signin'
                })
            }
            next()
        }
    },
    {
        path: '/signin',
        name: 'signin',
        component: SignIn
    },
    {
        path: '/sesi',
        name: 'sesi',
        component: Sesi,
        beforeEnter: (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
                return next({
                    name: 'signin'
                })
            }
            next()
        }
    },
    {
        path: '/juri',
        name: 'juri',
        component: Juri,
        beforeEnter: (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
                return next({
                    name: 'signin'
                })
            }
            next()
        }
    },
    {
        path: '/peserta',
        name: 'peserta',
        component: Peserta,
        beforeEnter: (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
                return next({
                    name: 'signin'
                })
            }
            next()
        }
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        beforeEnter: (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
                return next({
                    name: 'signin'
                })
            }
            next()
        }
    },
    {
        path: '/report',
        name: 'report',
        component: Report,
        beforeEnter: (to, from, next) => {
            if (!store.getters['auth/authenticated']) {
                return next({
                    name: 'signin'
                })
            }
            next()
        }
    }

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
