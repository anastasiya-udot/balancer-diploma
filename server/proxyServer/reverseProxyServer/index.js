const express = require('express');
const httpProxy = require('http-proxy');
const EventEmitter = require('events');

class ReverseProxyServer extends EventEmitter {

	constructor() {
		super();
		this._app = express();
		this._apiProxyServer = httpProxy.createProxyServer();

		this._setMiddleware();
	}

	_setMiddleware() {
		this._app.use(this._onRequest.bind(this));
	}

	_onRequest(req, res) {
		this.emit('request', req, Date.now());
	}
}

module.exports = ReverseProxyServer;