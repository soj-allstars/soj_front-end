import Vue from 'vue'
import Router from 'vue-router'

import mainPage from '@/components/mainPage'
import demoPage from '@/components/demoPage'
import complex from '@/components/complex'
import youtube from '@/components/youtube'
import shit from '@/components/shit'
import problem from '@/components/problem'
import problemSubmit from '@/components/problemSubmit'
import problemSubmitRes from '@/components/problemSubmitRes'
import problemSet from '@/components/problemSet'
import login from '@/components/login'
import addProblem from '@/components/addProblem'
import problemSubmitResDetail from "@/components/problemSubmitResDetail";

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'mainPage',
            component: mainPage,
            children: [
                {
                    path: '/problem/:pid',
                    name: 'problem',
                    component: problem,
                },
                {
                    path: '/problemSubmit',
                    name: 'problemSubmit',
                    component: problemSubmit,
                },
                {
                    path: '/problemSubmitRes',
                    name: 'problemSubmitRes',
                    component: problemSubmitRes,
                },
                {
                    path: '/problemSet',
                    name: 'problemSet',
                    component: problemSet
                },
                {
                    path: '/login',
                    name: 'login',
                    component: login
                },
                {
                    path: '/addProblem',
                    name: 'addProblem',
                    component: addProblem
                },
                {
                    path: '/problemSubmitResDetail',
                    name: 'problemSubmitResDetail',
                    component: problemSubmitResDetail
                }
            ]
        },
        {
            path: '/demoPage',
            name: 'demoPage',
            component: demoPage
        },
        {
            path: '/youtube',
            name: 'youtube',
            component: youtube
        },
        {
            path: '/complex',
            name: 'complex',
            component: complex,
            children: [
                {
                    path: "/shit",
                    name: 'shit',
                    component: shit
                }
            ]
        }
    ]
})