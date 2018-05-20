const http = require('http');
const net = require('net');
const Logger = require('./logger');

/* global process */

class Server {
	constructor(serverConfig) {
		this._config = serverConfig;
		this._port = this._normalizePort(this._config.port);
		this._logger = Logger(this._config.logger.type);
	}

	startHttp(app) {
		app.set('port', this._port);
		this._server = http.createServer(app);
		this._setBaseListeners();
	}

	_setBaseListeners() {
		this._server.listen(this._port);
		this._server.on('error', this._onError.bind(this));
		this._server.on('listening', this._onListening.bind(this));
	}

	startTcp(socketCallback) {
		this._server = net.createServer(socketCallback);
		this._setBaseListeners();
	}

	get() {
		return this._server;
	}

	_normalizePort(val) {
		var port = parseInt(val, 10);

		if (isNaN(port)) {
		// named pipe
			return val;
		}

		if (port >= 0) {
		// port number
			return port;
		}

		return false;
	}

	_onError(error) {
		if (error.syscall !== 'listen') {
			throw error;
		}

		// handle specific listen errors with friendly messages
		switch (error.code) {
			case 'EACCES':
				this._logger.error(this._port + ' requires elevated privileges');
				process.exit(1);
				break;
			case 'EADDRINUSE':
				this._logger.error(this._port + ' is already in use');
				process.exit(1);
				break;
			default:
				throw error;
		}
	}

	_onListening() {
		let addr = this._server.address();
		const serverName = this._config.name;

		this._logger.info(`${serverName} started [${addr.address}]:${this._port}`);
	}
}

module.exports = Server;