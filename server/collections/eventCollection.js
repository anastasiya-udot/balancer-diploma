const EventEmitter = require('events');
const EventItem = require('../models/eventItem');
const _ = require('lodash');

class EventCollection extends EventEmitter {

	constructor(items, itemClass, idAttribute, options) {
		super();

		this._idCounter = 0;

		this.idAttribute = idAttribute || 'id';
		this.itemClass = itemClass || EventItem;

		items = _.isArray(items) ? items : [];
		this.items = _.map(items, this._createItem);
	}

	add(items, options) {
		options = options || {};
		items = _.isArray(items) ? items : [items];
		_.each(items, (item) => {
			const eventItem = this._createItem(item);

			this.items.push(eventItem);
			_.sortBy(this.items, this.idAttribute);

			if (!options.silence) {
				this._triggerAddEvent(eventItem);
			}
		});
	}

	remove(items, options) {
		options = options || {};
		items = _.isArray(items) ? items : [items];
		_.each(items, (item) => {
			const index = _.findIndex(this.items, (eventItem) => {
				return items[this.idAttribute] === eventItem[this.idAttribute];
			});
			const eventItems = this.items.splice(index, 1);

			eventItems[0].removeAllListeners();

			if (!options.silence) {
				this._triggerRemoveEvent(eventItems[0]);
			}
		});
	}

	find(callback) {
		return _.find(this.items, (eventItem) => callback(eventItem));
	}

	getById(id) {
		return _.find(this.items, (eventItem) => {
			return id === eventItem[this.idAttribute];
		});
	}

	getBy(attr, val) {
		return _.find(this.items, (eventItem) => {
			return val === eventItem.get(attr);
		});
	}

	removeByIds(ids, options) {
		options = options || {};
		ids = _.isArray(ids) ? ids : [ids];
		_.each(ids, (id) => {
			const index = _.findIndex(this.items, (eventItem) => {
				return id === eventItem[this.idAttribute];
			});
			const eventItems = this.items.splice(index, 1);

			eventItems[0].removeAllListeners();

			if (!options.silence) {
				this._triggerRemoveEvent(eventItems[0]);
			}
		});
	}

	_createItem(item) {
		let eventItem;

		if (item instanceof this.itemClass) {
			eventItem = item;
		} else {
			eventItem = new this.itemClass(item, this.idAttribute);
		}

		this._idCounter = _.max([eventItem.id, this._idCounter]);
		this._idCounter += 1;

		eventItem.set({ 'id': this._idCounter });

		eventItem.on('change', this._triggerChangeEvent.bind(this, eventItem));
		return eventItem;
	}

	_triggerChangeEvent(item) {
		this.emit('change', item);
	}

	_triggerAddEvent(item) {
		this.emit('add', item);
	}

	_triggerRemoveEvent(item) {
		this.emit('remove', item);
	}
}

module.exports = EventCollection;