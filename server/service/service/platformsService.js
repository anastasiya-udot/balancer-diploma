const BaseCollectionService = require('../baseCollectionService');
const PlatformsCollection = require('../../collections/platformsCollection');

class PlatformService extends BaseCollectionService {

	get collectionClass() {
		return PlatformsCollection;
	}

	get table() {
		return 'platform';
	}
}

module.exports = PlatformService;