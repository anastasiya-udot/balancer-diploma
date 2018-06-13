const initApplication = require('./application');
const Server = require('../utils/server');
const config = require('../../common/config');
const SocketService = require('../service/socketService');
const async = require('async');
const initializeDB = require('../middlewares/database');
const ServiceLocator = require('../service/serviceLocator');
const logger = require('../utils/logger')(config.admin_server.logger.type);

class AdminServer {
	constructor() {
		this.server = new Server(config.admin_server);

		async.series([
			initializeDB,
			(next) => {
				global.serviceLocator = new ServiceLocator();
				global.serviceLocator.init(next);
			},
			(next) => {
				const app = initApplication();
				let socketService = new SocketService();

				this.server.startHttp(app);
				socketService.attach(this.server.get());

				next();
			}
		], (err, results) => {
			if (err) {
				logger.error('Error during adminServer initialization');
				// eslint-disable-next-line no-undef
				process.exit();
			} else {
				logger.info('Admin server initialization finished successfully');
				this.agentsService = global.serviceLocator.get('agentsService');

				this.agentsSockets = global.agentsServer.getAllAgentsSockets();
				this.agentsSockets.on('add', (socketItem) => {
					global.agentsServer.confirmConnection(socketItem);
				});
				this.agentsSockets.on('initial_data', (data, agentSocket) => {
					const agentItem = this.agentsService.saveAgentInitalData(data);

					agentSocket.set({ 'agent_id': agentItem.id });
				});

				this.agentsSockets.on('load_data', (data, agentSocket) => {
					// const agentItem = this.agentsService.saveAgentInitalData(data);

					// agentSocket.set('agent_id', agentItem.id);
				});
			}
		});
	}
}

module.exports = AdminServer;