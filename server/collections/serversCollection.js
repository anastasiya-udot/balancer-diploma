const EventCollection = require('./eventCollection');
const ServerItem = require('../models/serverItem');

class ServersCollecion extends EventCollection {
	constructor(items) {
		super(items, ServerItem);
	}
}

module.exports = ServersCollecion;