const BaseCollectionService = require('../baseCollectionService');
const StatesCollection = require('../../collections/statesCollection');
const StateItem = require('../../models/stateItem');
const constants = require('../../../common/constants');
const _ = require('lodash');

class StatesService extends BaseCollectionService {

	get collectionClass() {
		return StatesCollection;
	}

	get table() {
		return 'state';
	}

	getStateItemByCode(code) {
		let constCode;

		_.keys(constants.STATE).forEach((key) => {
			if (constants.STATE[key].code === code) {
				constCode = constants.STATE[key];
			}
		});

		if (!constCode) {
			return;
		}

		let stateItem = this.collection.getBy('code', code);

		if (!stateItem) {
			stateItem = new StateItem(constCode);
			this.collection.add(stateItem);
		}

		return stateItem;
	}
}

module.exports = StatesService;