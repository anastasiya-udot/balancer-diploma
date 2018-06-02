const io = require('socket.io');
const config = require('../../common/config');
const logger = require('../utils/logger')(config.admin_server.logger.type);

class SocketService {

	attach(server) {
		this._io = io(server);
		this._sockets = new Map();

		this._setListeners();
	}

	_setSocket(socket) {
		let socketName = `[${socket.request.connection.remoteAddress}]: ${socket.request.connection.remotePort}'`;

		logger.info('Socket connected: %s', socketName);
		this._sockets.set(socketName, socket);

		socket.on('join', connection => {
			logger.info('New user connection');
			socket.emit('graphs', ['hi']);
		});

		socket.on('error', error => {
			logger.error('Socket connection error %s: %s', socketName, error);
		});

		socket.on('disconnect', () => {
			this._sockets.delete(socketName);
			logger.info('Socket disconnected %s', socketName);
		});
	}

	_setListeners() {
		this._io.on('connection', socket => {
			this._setSocket(socket);
		});
	}
}

module.exports = SocketService;