const BaseCollectionService = require('../baseCollectionService');
const CpuInfoCollection = require('../../collections/cpuInfoCollection');
const CpuInfoItem = require('../../models/cpuInfoItem');
const untitsFormatter = require('../../utils/unitsFormatter');
const _ = require('lodash');

class CpuInfoService extends BaseCollectionService {

	get collectionClass() {
		return CpuInfoCollection;
	}

	get table() {
		return 'cpu_info';
	}

	saveCpuInfoData(agentItem, data) {
		let cputInfoItem = this.collection.getBy('agent_id', agentItem.id);

		const attributes = {
			model: untitsFormatter.convertToSizeUnits(data.system_info.memory_bytes),
			speed: data.system_info.frequency,
			core: data.system_info.core
		};

		if (!cputInfoItem) {
			cputInfoItem = new CpuInfoItem(_.extend(attributes, { agent_id: agentItem.id }));
			this.collection.add(cputInfoItem);
		} else {
			cputInfoItem.set(attributes);
		}

		return cputInfoItem;
	}
}

module.exports = CpuInfoService;