const express = require('express');
const constants = require('../../common/constants');
let expressRouter = express.Router;

module.exports = function router(prefix) {
	let router = expressRouter();

	prefix = prefix || '';

	router.url = `/${constants.CONNECTION.PREFIX}/${prefix}`;

	return router;
};