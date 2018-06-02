const config = require('../../common/config');
const fs = require('fs');
const fsStat = require('fs-extra');
const path = require('path');
const async = require('async');
const logger = require('../utils/logger')(config.db.logger.type);

const MIGRATIONS_LOG = path.join(global.rootPath, config.db.migrations);

function listMigrations(alreadyPassed, next) {
	// eslint-disable-next-line no-undef
	const versionsPath = path.join(__dirname, 'versions');

	fs.readdir(versionsPath, (err, versions) => {
		if (err) {
			return next(err);
		}

		versions = versions.sort();

		async.eachSeries(versions, (fileName, cb) => {
			if (alreadyPassed.indexOf(fileName) !== -1) {
				return cb();
			}

			let versionPath = path.join(versionsPath, fileName);
			let version = require(versionPath);

			version(global.db, (err) => {
				if (err) {
					return cb(err);
				}

				alreadyPassed.push(fileName);

				fsStat.writeJson(MIGRATIONS_LOG, alreadyPassed, cb);
			});
		}, err => {
			if (err) {
				return next(err);
			}
			logger.info('All database migrations have passed');
			next();
		});
	});
}

module.exports = function(next) {
	async.waterfall([
		next => fsStat.ensureFile(MIGRATIONS_LOG, next),
		next => fsStat.readJSON(MIGRATIONS_LOG, (err, data) => {
			if (err) {
				fsStat.writeJSON(MIGRATIONS_LOG, [], err => {
					if (err) {
						return next(err);
					}
					return next(null, []);
				});
				return;
			}
			next(null, data);
		}),
		listMigrations
	], next);
};