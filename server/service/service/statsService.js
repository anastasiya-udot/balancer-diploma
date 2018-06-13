const BaseCollectionService = require('../baseCollectionService');
const StatsCollection = require('../../collections/statsCollection');

class StatsService extends BaseCollectionService {

	get collectionClass() {
		return StatsCollection;
	}

	get table() {
		return 'stat';
	}
}

module.exports = StatsService;