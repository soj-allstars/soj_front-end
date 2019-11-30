import Vue from 'vue'
import Router from 'vue-router'
/*引入页面*/
import Login from '@/components/login.vue'
import Main from '@/components/question_list.vue'
import Home from '@/components/home.vue'
import Commit from '@/components/commit.vue'
import Question from '@/components/question.vue'

Vue.use(Router)

/*配置路由*/
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      name: '',
      component: Main
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
	{
		path: '/commit',
		name: 'Commit',
		component: Commit
	},
	{
		path: '/question',
		name: 'Question',
		component: Question
	}
  ]
})