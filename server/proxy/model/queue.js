class RequestsQueue {
	constructor() {
		this._requests = [];
	}

	set(req) {
		this._requests.push(req);
	}
}

module.exports = RequestsQueue;