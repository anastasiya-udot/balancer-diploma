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
		this._socket.on('error', this._onError.bind(this));
	}

	_onData(buf) {
		const string = buf.toString();

		this.logInfo(`received "${string}"`);
	}

	_onError(err) {
		logger.error(`${this.name}: ${err}`);
	}

	_onEnd() {
		this.logInfo('has left the balancer');
		this.emit('end');
	}

	write(message) {
		this._socket.write(message);
		this.logInfo(`wrote "${message}"`);
	}

	logInfo(text) {
		logger.info(`${this.name}: ${text}`);
	}

}

module.exports = AgentSocket;