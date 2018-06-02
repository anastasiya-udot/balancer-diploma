const config = require('../../common/config');
const logger = require('../utils/logger')(config.db.logger.type);
const _ = require('lodash');

class BaseService {

	_queryAll(query, next) {
		global.db.all(query, (err, data) => {
			if (err) {
				logger.error('Query error: %s', err.message);
				return next(err, []);
			}

			logger.verbose('Query: %s', query);
			logger.debug(data);

			return next(null, data);
		});
	}

	_queryRun(query, next) {
		global.db.run(query, function(err) {
			if (err) {
				logger.error('Query error: %s', err.message);
				return next(err, []);
			}

			logger.verbose('Query: %s', query);

			return next(null, this.lastID);
		});
	}

	_stringifyForInsert(attrs) {
		let newAttrs = _.mapKeys(attrs, (value, key) => {
			return '`' + key + '`';
		});

		newAttrs = _.mapValues(newAttrs, value => {
			if (typeof value === 'string') {
				value = `"${value}"`;
			}
			return value;
		});

		return {
			keys: _.keys(newAttrs),
			values: _.values(newAttrs)
		};
	}

	_stringifyForWhere(attrs) {
		let query = [];

		_.each(attrs, (value, key) => {
			if (typeof value === 'string') {
				value = `"${value}"`;
			}
			query.push('`' + key + '`=' + value);
		});

		return query;
	}

	create(attributes, next) {
		let stringAttrs = this._stringifyForInsert(attributes);
		let query = `INSERT INTO ${this.table} (${stringAttrs.keys.join(', ')}) VALUES (${stringAttrs.values.join(', ')})`;

		this._queryRun(query, (err, id) => {
			if (err) {
				return next(err);
			}
			this.getBy({ id: id }, next);
		});
	}

	getAll(next) {
		let query = `SELECT * FROM ${this.table}`;

		this._queryAll(query, next);
	}

	getBy(attributes, next) {
		let stringAttrs = this._stringifyForWhere(attributes);

		let query = `SELECT * FROM ${this.table} WHERE ${stringAttrs.join(' AND ')};`;

		this._queryAll(query, next);
	}
}

module.exports = BaseService;