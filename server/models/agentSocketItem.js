const config = require('../../common/config');
const logger = require('../utils/logger')(config.agents_server.logger.type);
const EventItem = require('./eventItem');

const DATA_TYPES = {
	INITIAL: 0,
	LOAD: 1
};

class AgentSocket extends EventItem {
	constructor(socket) {
		super({ name: `${socket.remoteAddress}:${socket.remotePort}` }, 'name');
		this._socket = socket;

		this._socket.on('data', this._onData.bind(this));
		this._socket.on('end', this._onEnd.bind(this));
		this._socket.on('error', this._onError.bind(this));
	}

	_getDataType(data) {
		if (data.system_info) {
			return DATA_TYPES.INITIAL;
		} else if (data.cpu_load !== undefined) {
			return DATA_TYPES.LOAD;
		} else {
			return undefined;
		}
	}

	_onData(buf) {
		const string = buf.toString();
		let data;

		this.logInfo(`received "${string}"`);

		try {
			data = JSON.parse(string);
		} catch (e) {
			logger.console.warn(`${this.attributes.name}: Unknown data type`);
		}

		if (!data) {
			return;
		}

		data.address = this._socket.remoteAddress;
		data.port = this._socket.remotePort;

		switch (this._getDataType(data)) {
			case DATA_TYPES.INITIAL: this.emit('inital_data', data); break;
			case DATA_TYPES.LOAD: this.emit('load_data', data); break;
		}
	}

	_onError(err) {
		logger.error(`${this.attributes.name}: ${err}`);
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
		logger.info(`${this.attributes.name}: ${text}`);
	}

}

module.exports = AgentSocket;