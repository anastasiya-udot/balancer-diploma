const constants = require('../../../common/constants');
let ExpressRouter = require('express').Router;
let router = new ExpressRouter();

router.baseUrl = `/${constants.CONNECTION.PREFIX}/proxy`;

router.get('/ping-proxy', (req, res) => {
	res.send(200);
});

module.exports = router;