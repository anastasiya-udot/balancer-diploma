const EventItem = require('./eventItem');
const _ = require('lodash');

class AgentItem extends EventItem {
	defaults() {
		return _.extend({}, super.defaults(), {
			port: null,
			address: '',
			name: '',
			last_seen_at: null,
			created_at: Date.now(),
			is_online: false,
			state_id: null,
			token_id: null
		});
	}
}

module.exports = AgentItem;