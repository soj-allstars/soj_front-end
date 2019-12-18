import Vue from 'vue'
import Router from 'vue-router'

import mainPage from '@/components/mainPage'
import demoPage from '@/components/demoPage'
import complex from '@/components/complex'
import youtube from '@/components/youtube'
import shit from '@/components/shit'
import problem from '@/components/Problem'
import problemSubmit from '@/components/ProblemSubmit'
import ProblemSubmitRes from '@/components/ProblemSubmitRes'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'mainPage',
            component: mainPage,
            children: [
                {
                    path: '/problem',
                    name: 'problem',
                    component: problem,
                },
                {
                    path: '/problemSubmit',
                    name: 'problemSubmit',
                    component: problemSubmit,
                },
                {
                    path: '/ProblemSubmitRes',
                    name: 'ProblemSubmitRes',
                    component: ProblemSubmitRes,
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