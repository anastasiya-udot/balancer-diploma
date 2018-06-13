const BaseCollectionService = require('../baseCollectionService');
const SystemInfoCollection = require('../../collections/systemInfoCollection');
const SystemInfoItem = require('../../models/systemInfoItem');
const _ = require('lodash');

class SystemInfoService extends BaseCollectionService {

	get collectionClass() {
		return SystemInfoCollection;
	}

	get table() {
		return 'system_info';
	}

	saveSystemInfoData(agentItem, data) {
		let systemInfoData = this.collection.getBy('agent_id', agentItem.id);

		const attributes = {
			platform: data.system_info.system,
			distributiv: data.system_info.distributiv,
			version: data.system_info.version
		};

		if (!systemInfoData) {
			systemInfoData = new SystemInfoItem(_.extend(attributes, { agent_id: agentItem.id }));
			this.collection.add(systemInfoData);
		} else {
			systemInfoData.set(attributes);
		}

		return systemInfoData;
	}
}

module.exports = SystemInfoService;