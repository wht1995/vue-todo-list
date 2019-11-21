import Vue from 'vue'
import Router from 'vue-router'
import list from '@/components/list'
import add from '@/components/add'
import complete from '@/components/complete'

Vue.use(Router)

export default new Router({
	mode:'history',
	routes: [
	{
		path: '/',
		name:'IndexList',
		component: list
	},{
		path:'/list',
		name:'list',
		component: list
	},{
		path:'/add',
		name:'add',
		component: add
	},{
		path:'/complete',
		name:'complete',
		component: complete
	}
	]
})
