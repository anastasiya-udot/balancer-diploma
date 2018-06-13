const EventCollection = require('./eventCollection');
const AgentItem = require('../models/agentItem');

class AgentsCollecion extends EventCollection {
	constructor(items) {
		super(items, AgentItem);
	}
}

module.exports = AgentsCollecion;