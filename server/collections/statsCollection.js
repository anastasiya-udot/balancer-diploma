const EventCollection = require('./eventCollection');
const StatItem = require('../models/statItem');

class StatsCollecion extends EventCollection {
	constructor(items) {
		super(items, StatItem);
	}
}

module.exports = StatsCollecion;