const EventItem = require('./eventItem');
const _ = require('lodash');

class SystemInfoItem extends EventItem {
	defaults() {
		return _.extend({}, super.defaults(), {
			platform: '',
			agent_id: null,
			distributiv: '',
			version: ''
		});
	}
}

module.exports = SystemInfoItem;