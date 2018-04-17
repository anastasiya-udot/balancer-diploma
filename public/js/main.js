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
Vue.use(VueSocketIO, socketio(url));

const routes = [
	{
		path: '/',
		component: Login
	},
	{
		path: '/main',
		component: Main
	}
];

const router = new VueRouter({ routes });

// eslint-disable-next-line no-unused-vars
const app = new Vue({
	router
}).$mount('#app');