import promisifyRequest from '../Base';

const base = '/config';

export default {
	methods: {
		generateNewToken() {
			const func = promisifyRequest.bind(this);

			return func('get', `${base}/token`);
		},
		getServerAddress(data) {
			const func = promisifyRequest.bind(this);

			return func('get', `${base}/server`);
		}
	}
};