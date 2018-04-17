const patterns = require('./patterns');

module.exports = {
	email: function(value) {
		let regexp = new RegExp(patterns.email);

		return regexp.test(value);
	}
};