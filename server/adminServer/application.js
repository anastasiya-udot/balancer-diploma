/* global __dirname */

const express = require('express');
const app = express();

module.exports = function() {
	require('../middlewares/base')(app);
	require('../middlewares/header')(app);
	require('../middlewares/session')(app);

	require('../middlewares/auth')(app);
	require('../routes')(app);

	app.use('/views', express.static(__dirname + '/../views'));
	app.use('/server/views', express.static(__dirname + '/../views'));
	app.use('/node_modules', express.static(__dirname + '/../../node_modules'));

	require('../middlewares/error')(app);

	return app;
};