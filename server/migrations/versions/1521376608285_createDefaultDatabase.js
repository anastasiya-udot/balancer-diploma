const async = require('async');
const logger = require('../../utils/logger')();

function createUsersTable(db, next) {
	db.run('CREATE TABLE users (id, email, password)', (err) => {
		if (err) {
			return next(`Can't create users table: ${err.message}'`);
		}
		return next(null, 'Users table was created');
	});
}

module.exports = function(db, next) {
	async.series([
		next => createUsersTable(db, next)
	], (err, result) => {
		if (err) {
			return next(err);
		}

		result.forEach(m => {
			logger.info('Migration: %s', m);
		});

		next();
	});
};