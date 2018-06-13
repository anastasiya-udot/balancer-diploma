const EventItem = require('./eventItem');
const _ = require('lodash');

class StatItem extends EventItem {
	defaults() {
		return _.extend({}, super.defaults(), {
			received_at: Date.now(),
			cpu_load: 0,
			memory_load: 0,
			rom_load: 0,
			agent_id: null
		});
	}
}

module.exports = StatItem;