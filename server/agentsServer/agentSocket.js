const config = require('../../common/config');
const logger = require('../utils/logger')(config.agents_server.logger.type);
const EventEmitter = require('events');

class AgentSocket extends EventEmitter {
	constructor(socket) {
		super();
		this._socket = socket;
		this.name = `${this._socket.remoteAddress}:${this._socket.remotePort}`;

		this._socket.on('data', this._onData.bind(this));
		this._socket.on('end', this._onEnd.bind(this));
	}

	_onData(buf) {
		const string = buf.toString();

		this._logInfo(`received "${string}"`);
	}

	_onEnd() {
		this._logInfo('has left the balancer');
		this.emit('end');
	}

	write(message) {
		this._socket.write(message);
		this._logInfo(`wrote "${message}"`);
	}

	_logInfo(text) {
		logger.info(`${this.name}: ${text}`);
	}

}

module.exports = AgentSocket;