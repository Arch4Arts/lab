import Vue from "vue"
import VueRouter from "vue-router"
import Journal from "./pages/Journal.vue"
import Entry from "./pages/Entry.vue"
import FAQ from "./pages/FAQ.vue"

Vue.use(VueRouter)

export default new VueRouter({
	routes: [
		{
			path: '/',
			name: '',
			component: Entry
		},
		{
			path: '/FAQ',
			name: 'FAQ',
			component: FAQ
		},
		{
			path: '/Journal',
			name: 'Journal',
			component: Journal
		},
	],
})