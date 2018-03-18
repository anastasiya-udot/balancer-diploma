const winston = require('winston');
const winsConf = winston.config;
const config = require('../../common/config');
const path = require('path');
const fs = require('fs-extra');

const LOG_PATH = path.join(global.rootPath, config.log.path);

let logger;

function timestamp() {
	const date = new Date();

	return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`;
}

function formatterConsole(options) {
	return options.timestamp() + ' ' +
		winsConf.colorize(options.level, options.level.toUpperCase()) + ' ' +
		(options.message ? options.message : '') +
		(options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '');
}

function formatterFile(options) {
	return options.timestamp() + ' ' +
		options.level.toUpperCase() + ' ' +
		(options.message ? options.message : '') +
		(options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '');
}


function createLogger() {
	fs.ensureFileSync(LOG_PATH);

	logger = new (winston.Logger)({
		transports: [
			new winston.transports.File({
				timestamp: timestamp,
				filename: LOG_PATH,
				formatter: formatterFile,
				level: 'debug',
				name: 'common',
				json: false
			}),
			new winston.transports.Console({
				colorize: true,
				timestamp: timestamp,
				formatter: formatterConsole,
				level: 'info'
			})
		]
	});
}

module.exports = function() {
	if (!logger) {
		createLogger();
	}

	return logger;
};
