/* global __dirname */

const path = require('path');

module.exports = function(app, router) {
	router.get('/', function(req, res, next) {
		res.sendFile('index.html', { root: path.join(__dirname, '../../server/views') });
	});

	app.use('/', router);
};