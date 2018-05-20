const app = require('./application');
const Server = require('../utils/server');
const config = require('../../common/config');
const SocketService = require('../service/socketService');

class AdminServer {
	constructor() {
		this.server = new Server(config.admin_server);
		this.server.startHttp(app);

		let socketService = new SocketService();

		socketService.attach(this.server.get());
	}
}

module.exports = AdminServer;