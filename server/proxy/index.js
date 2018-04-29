const IpcController = require('./ipcController');
const ReverseProxyServer = require('./reverseProxyServer');

class Proxy extends IpcController {
	constructor(proc) {
		super(proc);
		this._server = new ReverseProxyServer();
	}
}

module.exports = Proxy;