const EventItem = require('./eventItem');
const _ = require('lodash');

class PlatformItem extends EventItem {
	defaults() {
		return _.extend({}, super.defaults(), {
			name: ''
		});
	}
}

module.exports = PlatformItem;