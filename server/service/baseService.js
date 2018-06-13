const config = require('../../common/config');
const logger = require('../utils/logger')(config.db.logger.type);
const _ = require('lodash');

class BaseService {

	get table() {
		throw Error('Should be overriden in the child');
	}

	get services() {
		return [];
	}

	constructor(name) {
		this.name = name;
	}

	initialize() {
		this.services.forEach((name) => {
			this[name] = global.serviceLocator.get(name);
		});
	}

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

	_stringifyForSet(attrs) {
		return this._stringifyForWhere(attrs);
	}

	create(attributes, next) {
		next = next || _.noop;
		let stringAttrs = this._stringifyForInsert(attributes);
		let query = `INSERT INTO ${this.table} (${stringAttrs.keys.join(', ')}) VALUES (${stringAttrs.values.join(', ')})`;

		this._queryRun(query, (err, id) => {
			if (err) {
				return next(err);
			}
			this.getBy({ id: id }, next);
		});
	}

	delete(conditions, next) {
		next = next || _.noop;
		const stringAttrs = this._stringifyForWhere(conditions);
		const query = `DELETE FROM ${this.table} WHERE ${stringAttrs.join(' AND ')};`;

		this._queryRun(query, next);
	}

	update(attributes, conditions, next) {
		next = next || _.noop;
		const stringAttrs = this._stringifyForSet(attributes);
		const stringCondition = this._stringifyForWhere(attributes);

		const query = `UPDATE ${this.table} SET ${stringAttrs.keys.join(', ')} WHERE ${stringCondition.join(' AND ')};`;

		this._queryRun(query, next);
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

	_onAddItem(item) {
		this.create(item.toJSON());
	}

	_onChangedItem(item) {
		this.update(item.toJSON(), { id: item.id });
	}

	_onRemoveItem(item) {
		this.delete({ id: item.id });
	}
}

module.exports = BaseService;