const config = require('../../common/config');
const Server = require('../utils/server');
const AgentSocketItem = require('../models/agentSocketItem');
const AgentsSocketsCollection = require('../collections/agentsSocketsCollection');

class AgentsSocketServer {

	constructor() {
		this.server = new Server(config.agents_server);
		this.agentsSockets = new AgentsSocketsCollection();

		this.server.startTcp((socket) => {
			let agentSocket = new AgentSocketItem(socket);

			this.agentsSockets.add(agentSocket);

			agentSocket.on('error', () => {
				this.agentsSockets.removeByIds(agentSocket.name);
			});
			agentSocket.on('end', () => {
				this.agentsSockets.removeByIds(agentSocket.name);
			});
			agentSocket.on('inital_data', (data) => {
				this.agentsSockets.emit('initial_data', data, agentSocket);
			});
			agentSocket.on('load_data', (data) => {
				this.agentsSockets.emit('load_data', data, agentSocket);
			});
		});
	}

	getAllAgentsSockets() {
		return this.agentsSockets;
	}

	confirmConnection(agentSocket) {
		agentSocket.write('confirm connection');
	}
}

module.exports = AgentsSocketServer;


