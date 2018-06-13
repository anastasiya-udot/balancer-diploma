const EventItem = require('./eventItem');
const _ = require('lodash');

class CpuInfoItem extends EventItem {
	defaults() {
		return _.extend({}, super.defaults(), {
			model: '',
			speed: '',
			core: 0,
			memory: '',
			agent_id: null
		});
	}
}

module.exports = CpuInfoItem;