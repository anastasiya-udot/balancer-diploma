const IpcProxyController = require('./ipcProxyController');
const httpProxy = require('http-proxy');
const express = require('express');

class Proxy extends IpcProxyController {
	constructor(proc) {
		super(proc);
		this._serversList = [];

		this._app = express();
		this._apiProxyServer = httpProxy.createProxyServer();

		this._setMiddleware();
	}

	_setMiddleware() {
		this._app.use(this._onRequest.bind(this));
	}

	_onRequest(req, res) {
		req.all('/*', (req, res) => {
			this.requestsManager.push(req);
		});
	}
}

module.exports = Proxy;