const EventItem = require('./eventItem');
const moment = require('moment');
const _ = require('lodash');

class TokenItem extends EventItem {
	defaults() {
		return _.extend({}, super.defaults(), {
			token: '',
			expired_at: this.getExpirationDate()
		});
	}

	getExpirationDate() {
		return moment(Date.now()).add(3, 'months').valueOf();
	}
}

module.exports = TokenItem;