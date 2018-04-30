import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import BootstrapVue from 'bootstrap-vue';
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
import VModal from 'vue-js-modal';

import constants from '../../common/constants';

import Auth from './components/auth/Auth.vue';
import Main from './components/main/Main.vue';
import SignIn from './components/auth/views/SignIn.vue';
import SignUp from './components/auth/views/SignUp.vue';
import Label from './components/auth/views/Label.vue';

const conn = constants.CONNECTION;
const url = `${conn.PROTOCOL}://${conn.HOST}:${conn.PORT}`;

Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VModal, { dialog: true });

const routes = [
	{
		name: 'authorization',
		path: '/auth',
		component: Auth,
		children: [{
			name: 'signIn',
			path: 'sign-in',
			component: SignIn,
			props: true
		}, {
			name: 'signUp',
			path: 'sign-up',
			component: SignUp,
			props: true
		}, {
			name: 'label',
			path: 'label',
			component: Label
		}]
	},
	{
		name: 'main',
		path: '/main',
		component: Main,
		meta: { requiresAuth: true },
		beforeEnter(to, from, next) {
			Vue.use(VueSocketIO, socketio(url));
			next();
		}
	}
];

const router = new VueRouter({
	mode: 'history',
	routes: routes
});

router.beforeEach((to, from, next) => {
	if (to.path === '/') {
		return next('/auth/label');
	}

	if (to.meta.requiresAuth) {
		if (!localStorage.key('user_id')) {
			return next('/auth/label');
		}
	}

	if (!to.meta.requiresAuth) {
		if (localStorage.key('user_id')) {
			return next('/main');
		}
	}
	next();
});

// eslint-disable-next-line no-unused-vars
const app = new Vue({
	router
}).$mount('#app');