const EventEmitter = require('events');

class IpcController extends EventEmitter {

	constructor(worker) {
		super();
		this._worker = worker;
	}
}

module.exports = IpcController;