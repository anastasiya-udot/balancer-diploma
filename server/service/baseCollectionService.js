const BaseService = require('./baseService');

class BaseCollectionService extends BaseService {

	get collectionClass() {
		throw Error('Should be overriden in the child');
	}

	constructor() {
		super(...arguments);
		this.collection = new this.collectionClass();

		return new Promise((resolve, reject) => {
			this.getAll((err, items) => {
				if (err) {
					reject(err);
				} else {
					this.collection.add(items);

					this.collection.on('change', this._onChangedItem.bind(this));
					this.collection.on('remove', this._onRemoveItem.bind(this));
					this.collection.on('add', this._onAddItem.bind(this));
					resolve(this);
				}
			});
		});
	}

}

module.exports = BaseCollectionService;