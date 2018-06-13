const EventCollection = require('./eventCollection');
const PlatformItem = require('../models/platformItem');

class PlatformsCollecion extends EventCollection {
	constructor(items) {
		super(items, PlatformItem);
	}
}

module.exports = PlatformsCollecion;