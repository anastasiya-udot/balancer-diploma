import promisifyRequest from '../Base';

const base = '/proxy';

export default {
	methods: {
		checkProxyIsAlive() {
			const func = promisifyRequest.bind(this);

			return func('get', `${base}/ping-proxy`);
		}
	}
};