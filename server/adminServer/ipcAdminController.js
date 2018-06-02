const cluster = require('cluster');
//const logger = require('../utils/logger')();

class IpcController {
	constructor() {
		this.proxy = cluster.fork();

		this.proxy.on('listening', () => {
			//logger.info('Proxy is listening');
		});
	}
}

module.exports = IpcController;