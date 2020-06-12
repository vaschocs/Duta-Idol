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
import Challenge from '../views/ChallengePakArgo.vue'


Vue.use(VueRouter)


const routes = [{
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            title: "HOME",
            icon: "../assets/Untitled-1.png"
        }
    },
    {
        path: '/votejuri',
        name: 'votejuri',
        meta: {
            title: "VOTE JURI",
            icon: "../assets/Untitled-1.png"
        },
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
        meta: {
            title: "DATA PESERTA",
            icon: "../assets/Untitled-1.png"
        },
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
        component: SignIn,
        meta: {
            title: "LOGIN",
            icon: "/lock.png"
        }
    },
    {
        path: '/challenge',
        name: 'challenge',
        component: Challenge,
        meta: {
            title: "Challenge",

        }
    },
    {
        path: '/sesi',
        name: 'sesi',
        meta: {
            title: "SESI",
            icon: "../assets/Untitled-1.png"
        },
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
        meta: {
            title: "JURI",
            icon: "../assets/Untitled-1.png"
        },
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
        meta: {
            title: "PESERTA",
            icon: "../assets/Untitled-1.png"
        },
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
        meta: {
            title: "DASHBOARD",
            icon: "../assets/Untitled-1.png"
        },
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
        meta: {
            title: "REPORT",
            icon: "../assets/Untitled-1.png"
        },
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