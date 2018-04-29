import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import BootstrapVue from 'bootstrap-vue';
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
import constants from '../../common/constants';

import Login from './components/login/Login.vue';
import Main from './components/main/Main.vue';

const conn = constants.CONNECTION;
const url = `${conn.PROTOCOL}://${conn.HOST}:${conn.PORT}`;

Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [
	{
		path: '/',
		component: Login
	},
	{
		path: '/main',
		component: Main,
		beforeEnter(to, from, next) {
			Vue.use(VueSocketIO, socketio(url));
			next();
		}
	}
];

const router = new VueRouter({ routes });

router.beforeEach((to, from, next) => {
	if (!localStorage.key('user_id') && to.path !== '/') {
		return next('/');
	}
	if (localStorage.key('user_id') && to.path === '/') {
		return next('/main');
	}
	next();
});

// eslint-disable-next-line no-unused-vars
const app = new Vue({
	router
}).$mount('#app');