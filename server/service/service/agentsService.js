const BaseCollectionService = require('../baseCollectionService');
const AgentsCollection = require('../../collections/agentsCollection');
const AgentItem = require('../../models/agentItem');
const constants = require('../../../common/constants');
const _ = require('lodash');

class AgentsService extends BaseCollectionService {

	get table() {
		return 'agent';
	}

	get collectionClass() {
		return AgentsCollection;
	}

	get services() {
		return ['tokensService', 'statesService', 'serversService',
			'cpuInfoService', 'systemInfoService', 'ultimateLoadsService'];
	}

	saveAgentInitalData(data) {
		let agentItem = this.collection.find((agentItem) => {
			const tokenItem = this.tokensService.getTokenItemByValue(data.token);

			return !!tokenItem;
		});

		let agentAttributes = {
			name: data.agent_data.name,
			port: data.port,
			address: data.address,
			is_online: true
		};

		if (!agentItem) {
			const tokenItem = this.tokensService.createNewToken(data.agent_data.token);
			const stateItem = this.statesService.getStateItemByCode(constants.STATE.LOW_LOAD.code);

			agentItem = new AgentItem(_.extend(agentAttributes, {
				token_id: tokenItem.id,
				state_id: stateItem.id
			}));

			this.collection.add(agentItem);
			this.serversService.createServerItem(agentItem, data);
			this.ultimateLoadService.setUltimateLoad(agentItem, 100, 100, 100);
		} else {
			agentItem.set(agentAttributes);
		}


		this.cpuInfoService.saveCpuInfoData(agentItem, data);
		this.systemInfoService.saveSystemInfoData(agentItem, data);

		return agentItem;
	}
}

module.exports = AgentsService;