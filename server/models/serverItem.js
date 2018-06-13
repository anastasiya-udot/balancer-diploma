const EventItem = require('./eventItem');
const _ = require('lodash');

class ServerItem extends EventItem {
	defaults() {
		return _.extend({}, super.defaults(), {
			port: null,
			last_launched_at: Date.now(),
			is_available: false,
			agent_id: null
		});
	}
}

module.exports = ServerItem;