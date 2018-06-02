import constants from '../../../../common/constants';

const conn = constants.CONNECTION;
const base = {
	url: `${conn.PROTOCOL}://${conn.HOST}:${conn.PORT}/${conn.PREFIX}`
};

function promisifyRequest(method, url, options) {
	return new Promise((resolve, reject) => {
		this.$http[method](base.url + url, options).then(
			res => {
				resolve(res);
			},
			res => {
				if (res.status === 401) {
					localStorage.removeItem('user_id');
					this.$router.replace({ name: 'label' });
				}
				reject(res);
			}
		);
	});
}

export default promisifyRequest;