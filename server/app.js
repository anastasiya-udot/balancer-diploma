/* global __dirname */

const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');

require('./middlewares/base')(app);
require('./routes')(app, router);

app.use('/views', express.static(__dirname + '/views'));
app.use('/server/views', express.static(__dirname + '/views'));
app.use('/node_modules', express.static(__dirname + '/../node_modules'));

global.rootPath = path.join(__dirname, '..');

require('./middlewares/database');

app.use((req, res, next) => {
	const err = new Error('Not Found');

	err.status = 404;
	next(err);
});

app.use((err, req, res) => {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;