const config = require('./config');

module.exports = {
	CONNECTION: {
		HOST: '127.0.0.1',
		PORT: config.admin_server.port,
		PROTOCOL: 'http',
		PREFIX: 'api'
	},

	STATE: {
		SERVER_NOT_AVAILABLE: {
			code: 0,
			message: 'Server is not available'
		},
		TOKEN_EXPIRED: {
			code: 1,
			message: 'Token expired'
		},
		LOW_LOAD: {
			code: 2,
			message: 'Low load'
		},
		MEDIUM_LOAD: {
			code: 3,
			message: 'Medium load'
		},
		HIGH_LOAD: {
			code: 4,
			message: 'High load'
		}
	}
};