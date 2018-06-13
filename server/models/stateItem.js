const EventItem = require('./eventItem');
const _ = require('lodash');

class StatItem extends EventItem {
	defaults() {
		return _.extend({}, super.defaults(), {
			code: 0,
			message: ''
		});
	}
}

module.exports = StatItem;