/* global __dirname */
const path = require('path');
const fs = require('fs');
const config = require('../../common/config');
const logger = require('../utils/logger')(config.admin_server.logger.type);
// const express = require('express');
// const ServerError = require('../utils/serverError');
// const _ = require('lodash');
// const PASS_LIST = [
// 	'/node_modules',
// 	'/views'
// ];

function readDirectory(dirname, routersFileName) {
	return fs.readdirSync(dirname).forEach(function(file) {
		var fileName = path.join(dirname, file);

		routersFileName.push(fileName);
	});
}

module.exports = function(app) {
	let baseDir = path.join(__dirname, 'rest');
	let routers = [];

	app.get(['/', '/auth/*', '/main/*'], function(req, res, next) {
		res.sendFile('index.html', { root: path.join(__dirname, '../../server/views') });
	});

	app.use(function(req, res, next) {
		logger.info(req.method, req.sessionID, req.originalUrl);
		next();
	});

	// app.use(function(req, res, next) {
	// 	const isApiRequest = _.every(PASS_LIST, url => {
	// 		return req.path.indexOf(url) === -1;
	// 	});

	// 	if (!req.isAuthenticated() && isApiRequest) {
	// 		return next(new ServerError(401));
	// 	}
	// 	next();
	// });

	readDirectory(baseDir, routers);

	routers.forEach((router) => {
		let route = require(router);

		logger.info('Router initialized: %s %s', path.basename(router, '.js'), route.baseUrl);
		app.use(route.baseUrl, route);
	});
};