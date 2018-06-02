const constants = require('../../../common/constants');
const crypto = require('crypto');
const os = require('os');
const config = require('../../../common/config');
let ExpressRouter = require('express').Router;
let router = new ExpressRouter();

router.baseUrl = `/${constants.CONNECTION.PREFIX}/config`;

function getIP(filter) {
	var ni = os.networkInterfaces();
	var _interface;
	var index;

	filter = filter || function() { return true; };
	for (_interface in ni) {
		for (index in ni[_interface]) {
			if (filter(ni[_interface][index])) {
				return ni[_interface][index].address;
			}
		}
	}
}

router.get('/server', (req, res, next) => {
	const serverAddress = getIP(function(address) {
		return address.family === 'IPv4' && !address.internal;
	}) || '127.0.0.1';

	res.status(200).send({
		serverAddress: `${serverAddress}:${config.agents_server.port}`
	});
});

router.get('/token', (req, res) => {
	res.status(200).send({
		token: crypto.createHash('md5').update(`${Date.now()}`).digest('hex')
	});
});

module.exports = router;