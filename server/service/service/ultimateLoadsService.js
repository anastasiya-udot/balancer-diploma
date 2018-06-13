const BaseCollectionService = require('../baseCollectionService');
const UltimateLoadsCollection = require('../../collections/ultimateLoadsCollection');
const UltimateLoadItem = require('../../models/ultimateLoadItem');
const _ = require('lodash');

class UltimateLoadsService extends BaseCollectionService {

	get collectionClass() {
		return UltimateLoadsCollection;
	}

	get table() {
		return 'ultimate_load';
	}

	setUltimateLoad(agentItem, cpuLoad, memoryLoad, diskLoad) {
		let ultimateLoadItem = this.collection.getBy('agent_id', agentItem.id);

		const attributes = {
			cpu_load: cpuLoad || 100,
			memory_load: memoryLoad || 100,
			rom_load: diskLoad || 100
		};

		if (!ultimateLoadItem) {
			ultimateLoadItem = new UltimateLoadItem(_.extend(attributes, { agent_id: agentItem.id }));
			this.collection.add(ultimateLoadItem);
		} else {
			ultimateLoadItem.set(attributes);
		}

		return ultimateLoadItem;
	}
}

module.exports = UltimateLoadsService;