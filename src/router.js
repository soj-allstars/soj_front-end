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
import contest from "@/components/contest";
import contestSet from "@/components/contestSet";
import contestProblem from "@/components/contestProblem";
import contestProblemSubmit from "@/components/contestProblemSubmit";
import liveResQuery from "@/components/liveResQuery";

Vue.use(Router);

const routes = {
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
                    path: '/problemSubmitRes',
                    name: 'problemSubmitRes',
                    component: problemSubmitRes,
                },
                {
                    path: '/problemSet',
                    name: 'problemSet',
                    component: problemSet,
                },
                {
                    path: '/login',
                    name: 'login',
                    component: login,
                },
                {
                    path: '/addProblem',
                    name: 'addProblem',
                    component: addProblem,
                },
                {
                    path: '/problemSubmitResDetail',
                    name: 'problemSubmitResDetail',
                    component: problemSubmitResDetail,
                },
                {
                    path: '/contestSet',
                    name: 'contestSet',
                    component: contestSet,
                },
                {
                    path: '/contest/',
                    name: 'contest',
                    component: contest,
                },
                {
                    path: '/contestProblem',
                    name: 'contestProblem',
                    component: contestProblem,
                },
                {
                    path: '/contestProblemSubmit',
                    name: 'contestProblemSubmit',
                    component: contestProblemSubmit,
                },
                {
                    path: '/liveResQuery',
                    name: 'liveResQuery',
                    component: liveResQuery,
                },
            ]
        },
        {
            path: '/demoPage',
            name: 'demoPage',
            component: demoPage,
        },
        {
            path: '/youtube',
            name: 'youtube',
            component: youtube,
        },
        {
            path: '/complex',
            name: 'complex',
            component: complex,
            children: [
                {
                    path: "/shit",
                    name: 'shit',
                    component: shit,
                }
            ]
        }
    ]
};
const router = new Router(routes);

// router.beforeEach((to, from, next) => {
//     for(let a of to.matched) {
//         console.log(a.name + '\n');
//     }
//     next();
// });


export default router;