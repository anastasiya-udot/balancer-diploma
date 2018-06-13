const EventItem = require('./eventItem');
const _ = require('lodash');

class TokenItem extends EventItem {
	defaults() {
		return _.extend({}, super.defaults(), {
			created_at: Date.now(),
			cpu_load: 100,
			memory_load: 100,
			rom_load: 100,
			agent_id: null
		});
	}
}

module.exports = TokenItem;