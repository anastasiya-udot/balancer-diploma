const BaseCollectionService = require('../baseCollectionService');
const ServersCollection = require('../../collections/serversCollection');
const ServerItem = require('../../models/serverItem');

class ServersService extends BaseCollectionService {

	get collectionClass() {
		return ServersCollection;
	}

	get table() {
		return 'server';
	}

	createServerItem(agentItem, data) {
		let serverItem = new ServerItem({
			is_available: true,
			agent_id: agentItem.id,
			port: data.agent_data.server_port
		});

		this.collection.add(serverItem);
		return serverItem;
	}

	setServerIsAvailable(agentItem) {

	}
}

module.exports = ServersService;