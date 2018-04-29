const winston = require('winston');
const winsConf = winston.config;
const config = require('../../common/config');
const path = require('path');
const fs = require('fs-extra');

let loggers = {};

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


function createLogger(type) {
	let logPath;

	type = type ? type : config.log.master.type;

	switch (type) {
		case config.log.master.type: logPath = config.log.master.path; break;
		case config.log.proxy.type: logPath = config.log.proxy.path; break;
		default: logPath = config.log.master.path;
	}

	logPath = path.join(global.rootPath, logPath);
	fs.ensureFileSync(logPath);

	loggers[type] = new (winston.Logger)({
		transports: [
			new winston.transports.File({
				timestamp: timestamp,
				filename: logPath,
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

module.exports = function(type = config.log.master.type) {
	if (!loggers[type]) {
		createLogger(type);
	}

	return loggers[type];
};
