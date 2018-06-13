const EventCollection = require('./eventCollection');
const UltimateLoadItem = require('../models/tokenItem');

class UltimateLoadsCollecion extends EventCollection {
	constructor(items) {
		super(items, UltimateLoadItem);
	}
}

module.exports = UltimateLoadsCollecion;