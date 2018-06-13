const BaseCollectionService = require('../baseCollectionService');
const TokensCollection = require('../../collections/tokensCollection');
const TokenItem = require('../../models/tokenItem');

class TokensService extends BaseCollectionService {

	get collectionClass() {
		return TokensCollection;
	}

	get table() {
		return 'token';
	}

	createNewToken(token) {
		const tokenItem = new TokenItem({ token: token });

		this.collection.add(tokenItem);
		return tokenItem;
	}

	getTokenItemByValue(token) {
		return this.collection.getBy('token', token);
	}
}

module.exports = TokensService;