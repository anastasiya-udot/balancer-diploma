const EventCollection = require('./eventCollection');
const AgentSocketItem = require('../models/agentSocketItem');

class AgentsSocketsCollecion extends EventCollection {
	constructor(items) {
		super(items, AgentSocketItem, 'name');
	}

	add(socketItem) {
		this.items.push(socketItem);
		this._triggerAddEvent(socketItem);
	}
}

module.exports = AgentsSocketsCollecion;