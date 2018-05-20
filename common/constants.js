const config = require('./config');

module.exports = {
	CONNECTION: {
		HOST: '127.0.0.1',
		PORT: config.admin_server.port,
		PROTOCOL: 'http',
		PREFIX: 'api'
	}
};