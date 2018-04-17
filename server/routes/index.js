/* global __dirname */
const path = require('path');
const fs = require('fs');
const logger = require('../utils/logger')();
const express = require('express');
let router = express.Router();

function readDirectory(dirname, routersFileName) {
	return fs.readdirSync(dirname).forEach(function(file) {
		var fileName = path.join(dirname, file);

		routersFileName.push(fileName);
	});
}

router.get('/', function(req, res, next) {
	res.sendFile('index.html', { root: path.join(__dirname, '../../server/views') });
});

module.exports = function(app) {
	let baseDir = path.join(__dirname, 'rest');
	let routers = [];

	app.use(function(req, res, next) {
		logger.verbose(req.method, req.sessionID, req.originalUrl);
		next();
	});

	readDirectory(baseDir, routers);

	routers.forEach((router) => {
		let route = require(router);

		logger.info('Router initialized: %s %s', path.basename(router, '.js'), route.url);
		app.use(route.url, route);
	});

	app.use('/', router);
};