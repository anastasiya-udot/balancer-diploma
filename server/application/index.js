/* global process */

const app = require('./app');
const debug = require('debug')('balancer-diploma:server');
const http = require('http');
const constants = require('../../common/constants');
let SocketService = require('../service/socketService');
let port = normalizePort(constants.CONNECTION.PORT);
const logger = require('../utils/logger')();

process.on('rejectionHandled', err => {
	logger.error(err.message);
});

process.on('unhandledRejection', err => {
	logger.error(err.message);
});

function exitHandler(code) {
	logger.info('Received exit signal%s. (pid %d)', (' ' + code || ''), process.pid);
}

process.stdin.resume();
process.on('exit', exitHandler);
process.on('SIGINT', exitHandler);
process.on('SIGUSR1', exitHandler);
process.on('SIGUSR2', exitHandler);

app.set('port', port);

let server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

let socketService = new SocketService();

socketService.attach(server);

function normalizePort(val) {
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

function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			logger.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			logger.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
}

function onListening() {
	let addr = server.address();
	let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;

	logger.info('Server started: ', bind);
	debug('Listening on ' + bind);
}