const config = require('../../common/config');
const Server = require('../utils/server');
const AgentSocket = require('./agentSocket');

class AgentsSocketServer {

	constructor() {
		this.server = new Server(config.agents_server);
		this.agentsSockets = {};

		this.server.startTcp((socket) => {
			let agentSocket = new AgentSocket(socket);

			this.agentsSockets[agentSocket.name] = agentSocket;
			agentSocket.write('confirm connection');

			agentSocket.on('end', () => {
				delete this.agentsSockets[agentSocket.name];
			});
		});
	}
}

module.exports = AgentsSocketServer;


