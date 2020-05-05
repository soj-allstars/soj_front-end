import Vue from 'vue'
import Router from 'vue-router'

import mainPage from '@/components/mainPage'
// import problem from '@/components/problem'
// import problemSubmit from '@/components/problemSubmit'
// import problemSubmitRes from '@/components/problemSubmitRes'
// import problemSet from '@/components/problemSet'
// import login from '@/components/login'
// import addProblem from '@/components/addProblem'
// import problemSubmitResDetail from "@/components/problemSubmitResDetail";
// import contest from "@/components/contest";
// import contestSet from "@/components/contestSet";
// import contestProblem from "@/components/contestProblem";
// import contestProblemSubmit from "@/components/contestProblemSubmit";
// import liveResQuery from "@/components/liveResQuery";
// import normalSubmitRes from "@/components/normalSubmitRes";

Vue.use(Router);

const problem = () => import('@/components/problem');
const problemSubmit = () => import('@/components/problemSubmit');
const problemSubmitRes = () => import('@/components/problemSubmitRes');
const problemSet = () => import('@/components/problemSet');
const login = () => import('@/components/login');
const addProblem = () => import('@/components/addProblem');
const problemSubmitResDetail = () => import('@/components/problemSubmitResDetail');
const contest = () => import("@/components/contest");
const contestSet = () => import("@/components/contestSet");
const contestProblem = () => import("@/components/contestProblem");
const contestProblemSubmit = () => import("@/components/contestProblemSubmit");
const liveResQuery = () => import("@/components/liveResQuery");
const normalSubmitRes = () => import("@/components/normalSubmitRes");

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
                    path: '/problemsubmit',
                    name: 'problemSubmit',
                    component: problemSubmit,
                },
                {
                    path: '/normalsubmitres',
                    name: 'normalSubmitRes',
                    component: normalSubmitRes,
                },
                {
                    path: '/problemsubmitres',
                    name: 'problemSubmitRes',
                    component: problemSubmitRes,
                },
                {
                    path: '/problemset',
                    name: 'problemSet',
                    component: problemSet,
                },
                {
                    path: '/login',
                    name: 'login',
                    component: login,
                },
                {
                    path: '/addproblem',
                    name: 'addProblem',
                    component: addProblem,
                },
                {
                    path: '/problemsubmitresdetail',
                    name: 'problemSubmitResDetail',
                    component: problemSubmitResDetail,
                },
                {
                    path: '/contestset',
                    name: 'contestSet',
                    component: contestSet,
                },
                {
                    path: '/contest/',
                    name: 'contest',
                    component: contest,
                },
                {
                    path: '/contestproblem',
                    name: 'contestProblem',
                    component: contestProblem,
                },
                {
                    path: '/contestproblemsubmit',
                    name: 'contestProblemSubmit',
                    component: contestProblemSubmit,
                },
                {
                    path: '/liveresquery',
                    name: 'liveResQuery',
                    component: liveResQuery,
                },
            ]
        },
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