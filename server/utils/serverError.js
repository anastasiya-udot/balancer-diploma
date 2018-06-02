const statuses = require('statuses');

class ServerError extends Error {

	constructor(message, httpCode) {
		if (Number.isInteger(message)) {
			httpCode = message;
			message = statuses[httpCode];
		}

		super(message);
		this.httpCode = httpCode ? httpCode : 500;
	}

}
module.exports = ServerError;