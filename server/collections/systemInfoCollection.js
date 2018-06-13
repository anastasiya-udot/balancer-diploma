const EventCollection = require('./eventCollection');
const SystemInfoItem = require('../models/systemInfoItem');

class SystemInfoCollecion extends EventCollection {
	constructor(items) {
		super(items, SystemInfoItem);
	}
}

module.exports = SystemInfoCollecion;