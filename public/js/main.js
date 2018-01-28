import Vue from 'vue';
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue';

import Login from './components/login/Login.vue';

Vue.use(BootstrapVue);
Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		component: Login
	}
];

const router = new VueRouter({ routes });

const app = new Vue({
	router
}).$mount('#app');