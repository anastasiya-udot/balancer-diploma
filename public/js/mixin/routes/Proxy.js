import base from './Base';

export default {
	methods: {
		checkProxyIsAlive() {
			return this.$get.post(base.url + '/ping-proxy');
		}
	}
};