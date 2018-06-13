const EventCollection = require('./eventCollection');
const TokenItem = require('../models/tokenItem');

class AgentsCollecion extends EventCollection {
	constructor(items) {
		super(items, TokenItem);
	}
}

module.exports = AgentsCollecion;