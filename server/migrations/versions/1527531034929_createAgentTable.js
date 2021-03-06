const async = require('async');
const config = require('../../../common/config');
const logger = require('../../utils/logger')(config.db.logger.type);

function createServerTable(db, next) {
	db.run('CREATE TABLE "server" ( \
		"id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, \
		"agent_id" INTEGER NOT NULL, \
		"port" INTEGER NOT NULL, \
		"is_available" INTEGER NOT NULL, \
		"last_launched_at" INTEGER \
	)', (err) => {
		if (err) {
			return next(`Can't create server table: ${err.message}'`);
		}
		return next(null, 'Server table was created');
	});
}


function createAgentsTable(db, next) {
	db.run('CREATE TABLE "agent" ( \
		"id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, \
		"port" INTEGER NOT NULL, \
		"address" VARCHAR(255) NOT NULL, \
		"created_at" INTEGER NOT NULL, \
		"is_online" INTEGER NOT NULL, \
		"state_id" INTEGER NOT NULL, \
		"token_id" INTEGER NOT NULL \
	)', (err) => {
		if (err) {
			return next(`Can't create agent table: ${err.message}'`);
		}
		return next(null, 'Agent table was created');
	});
}

function createCpuInfoTable(db, next) {
	db.run('CREATE TABLE "cpu_info" ( \
		"id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, \
		"model" VARCHAR(255) NOT NULL, \
		"speed" VARCHAR(255) NOT NULL, \
		"core" INTEGER NOT NULL, \
		"agent_id" INTEGER NOT NULL \
	)', (err) => {
		if (err) {
			return next(`Can't create cpu info table: ${err.message}'`);
		}
		return next(null, 'Cpu info table was created');
	});
}

function createSystemInfoTable(db, next) {
	db.run('CREATE TABLE "system_info" ( \
		"id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, \
		"platform_id" INTEGER NOT NULL, \
		"agent_id" INEGER NOT NULL, \
		"distributiv" VARCHAR(255) NOT NULL, \
		"version" VARCHAR(255) NOT NULL, \
		"memory" INTEGER NOT NULL \
	)', (err) => {
		if (err) {
			return next(`Can't create system info table: ${err.message}'`);
		}
		return next(null, 'System info table was created');
	});
}

function createTokenTable(db, next) {
	db.run('CREATE TABLE "token" ( \
		"id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, \
		"token" VARCHAR(255) NOT NULL, \
		"expired_at" INEGER NOT NULL \
	)', (err) => {
		if (err) {
			return next(`Can't create token table: ${err.message}'`);
		}
		return next(null, 'Token table was created');
	});
}

function createStateTable(db, next) {
	db.run('CREATE TABLE "state" ( \
		"id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, \
		"message" VARCHAR(255) NOT NULL, \
		"code" INEGER NOT NULL \
	)', (err) => {
		if (err) {
			return next(`Can't create state table: ${err.message}'`);
		}
		return next(null, 'State table was created');
	});
}

function createStatTable(db, next) {
	db.run('CREATE TABLE "stat" ( \
		"id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, \
		"received_at" INTEGER NOT NULL, \
		"cpu_load" INEGER NOT NULL, \
		"memory_load" INEGER NOT NULL, \
		"rom_load" INTEGER NOT NULL, \
		"agent_id" INTEGER NOT NULL \
	)', (err) => {
		if (err) {
			return next(`Can't create stat table: ${err.message}'`);
		}
		return next(null, 'Stat table was created');
	});
}

module.exports = function(db, next) {
	async.series([
		next => createServerTable(db, next),
		next => createAgentsTable(db, next),
		next => createCpuInfoTable(db, next),
		next => createSystemInfoTable(db, next),
		next => createTokenTable(db, next),
		next => createStateTable(db, next),
		next => createStatTable(db, next)
	], (err, result) => {
		if (err) {
			return next(err);
		}

		result.forEach(m => {
			logger.info('Migration: %s', m);
		});

		next();
	});
};