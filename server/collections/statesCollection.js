const EventCollection = require('./eventCollection');
const StateItem = require('../models/stateItem');

class StatesCollecion extends EventCollection {
	constructor(items) {
		super(items, StateItem);
	}
}

module.exports = StatesCollecion;