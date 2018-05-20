const async = require('async');
const config = require('../../../common/config');
const logger = require('../../utils/logger')(config.db.logger.type);

function createUsersTable(db, next) {
	db.run('CREATE TABLE "user" ( \
		"id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, \
		"email" VARCHAR(255) NOT NULL UNIQUE, \
		"password" VARCHAR(255) NOT NULL, \
		"salt" VARCHAR(255) NOT NULL \
	)', (err) => {
		if (err) {
			return next(`Can't create user table: ${err.message}'`);
		}
		return next(null, 'User table was created');
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