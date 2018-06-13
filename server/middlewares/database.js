const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const config = require('../../common/config');
const logger = require('../utils/logger')(config.db.logger.type);
const fs = require('fs-extra');
const async = require('async');
const migrations = require('../migrations');

const DB_PATH = path.join(global.rootPath, config.db.path);

module.exports = (next) => {
	async.waterfall([
		next => fs.ensureFile(DB_PATH, next),
		next => {
			global.db = new sqlite3.Database(DB_PATH, (err) => {
				return next(err);
			});
		},
		migrations
	], err => {
		if (err) {
			logger.error('Database error: %s', (typeof err) === 'string' ? err : err.message);
			// eslint-disable-next-line no-undef
			return next(err);
		}
		logger.info('Connected to the SQlite database');
		next();
	});
};