const EventEmitter = require('events');
const _ = require('lodash');

class EventItem extends EventEmitter {

	defaults() {
		return {
			id: 0
		};
	}

	constructor(attributes, idAttribute) {
		super();

		this.idAttribute = idAttribute || 'id';
		this.id = attributes[this.idAttribute];
		this.attributes = _.extend({}, this.defaults(), attributes);
	}

	set(attributes, options) {
		options = options || {};

		_.keys(attributes).forEach((key) => {
			const triggerEvent = !options.silence &&
				key !== this.idAttribute && (
				this.attributes[key] == undefined ||
				!_.isEqual(this.attributes[key], attributes[key]));

			this.attributes[key] = attributes[key];

			if (key === this.idAttribute) {
				this.id = this.attributes[key];
			}

			if (triggerEvent) {
				this._triggerChangeEvent(key);
			}
		});
	}

	get(key) {
		return this.attributes[key];
	}

	_triggerChangeEvent(key) {
		this.emit(`change:${key}`);
		this.emit('change');
	}

	toJSON() {
		const keys = _.keys(this.defaults());
		const attributes = _.pick(this.attributes, keys);

		attributes.id = this.attributes.id;

		return attributes;
	}
}

module.exports = EventItem;